import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import adminStyles from "../admin.module.css";

const ParkingReports = () => {
  const [search, setSearch] = useState("");

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["parkingState"],
    queryFn: async () => {
      const res = await axios.get(
        "http://localhost:3000/api/v1/admin/reports/parking-state"
      );
      return res.data;
    },
    staleTime: 1000 * 60,
  });

  const filtered = (data || []).filter((z) => {
    const q = search.toLowerCase();
    if (!q) return true;
    return (
      z.name.toLowerCase().includes(q) || z.zoneId.toLowerCase().includes(q)
    );
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className={adminStyles.main}>
      <h2>Parking Zones Reports</h2>

      <div className={adminStyles.inputs}>
        <input
          type="text"
          placeholder="Search by Zone Name or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className={adminStyles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>Zone ID</th>
              <th>Name</th>
              <th>Total Slots</th>
              <th>Occupied</th>
              <th>Free</th>
              <th>Available for Visitors</th>
              <th>Available for Subscribers</th>
              <th>Subscriber Count</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length ? (
              filtered.map((z) => (
                <tr
                  key={z.zoneId}
                  className={
                    z.occupied / z.totalSlots > 0.8
                      ? "bg-red-100"
                      : z.occupied / z.totalSlots > 0.5
                      ? "bg-yellow-100"
                      : "bg-green-100"
                  }
                >
                  <td>{z.zoneId}</td>
                  <td>{z.name}</td>
                  <td>{z.totalSlots}</td>
                  <td>{z.occupied}</td>
                  <td>{z.free}</td>
                  <td>{z.availableForVisitors}</td>
                  <td>{z.availableForSubscribers}</td>
                  <td>{z.subscriberCount}</td>
                  <td>{z.open ? "Open" : "Closed"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No zones found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ParkingReports;
