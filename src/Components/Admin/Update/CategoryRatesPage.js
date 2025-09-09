import { useEffect, useState } from "react";
import axios from "axios";
import { AuthData } from "../../../Utilities/Protected";
import adminStyles from "../admin.module.css";

const CategoryRatesPage = () => {
  const { loggedUser } = AuthData();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:3000/api/v1/master/categories",
        {
          headers: { Authorization: `Bearer ${loggedUser.token}` },
        }
      );
      setCategories(res.data);
    } catch (err) {
      alert("❌ Error loading categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const updateRate = async (id, normalRate, specialRate) => {
    try {
      await axios.put(
        `http://localhost:3000/api/v1/admin/categories/${id}`,
        { normalRate: Number(normalRate), specialRate: Number(specialRate) },
        { headers: { Authorization: `Bearer ${loggedUser.token}` } }
      );
      alert("Rates updated successfully!");
      fetchCategories();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update rates");
    }
  };

  return (
    <div className={adminStyles.main}>
      <h2>Manage Category Rates</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={adminStyles.tableWrapper}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Normal Rate</th>
                <th>Special Rate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td>{cat.id}</td>
                  <td>{cat.name}</td>
                  <td>
                    <input
                      type="number"
                      defaultValue={cat.normalRate}
                      onChange={(e) => (cat.normalRate = e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      defaultValue={cat.specialRate}
                      onChange={(e) => (cat.specialRate = e.target.value)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        updateRate(cat.id, cat.normalRate, cat.specialRate)
                      }
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CategoryRatesPage;
