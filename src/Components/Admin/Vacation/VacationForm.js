import { useState } from "react";
import axios from "axios";
import { AuthData } from "../../../Utilities/Protected";
import adminStyles from "../admin.module.css";

const VacationForm = () => {
  const { loggedUser } = AuthData();
  const [formData, setFormData] = useState({
    target: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/api/v1/admin/vacations",
        formData,
        { headers: { Authorization: `Bearer ${loggedUser.token}` } }
      );
      alert("Vacation added successfully!");
      setFormData({ target: "", startDate: "", endDate: "" });
    } catch (err) {
      alert(err.response?.data?.message || " Failed to add vacation");
    }
  };

  return (
    <div className={adminStyles.main}>
      <h2>Add Vacation</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="target"
          placeholder="Employee or Gate"
          value={formData.target}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Vacation</button>
      </form>
    </div>
  );
};

export default VacationForm;
