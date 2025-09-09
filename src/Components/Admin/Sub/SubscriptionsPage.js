import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthData } from "../../../Utilities/Protected";
import adminStyles from "../admin.module.css";

const SubscriptionsPage = () => {
  const { loggedUser } = AuthData();
  const [search, setSearch] = useState("");

  const fetchSubscriptions = async () => {
    if (!loggedUser?.user) throw new Error("NotAuthenticated");
    if (loggedUser.user.role !== "admin") throw new Error("Forbidden");

    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/admin/subscriptions",
        {
          headers: { Authorization: `Bearer ${loggedUser.token}` },
        }
      );

      console.log("GET /admin/subscriptions response:", res.data);

      return res.data?.subscriptions ?? res.data ?? [];
    } catch (err) {
      if (err?.response?.status === 403) throw new Error("Forbidden");
      throw err;
    }
  };

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: fetchSubscriptions,
    enabled: !!loggedUser?.user,
    staleTime: 1000 * 60 * 2,
  });

  const filtered = (data || []).filter((s) => {
    const q = (search || "").toLowerCase();
    if (!q) return true;
    return (
      String(s.id || "")
        .toLowerCase()
        .includes(q) ||
      String(s.userName || "")
        .toLowerCase()
        .includes(q) ||
      (s.cars || []).some((c) =>
        String(c?.plate || "")
          .toLowerCase()
          .includes(q)
      )
    );
  });

  if (!loggedUser?.user) return <p>Please login to view this page.</p>;
  if (loggedUser.user.role !== "admin")
    return <p>You are not authorized to view subscriptions</p>;

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return <p>Error loading subscriptions: {error?.message || "Unknown"}</p>;

  return (
    <div className={adminStyles.main}>
      <h2>Subscriptions (Admin)</h2>

      <div className={adminStyles.inputs}>
        <input
          type="text"
          placeholder="Search by ID, User, Plate..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className={adminStyles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Cars</th>
              <th>Category</th>
              <th>Active</th>
              <th>Start</th>
              <th>Expiry</th>
              <th>Checkins</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length ? (
              filtered.map((sub) => (
                <tr key={sub.id}>
                  <td>{sub.id}</td>
                  <td>{sub.userName}</td>
                  <td>
                    {sub.cars.map((c) => (
                      <div key={c.plate}>
                        {c.plate} ({c.brand} {c.model}, {c.color})
                      </div>
                    ))}
                  </td>
                  <td>{sub.category}</td>
                  <td>
                    {sub.active ? <span>Active</span> : <span>Expired</span>}
                  </td>
                  <td>
                    {sub.startsAt
                      ? new Date(sub.startsAt).toLocaleDateString()
                      : "—"}
                  </td>
                  <td>
                    {sub.expiresAt
                      ? new Date(sub.expiresAt).toLocaleDateString()
                      : "—"}
                  </td>
                  <td>
                    {sub.currentCheckins?.length
                      ? sub.currentCheckins.map((c) => (
                          <div key={c.ticketId}>
                            {c.ticketId} → {c.zoneId} (
                            {new Date(c.checkinAt).toLocaleString()})
                          </div>
                        ))
                      : "—"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No subscriptions found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionsPage;
