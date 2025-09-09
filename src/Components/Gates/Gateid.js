import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import GateHeader from "../GateHeader";
import ZoneCard from "../ZoneCard";
import TicketModal from "../TicketModal";
import { AuthData } from "../../Utilities/Protected";
import userStyles from "./user.module.css";
export default function Gateid() {
  const { loggedUser } = AuthData();
  const { gateId } = useParams();
  const [tab, setTab] = useState("visitor");
  const [selectedZone, setSelectedZone] = useState(null);
  const [ticket, setTicket] = useState(null);

  const { data: zones, refetch } = useQuery({
    queryKey: ["zones", gateId],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/api/v1/master/zones?gateId=${gateId}`,
        {
          headers: {
            Authorization: `Bearer ${loggedUser.token}`,
          },
        }
      );
      return res.data;
    },
  });

  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:8000");
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "subscribe", payload: { gateId } }));
    };
    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.type === "zone-update") {
        refetch();
      }
    };
    return () => ws.close();
  }, [gateId, refetch]);

  const handleCheckin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/tickets/checkin",
        {
          gateId,
          zoneId: selectedZone.id,
          type: tab === "visitor" ? "visitor" : "subscriber",
          subscriptionId: tab === "subscriber" ? "sub_123" : undefined,
        },
        {
          headers: {
            Authorization: `Bearer ${loggedUser.token}`,
          },
        }
      );

      console.log("Checkin response:", res.data);
      setTicket(res.data.ticket);

      refetch();
    } catch (err) {
      console.error("Checkin error:");
      alert(err.response?.data?.message || "Check-in failed");
    }
  };

  const handleCheckout = async (ticketId) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/tickets/checkout",
        { ticketId },
        {
          headers: {
            Authorization: `Bearer ${loggedUser.token}`,
          },
        }
      );

      console.log("Checkout response:", res.data);

      setTicket(null);

      refetch();
    } catch (err) {
      console.error("Checkout error:");
      alert(err.response?.data?.message || "Checkout failed");
    }
  };

  return (
    <div className={userStyles.main}>
      {/* Header */}
      <GateHeader gateId={gateId} />

      {/* Tabs */}
      <div className={userStyles.btt}>
        <button
          onClick={() => setTab("visitor")}
          className={tab === "visitor" ? "bg-blue-500 text-white px-4" : "px-4"}
        >
          Visitor
        </button>
        <button
          onClick={() => setTab("subscriber")}
          className={
            tab === "subscriber" ? "bg-blue-500 text-white px-4" : "px-4"
          }
        >
          Subscriber
        </button>
      </div>

      {/* Zone cards */}
      <div className={userStyles.zone}>
        {zones?.map((zone) => (
          <ZoneCard
            key={zone.id}
            zone={zone}
            tab={tab}
            selected={selectedZone?.id === zone.id}
            onSelect={() => setSelectedZone(zone)}
          />
        ))}
      </div>

      {/* Action button */}
      {selectedZone && (
        <button
          onClick={handleCheckin}
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded"
        >
          Go
        </button>
      )}

      {/* Ticket modal */}
      {ticket && (
        <TicketModal
          ticket={ticket}
          onClose={() => setTicket(null)}
          onCheckout={handleCheckout}
        />
      )}
    </div>
  );
}
