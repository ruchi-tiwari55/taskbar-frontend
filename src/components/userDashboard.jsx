import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  const [recentTasks, setRecentTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // stats
    axios.get("http://localhost:5000/api/tasks/user/stats")
      .then(res => setStats(res.data))
      .catch(console.error);

    // recent tasks
    axios.get("http://localhost:5000/api/tasks/user/recent")
      .then(res => setRecentTasks(res.data.tasks))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">👤 User Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Tasks" value={stats.total} />
        <StatCard title="Pending" value={stats.pending} color="yellow" />
        <StatCard title="Approved" value={stats.approved} color="green" />
        <StatCard title="Rejected" value={stats.rejected} color="red" />
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">⚡ Quick Actions</h2>

        <div className="flex flex-wrap gap-4">
            <button
            onClick={() => navigate("/users/task")}
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            ➕ User Task
          </button>
          <button
            onClick={() => navigate("/user/Today-Tasks")}
            className="bg-yellow-500 text-white px-5 py-2 rounded"
          >
            📅 Today Tasks
          </button>

          <button
            onClick={() => navigate("/user/tasks")}
            className="bg-gray-800 text-white px-5 py-2 rounded"
          >
            📋 View User Tasks
          </button>
               <button
            onClick={() => navigate("/AssignNew/tasks")}
            className="bg-gray-800 text-white px-5 py-2 rounded"
          >
            📋 Assign New Tasks
          </button>
        </div>
      </div>

      {/* RECENT TASKS */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">🕒 Recent Tasks</h2>

        {recentTasks.length === 0 ? (
          <p className="text-gray-500">No tasks yet</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Task</th>
                <th className="p-2 text-center">Date</th>
                <th className="p-2 text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentTasks.map(task => (
                <tr key={task._id} className="border-b">
                  <td className="p-2">{task.taskName}</td>
                  <td className="p-2 text-center">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2 text-center">
                    <StatusBadge status={task.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* SMALL COMPONENTS */

const StatCard = ({ title, value, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    yellow: "bg-yellow-100 text-yellow-700",
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
  };

  return (
    <div className={`p-5 rounded-lg shadow ${colors[color]}`}>
      <p className="text-gray-600">{title}</p>
      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const map = {
    pending: "bg-yellow-500",
    approved: "bg-green-500",
    rejected: "bg-red-500",
  };

  return (
    <span className={`px-3 py-1 text-xs rounded text-white ${map[status]}`}>
      {status}
    </span>
  );
};

export default UserDashboard;
