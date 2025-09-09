import { useState } from "react";
import axios from "axios";
import { AuthData } from "../../Utilities/Protected";
import userStyles from "../Gates/user.module.css";

const CheckpointPage = () => {
  const { loggedUser } = AuthData();
  const [ticketId, setTicketId] = useState("");
  const [ticket, setTicket] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [checkoutResult, setCheckoutResult] = useState(null);

  const fetchTicket = async () => {
    try {
      setCheckoutResult(null);
      const res = await axios.get(
        `http://localhost:3000/api/v1/tickets/${ticketId}`,
        { headers: { Authorization: `Bearer ${loggedUser.token}` } }
      );
      setTicket(res.data);

      if (res.data.subscriptionId) {
        const subRes = await axios.get(
          `http://localhost:3000/api/v1/subscriptions/${res.data.subscriptionId}`,
          { headers: { Authorization: `Bearer ${loggedUser.token}` } }
        );
        setSubscription(subRes.data);
      } else {
        setSubscription(null);
      }
    } catch (err) {
      alert("Ticket not found");
      setTicket(null);
      setSubscription(null);
      setCheckoutResult(null);
    }
  };

  const handleCheckout = async (forceConvert = false) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/tickets/checkout",
        { ticketId, forceConvertToVisitor: forceConvert },
        { headers: { Authorization: `Bearer ${loggedUser.token}` } }
      );
      setCheckoutResult(res.data);
      alert("Checkout successful!");
    } catch (err) {
      alert(err.response?.data?.message || "Checkout failed");
    }
  };

  return (
    <div className={userStyles.main}>
      <h2>Checkpoint - Ticket Checkout</h2>

      {/* Input + Lookup */}
      <div className={userStyles.inputs}>
        <input
          type="text"
          placeholder="Enter Ticket ID"
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
        />
        <button onClick={fetchTicket}>Lookup</button>
      </div>

      {/* Ticket Info */}
      {ticket && (
        <div className={userStyles.card}>
          <h2>Ticket Info</h2>
          <p>ID: {ticket.id}</p>
          <p>Type: {ticket.type}</p>
          <p>Zone: {ticket.zoneId}</p>
          <p>Gate: {ticket.gateId}</p>
          <p>Check-in: {new Date(ticket.checkinAt).toLocaleString()}</p>
          {ticket.checkoutAt && (
            <p>Checkout: {new Date(ticket.checkoutAt).toLocaleString()}</p>
          )}
        </div>
      )}

      {/* Subscription Info */}
      {subscription && (
        <div className={userStyles.card}>
          <h2>Subscription Info</h2>
          <p>User: {subscription.userName}</p>
          <p>Cars:</p>
          <ul>
            {subscription.cars.map((car, idx) => (
              <li key={idx}>
                {car.plate} - {car.brand} {car.model} ({car.color})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Checkout Actions */}
      {ticket && !checkoutResult && (
        <div className={userStyles.actions}>
          <button className="normal" onClick={() => handleCheckout(false)}>
            Normal Checkout
          </button>
          {subscription && (
            <button className="force" onClick={() => handleCheckout(true)}>
              Force Convert to Visitor
            </button>
          )}
        </div>
      )}

      {/* Checkout Summary */}
      {checkoutResult && (
        <div className={userStyles.summary}>
          <h2>Checkout Summary</h2>
          <p>ID: {checkoutResult.ticketId || checkoutResult.id}</p>
          <p>
            Check-in:{" "}
            {checkoutResult.checkinAt &&
              new Date(checkoutResult.checkinAt).toLocaleString()}
          </p>
          <p>
            Checkout:{" "}
            {checkoutResult.checkoutAt &&
              new Date(checkoutResult.checkoutAt).toLocaleString()}
          </p>
          <p>
            Duration:{" "}
            {checkoutResult.durationHours
              ? checkoutResult.durationHours.toFixed(2)
              : 0}{" "}
            hours
          </p>
          <p>
            <strong>Total Amount: </strong>
            {checkoutResult.amount || checkoutResult.totalAmount || 0} EGP
          </p>

          <h3>Breakdown</h3>
          <ul>
            {(checkoutResult.breakdown || []).map((b, idx) => (
              <li key={idx}>
                {b.rateMode} → {b.hours.toFixed(2)}h × {b.rate} = {b.amount}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CheckpointPage;
