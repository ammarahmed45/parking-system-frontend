import { useEffect, useState } from "react";
import axios from "axios";
import { AuthData } from "../../../Utilities/Protected";
import adminStyles from "../admin.module.css";

const ZoneTogglePage = () => {
  const { loggedUser } = AuthData();
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchZones = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/api/v1/master/zones", {
        headers: { Authorization: `Bearer ${loggedUser.token}` },
      });
      setZones(res.data);
    } catch (err) {
      alert("Failed to load zones");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchZones();
  }, []);

  const toggleZone = async (zoneId, currentStatus) => {
    try {
      await axios.put(
        `http://localhost:3000/api/v1/admin/zones/${zoneId}/open`,
        { open: !currentStatus },
        { headers: { Authorization: `Bearer ${loggedUser.token}` } }
      );
      alert(`Zone ${zoneId} is now ${!currentStatus ? "Open" : "Closed"}`);
      fetchZones();
    } catch (err) {
      alert("Failed to update zone");
    }
  };

  if (loading) return <p className="p-6">Loading zones...</p>;

  return (
    <div className={adminStyles.main}>
      <h2>Manage Zones (Open / Close)</h2>
      <div className={adminStyles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>Zone ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {zones.map((zone) => (
              <tr key={zone.id}>
                <td>{zone.id}</td>
                <td>{zone.name}</td>
                <td>{zone.open ? <span>Open</span> : <span>Closed</span>}</td>
                <td>
                  <button onClick={() => toggleZone(zone.id, zone.open)}>
                    {zone.open ? "Close" : "Open"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ZoneTogglePage;
