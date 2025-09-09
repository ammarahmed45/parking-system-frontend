import { useState } from "react";
import axios from "axios";
import { AuthData } from "../../Utilities/Protected";
import userStyles from "../Gates/user.module.css";

const TicketsPage = () => {
  const { loggedUser } = AuthData();
  const [search, setSearch] = useState("");
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTicket = async () => {
    if (!search.trim()) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/tickets/${search}`,
        {
          headers: { Authorization: `Bearer ${loggedUser.token}` },
        }
      );
      if (res.data && res.data.checkoutAt === null) {
        setTicket(res.data);
      } else {
        setTicket(null);
        alert("Ticket is already checked out or not found");
      }
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err.message);
      alert("Ticket not found");
      setTicket(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async (ticketId) => {
    try {
      await axios.post(
        "http://localhost:3000/api/v1/tickets/checkout",
        { ticketId },
        {
          headers: { Authorization: `Bearer ${loggedUser.token}` },
        }
      );
      alert("Ticket checked out successfully");
      setTicket(null);
    } catch (err) {
      console.error("Checkout error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Checkout failed");
    }
  };

  return (
    <div className={userStyles.main}>
      <h2>Open Tickets</h2>

      {/* Search box */}
      <div className={userStyles.inputs}>
        <input
          type="text"
          placeholder="Enter Ticket ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={fetchTicket} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Tickets table */}
      <div className={userStyles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Gate</th>
              <th>Zone</th>
              <th>Type</th>
              <th>Check-in</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ticket ? (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.gateId}</td>
                <td>{ticket.zoneId}</td>
                <td>{ticket.type}</td>
                <td>{new Date(ticket.checkinAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleCheckout(ticket.id)}>
                    Checkout
                  </button>
                </td>
              </tr>
            ) : (
              <tr>
                <td>No open tickets found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketsPage;
