import React, { useState } from "react";

function Dashboard() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border px-4 py-2 rounded"
      >
        <option value="all">All Tasks</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>

      <p className="mt-4 text-gray-700">
        Selected Filter: <b>{filter}</b>
      </p>
    </div>
  );
}

export default Dashboard;
