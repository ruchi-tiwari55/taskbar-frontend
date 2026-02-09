import React, { useEffect, useState } from "react";
import axios from "axios";

function AssignTask() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all tasks on component mount
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

  if (loading) return <p className="text-center mt-5">Loading tasks...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">All Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">#</th>
              <th className="border p-2">User Name</th>
              <th className="border p-2">Task Name</th>
              <th className="border p-2">Task Date</th>
              <th className="border p-2">Selfie</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task._id} className="text-center">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{task.userName}</td>
                <td className="border p-2">{task.taskName}</td>
                <td className="border p-2">{task.taskDate || "-"}</td>
                <td className="border p-2">
                  {task.selfie ? (
                    <img
                      src={`http://localhost:5000/${task.selfie}`}
                      alt="selfie"
                      className="w-12 h-12 rounded-full mx-auto object-cover"
                    />
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AssignTask;
