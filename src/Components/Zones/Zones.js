import React, { useEffect, useState } from "react";
import { AuthData } from "../../Utilities/Protected";
import axios from "axios";
import userStyles from "../Gates/user.module.css";

const Zones = () => {
  const { loggedUser } = AuthData();
  const [zones, setZones] = useState([]);

  useEffect(() => {
    const getZones = async () => {
      await axios
        .get(`http://localhost:3000/api/v1/master/zones`, {
          headers: {
            Authorization: `Bearer ${loggedUser.token}`,
          },
        })
        .then((res) => {
          setZones(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (loggedUser.token) {
      getZones();
    }
  }, [loggedUser]);
  return (
    <div className={userStyles.main}>
      <div className={userStyles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Total</th>
              <th>Occupied</th>
              <th>Free</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {zones.map((z) => (
              <tr key={z.id}>
                <td>{z.name}</td>
                <td>{z.categoryId}</td>
                <td>{z.totalSlots}</td>
                <td>{z.occupied}</td>
                <td>{z.free}</td>
                <td style={{ color: z.open ? "green" : "red" }}>
                  {z.open ? "Open" : "Closed"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Zones;
