import { useEffect, useState } from "react";
import axios from "axios";

function UserAllTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tasks/user")
      .then((res) => {
        setTasks(res.data.tasks);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-6">Loading tasks...</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">📋 My All Tasks</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-600">No tasks found</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-4 rounded-lg shadow"
            >
              <h3 className="font-semibold text-lg">
                {task.taskName}
              </h3>

              <p className="text-xs text-gray-500">
                {new Date(task.createdAt).toLocaleString()}
              </p>

              <img
                src={`http://localhost:5000/${task.selfie}`}
                alt="selfie"
                className="w-24 h-24 rounded mt-3 object-cover"
              />

              <p className="text-sm mt-2">
                📍 {task.latitude}, {task.longitude}
              </p>

              <span
                className={`inline-block mt-3 px-3 py-1 text-xs rounded text-white ${
                  task.status === "approved"
                    ? "bg-green-500"
                    : task.status === "rejected"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }`}
              >
                {task.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserAllTasks;
