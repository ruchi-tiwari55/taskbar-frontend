import React, { useEffect, useState } from "react";
import axios from "axios";

function AlllTask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 API call to fetch tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks");
      setTasks(res.data.tasks || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading tasks...</p>;

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
                <th className="border p-3 text-left">User</th>
                <th className="border p-3 text-left">Task</th>
                <th className="border p-3 text-left">Date</th>
                <th className="border p-3 text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    No tasks found
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr key={task._id} className="text-center">
                    <td className="border p-3 text-left">{task.userName || "-"}</td>
                    <td className="border p-3 text-left">{task.taskName || "-"}</td>
                    <td className="border p-3 text-left">
                      {task.taskDate
                        ? new Date(task.taskDate).toLocaleDateString()
                        : task.createdAt
                        ? new Date(task.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="border p-3 text-center">
                      {task.status || "Pending"} {/* You can replace with actual status */}
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
}

export default AlllTask;
