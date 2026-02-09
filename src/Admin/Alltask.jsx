import { useState } from "react";

function AdminAllTasks() {
  const [filter, setFilter] = useState("all");
  const [preview, setPreview] = useState(null);

  // 🔹 DUMMY DATA (UI ONLY)
  const tasks = [
    {
      _id: "1",
      taskName: "Site Visit",
      userName: "Ramesh",
      selfie: "https://via.placeholder.com/150",
      latitude: "28.6139",
      longitude: "77.2090",
      status: "pending",
      createdAt: new Date(),
    },
    {
      _id: "2",
      taskName: "Office Check",
      userName: "Suresh",
      selfie: "https://via.placeholder.com/150",
      latitude: "19.0760",
      longitude: "72.8777",
      status: "approved",
      createdAt: new Date(),
    },
    {
      _id: "3",
      taskName: "Field Work",
      userName: "Amit",
      selfie: "https://via.placeholder.com/150",
      latitude: "",
      longitude: "",
      status: "rejected",
      createdAt: new Date(),
    },
  ];

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter(t => t.status === filter);

  const statusColor = (status) => {
    if (status === "approved") return "bg-green-500";
    if (status === "rejected") return "bg-red-500";
    return "bg-yellow-500";
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">📋 All Tasks</h2>

      {/* FILTER */}
      <div className="mb-4 space-x-2">
        {["all", "pending", "approved", "rejected"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1 rounded ${
              filter === s ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Task</th>
              <th className="border p-2">User</th>
              <th className="border p-2">Selfie</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Map</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredTasks.map((task, index) => (
              <tr key={task._id} className="text-center hover:bg-gray-50">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2 font-semibold">{task.taskName}</td>
                <td className="border p-2">{task.userName}</td>

                {/* SELFIE */}
                <td className="border p-2">
                  <img
                    src={task.selfie}
                    alt="selfie"
                    onClick={() => setPreview(task.selfie)}
                    className="w-12 h-12 rounded-full mx-auto cursor-pointer border"
                  />
                </td>

                {/* LOCATION */}
                <td className="border p-2 text-sm">
                  {task.latitude || "-"} <br />
                  {task.longitude || "-"}
                </td>

                {/* MAP */}
                <td className="border p-2">
                  {task.latitude ? (
                    <iframe
                      title="map"
                      width="180"
                      height="110"
                      className="rounded"
                      src={`https://maps.google.com/maps?q=${task.latitude},${task.longitude}&z=14&output=embed`}
                    />
                  ) : (
                    "-"
                  )}
                </td>

                {/* STATUS */}
                <td className="border p-2">
                  <span
                    className={`text-white px-3 py-1 rounded text-sm ${statusColor(
                      task.status
                    )}`}
                  >
                    {task.status.toUpperCase()}
                  </span>
                </td>

                {/* DATE */}
                <td className="border p-2 text-sm">
                  {task.createdAt.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* IMAGE MODAL */}
      {preview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center"
          onClick={() => setPreview(null)}
        >
          <img src={preview} alt="preview" className="max-h-[90%] rounded-lg" />
        </div>
      )}
    </div>
  );
}

export default AdminAllTasks;
