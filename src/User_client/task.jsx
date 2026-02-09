import { useEffect, useState } from "react";
import axios from "axios";

function TodayTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/tasks/today")
      .then((res) => setTasks(res.data.tasks))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">📅 Today’s Tasks</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-600">No task submitted today</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-4 rounded-lg shadow"
            >
              <h3 className="font-semibold">{task.taskName}</h3>

              <p className="text-sm text-gray-500">
                {new Date(task.createdAt).toLocaleTimeString()}
              </p>

              <img
                src={`http://localhost:5000/${task.selfie}`}
                alt="selfie"
                className="w-20 h-20 rounded-full mt-2"
              />

              <p className="text-sm mt-2">
                📍 {task.latitude}, {task.longitude}
              </p>

              <span
                className={`inline-block mt-2 px-3 py-1 text-xs rounded text-white ${
                  task.status === "approved"
                    ? "bg-green-500"
                    : task.status === "rejected"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }`}
              >
                {task.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TodayTasks;
