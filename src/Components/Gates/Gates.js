import React, { useEffect, useState } from "react";
import { AuthData } from "../../Utilities/Protected";
import axios from "axios";
import { Link } from "react-router-dom";
import usersrtyles from "./user.module.css";

const Gates = () => {
  const { loggedUser } = AuthData();
  const [gates, setGates] = useState([]);

  useEffect(() => {
    const getGates = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/master/gates`,
          {
            headers: {
              Authorization: `Bearer ${loggedUser.token}`,
            },
          }
        );
        setGates(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (loggedUser?.token) {
      getGates();
    }
  }, [loggedUser]);

  return (
    <div className={usersrtyles.main}>
      <h2>Available Gates</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Gate Name</th>
            <th>Location</th>
            <th>Zones</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {gates.map((gate) => (
            <tr key={gate.id}>
              <td>{gate.id}</td>
              <td>{gate.name}</td>
              <td>{gate.location}</td>
              <td>{gate.zoneIds.join(", ")}</td>
              <td>
                <Link to={`/gates/${gate.id}`}>Open Gate</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Gates;
