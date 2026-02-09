import React, { useEffect, useState } from "react";
import axios from "axios";

function TodayTask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodayTasks();
  }, []);

  const fetchTodayTasks = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];

      const res = await axios.get(
        `http://localhost:5000/api/tasks?date=${today}`
      );

      setTasks(res.data.tasks || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading tasks...</p>;
  if (tasks.length === 0)
    return <p className="text-center mt-10">No tasks for today</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Today's Tasks 📅</h2>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border text-left">User Name</th>
            <th className="p-3 border text-left">User ID</th>
            <th className="p-3 border text-left">Task</th>
            <th className="p-3 border text-left">Date</th>
            <th className="p-3 border text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td className="p-3 border">{task.userName || "-"}</td>

              <td className="p-3 border text-xs text-gray-600">
                {task.userId || "-"}
              </td>

              <td className="p-3 border">{task.taskName}</td>

              <td className="p-3 border">
                {task.createdAt
                  ? new Date(task.createdAt).toLocaleString("en-IN")
                  : "-"}
              </td>

              <td className="p-3 border">
                <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700">
                  {task.status || "Pending"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TodayTask;
