import { useEffect, useState } from "react";
import axios from "axios";

const Allusers = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks");
      setTasks(res.data.tasks || []); // Make sure tasks array exists
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-5 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center mb-4">
          📋 Task List
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">#</th>
                <th className="border p-2">Task Name</th>
                <th className="border p-2">User Name</th> {/* ✅ Added */}
                <th className="border p-2">Selfie</th>
                <th className="border p-2">Latitude</th>
                <th className="border p-2">Longitude</th>
                <th>Map</th>
                <th className="border p-2">Created At</th>
              </tr>
            </thead>

            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center p-4">
                    No tasks found
                  </td>
                </tr>
              ) : (
                tasks.map((task, index) => (
                  <tr key={task._id} className="text-center">
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2 font-medium">{task.taskName}</td>
                    <td className="border p-2 font-medium">{task.userName || "-"}</td> {/* ✅ UserName */}
                    <td className="border p-2">
                      <img
                        src={`http://localhost:5000/${task.selfie}`}
                        alt="selfie"
                        className="w-20 h-20 rounded-full mx-auto object-cover"
                      />
                    </td>
                    <td className="border p-2">{task.latitude || "-"}</td>
                    <td className="border p-2">{task.longitude || "-"}</td>
                    <td className="border p-2">
                      {task.latitude && task.longitude ? (
                        <iframe
                          title={`map-${task._id}`}
                          width="100%"
                          height="120"
                          style={{ border: 0, borderRadius: "8px" }}
                          loading="lazy"
                          allowFullScreen
                          src={`https://maps.google.com/maps?q=${task.latitude},${task.longitude}&z=14&output=embed`}
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="border p-2">
                      {new Date(task.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Allusers;
