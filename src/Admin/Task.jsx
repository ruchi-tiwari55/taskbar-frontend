import { useEffect, useState } from "react";
import axios from "axios";

function AdminPendingTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchPendingTasks();
  }, []);

  const fetchPendingTasks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/tasks?status=pending"
      );
      setTasks(res.data.tasks);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/tasks/${id}/status`, {
      status,
    });
    fetchPendingTasks();
  };

  if (loading) return <p className="p-6">Loading pending tasks...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">⏳ Pending Tasks</h2>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Task</th>
              <th className="p-2 border">User</th>
              <th className="p-2 border">Selfie</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Map</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task, index) => (
              <tr key={task._id} className="text-center hover:bg-gray-50">
                <td className="border p-2">{index + 1}</td>

                <td className="border p-2 font-semibold">
                  {task.taskName}
                  <div className="text-xs text-gray-500">
                    {new Date(task.createdAt).toLocaleString()}
                  </div>
                </td>

                <td className="border p-2">
                  {task.userName || task.userId}
                </td>

                {/* SELFIE */}
                <td className="border p-2">
                  <img
                    src={`http://localhost:5000/${task.selfie}`}
                    alt="selfie"
                    onClick={() =>
                      setSelectedImage(
                        `http://localhost:5000/${task.selfie}`
                      )
                    }
                    className="w-12 h-12 rounded-full mx-auto cursor-pointer border"
                  />
                </td>

                {/* LOCATION */}
                <td className="border p-2 text-sm">
                  📍 {task.latitude}
                  <br />
                  {task.longitude}
                </td>

                {/* MAP */}
                <td className="border p-2">
                  <iframe
                    title={`map-${task._id}`}
                    width="200"
                    height="120"
                    className="rounded"
                    src={`https://maps.google.com/maps?q=${task.latitude},${task.longitude}&z=14&output=embed`}
                  />
                </td>

             {/* ACTION */}
<td className="border p-2 space-x-2">
  <button
    onClick={() => updateStatus(task._id, "approved")}
    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
    disabled={task.status === "approved"}
  >
    ✅ Accept
  </button>

  <button
    onClick={() => updateStatus(task._id, "rejected")}
    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
    disabled={task.status === "rejected"}
  >
    ❌ Reject
  </button>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* IMAGE MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Full Selfie"
            className="max-h-[90%] rounded-lg"
          />
        </div>
      )}
    </div>
  );
}

export default AdminPendingTasks;
