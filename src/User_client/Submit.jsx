import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TaskForm() {
  const [taskName, setTaskName] = useState("");
  const [selfie, setSelfie] = useState(null);
  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  

  const navigate = useNavigate();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // ✅ Start camera on mount
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Camera error:", err);
      });
  }, []);

  // 📍 Get current location
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      () => {
        alert("Location access denied");
      },
      { enableHighAccuracy: true }
    );
  };

  // 📷 Capture selfie from video
  const captureSelfie = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/png");
    setSelfie(dataURL);
  };

  // 📤 Submit form
   const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selfie) {
    alert("Please capture your selfie first");
    return;
  }

  const formData = new FormData();
  formData.append("taskName", taskName);

  const byteString = atob(selfie.split(",")[1]);
  const mime = selfie.split(",")[0].match(/:(.*?);/)[1];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  const file = new File([ab], `selfie_${Date.now()}.png`, { type: mime });

  formData.append("selfie", file);
  formData.append("latitude", location.latitude);
  formData.append("longitude", location.longitude);

  try {
    setLoading(true);

    await axios.post(
      "http://localhost:5000/api/tasks",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    setMessage("✅ Task submitted successfully");

    // ✅ SUCCESS ke baad hi redirect
    setTimeout(() => {
      navigate("/TaskList");
    }, 1000);

  } catch (err) {
    console.error(err);
    setMessage("❌ Failed to submit task");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white max-w-md w-full p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center mb-5">Task Submission</h2>

        {/* Camera Preview */}
        <div className="flex justify-center mb-4">
          <video
            ref={videoRef}
            autoPlay
            className="w-40 h-40 object-cover rounded-full border-4 border-blue-500 shadow-md"
          />
        </div>

        {/* Capture Button */}
        <div className="flex justify-center mb-4">
          <button
            type="button"
            onClick={captureSelfie}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Capture Selfie
          </button>
        </div>

        {/* Selfie Preview */}
        {selfie && (
          <div className="mb-4 text-center">
            <h3 className="text-sm font-semibold mb-2">Captured Selfie:</h3>
            <img src={selfie} alt="Captured Selfie" className="w-32 h-32 mx-auto rounded-full border shadow-sm" />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Task Name */}
          <div>
            <label className="block mb-1 font-medium">Task Name</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* Location */}
          {/* <div>
            <label className="block mb-1 font-medium">Location</label>
            <button
              type="button"
              onClick={getLocation}
              className="w-full bg-gray-200 py-2 rounded-md mb-2"
            >
              Get Current Location
            </button>
            {location.latitude && (
              <p className="text-sm text-gray-600">
                📍 Lat: {location.latitude}, Lng: {location.longitude}
              </p>
            )}
          </div> */}

          {/* Submit */}

          {/* Location */}
<div>
  <label className="block mb-1 font-medium">Location</label>

  <button
    type="button"
    onClick={getLocation}
    className="w-full bg-gray-200 py-2 rounded-md mb-2"
  >
    Get Current Location
  </button>

  {location.latitude && (
    <>
      <p className="text-sm text-gray-600 mb-2">
        📍 Lat: {location.latitude}, Lng: {location.longitude}
      </p>

      {/* ✅ GOOGLE MAP IFRAME */}
      <iframe
        title="Current Location Map"
        width="100%"
        height="300"
        style={{ border: 0, borderRadius: "10px" }}
        loading="lazy"
        allowFullScreen
        src={`https://maps.google.com/maps?q=${location.latitude},${location.longitude}&z=15&output=embed`}
      />
    </>
  )}
</div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Task"}
          </button>
        </form>

        <canvas ref={canvasRef} className="hidden" /> {/* Hidden canvas for capturing selfie */}

        {message && <p className="text-center text-sm mt-2">{message}</p>}
      </div>
    </div>
  );
}

export default TaskForm;
