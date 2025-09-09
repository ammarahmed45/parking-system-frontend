import userStyles from "./Gates/user.module.css";

export default function TicketModal({ ticket, onClose, onCheckout }) {
  const handlePrint = () => {
    const printContent = document.getElementById("ticket-print");
    const printWindow = window.open("", "", "width=600,height=400");
    printWindow.document.write(`
      <html>
        <head><title>Ticket</title></head>
        <body>${printContent.innerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className={userStyles.ticketModal}>
      <div id="ticket-print">
        <h2 className={userStyles.ticketHeader}>Ticket</h2>
        <div className={userStyles.ticketDetail}>
          <p>ID: {ticket.id}</p>
          <p>Gate: {ticket.gateId}</p>
          <p>Zone: {ticket.zoneId}</p>
          <p>Check-in: {ticket.checkinAt}</p>
          {ticket.checkoutAt && <p>Checkout: {ticket.checkoutAt}</p>}
        </div>
      </div>

      <div className={userStyles.ticketButtons}>
        <button className="close" onClick={onClose}>
          Close
        </button>
        {!ticket.checkoutAt && (
          <button className="checkout" onClick={() => onCheckout(ticket.id)}>
            Checkout
          </button>
        )}
        <button className="print" onClick={handlePrint}>
          Print
        </button>
      </div>
    </div>
  );
}
