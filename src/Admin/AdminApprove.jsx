import { useState } from "react";

function AdminApprovedTasks() {
  const [preview, setPreview] = useState(null);

  // 🔹 DUMMY APPROVED TASKS
  const tasks = [
    {
      _id: "1",
      taskName: "Office Visit",
      userName: "Ramesh",
      selfie: "https://via.placeholder.com/150",
      latitude: "28.6139",
      longitude: "77.2090",
      createdAt: new Date(),
    },
    {
      _id: "2",
      taskName: "Site Inspection",
      userName: "Suresh",
      selfie: "https://via.placeholder.com/150",
      latitude: "19.0760",
      longitude: "72.8777",
      createdAt: new Date(),
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-green-600">
        ✅ Approved Tasks
      </h2>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead className="bg-green-100 sticky top-0">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Task</th>
              <th className="border p-2">User</th>
              <th className="border p-2">Selfie</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Map</th>
              <th className="border p-2">Approved On</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task, index) => (
              <tr
                key={task._id}
                className="text-center hover:bg-gray-50"
              >
                <td className="border p-2">{index + 1}</td>

                <td className="border p-2 font-semibold">
                  {task.taskName}
                </td>

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
                  {task.latitude}
                  <br />
                  {task.longitude}
                </td>

                {/* MAP */}
                <td className="border p-2">
                  <iframe
                    title="map"
                    width="180"
                    height="110"
                    className="rounded"
                    src={`https://maps.google.com/maps?q=${task.latitude},${task.longitude}&z=14&output=embed`}
                  />
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

      {/* IMAGE PREVIEW MODAL */}
      {preview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center"
          onClick={() => setPreview(null)}
        >
          <img
            src={preview}
            alt="preview"
            className="max-h-[90%] rounded-lg"
          />
        </div>
      )}
    </div>
  );
}

export default AdminApprovedTasks;
