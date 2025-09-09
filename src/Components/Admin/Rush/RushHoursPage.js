import { useState } from "react";
import axios from "axios";
import { AuthData } from "../../../Utilities/Protected";
import adminStyles from "../admin.module.css";

const RushHoursPage = () => {
  const { loggedUser } = AuthData();

  const [rushHours, setRushHours] = useState([]);
  const [form, setForm] = useState({
    zoneId: "",
    startTime: "",
    endTime: "",
    rateMultiplier: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/admin/rush-hours",
        form,
        { headers: { Authorization: `Bearer ${loggedUser.token}` } }
      );

      setRushHours((prev) => [...prev, { ...form, id: res.data.id }]);

      alert("Rush Hour added successfully");
      setForm({ zoneId: "", startTime: "", endTime: "", rateMultiplier: 1 });
    } catch (err) {
      console.error(
        "Error adding rush hour:",
        err.response?.data || err.message
      );
      alert(err.response?.data?.message || "Failed to add rush hour");
    }
  };

  return (
    <div className={adminStyles.main}>
      <h2>Rush Hours (Admin)</h2>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Zone ID"
          value={form.zoneId}
          onChange={(e) => setForm({ ...form, zoneId: e.target.value })}
          required
        />
        <input
          type="time"
          value={form.startTime}
          onChange={(e) => setForm({ ...form, startTime: e.target.value })}
          required
        />
        <input
          type="time"
          value={form.endTime}
          onChange={(e) => setForm({ ...form, endTime: e.target.value })}
          required
        />
        <input
          type="number"
          step="0.1"
          placeholder="Rate Multiplier"
          value={form.rateMultiplier}
          onChange={(e) => setForm({ ...form, rateMultiplier: e.target.value })}
          required
        />
        <button type="submit">Add Rush Hour</button>
      </form>

      {/* List */}
      <div className={adminStyles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Zone</th>
              <th>Start</th>
              <th>End</th>
              <th>Multiplier</th>
            </tr>
          </thead>
          <tbody>
            {rushHours.length ? (
              rushHours.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.zoneId}</td>
                  <td>{r.startTime}</td>
                  <td>{r.endTime}</td>
                  <td>{r.rateMultiplier}×</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No rush hours added</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RushHoursPage;
