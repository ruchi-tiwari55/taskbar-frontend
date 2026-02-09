import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserTask() {
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const streamRef = useRef(null);

  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [selfie, setSelfie] = useState(null);
  const [preview, setPreview] = useState("");
  const [userName, setUserName] = useState("");


  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [locationText, setLocationText] = useState("");
  const [message, setMessage] = useState("");
  ///
  //



  /* 📸 START CAMERA */
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" }
      });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
    } catch (err) {
      alert("Camera permission blocked. Please allow camera access.");
    }
  };

  /* 📷 CAPTURE SELFIE */


  /* 🛑 STOP CAMERA */
  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(track => track.stop());
  };
     //
     ///
     ///
 
  /* 📍 LOCATION */

  const getLocation = () => {
  console.log("Get Location clicked");

  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      console.log("Location success", pos.coords);
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      setLatitude(lat);
      setLongitude(lng);
      setLocationText(`${lat}, ${lng}`);
    },
    (error) => {
      console.log("Location error", error);
      alert("Location error: " + error.message);
    }
  );
};
//
////
const capturePhoto = () => {
  const video = videoRef.current;
  const canvas = canvasRef.current;

  if (!video || !canvas) {
    alert("Camera not ready");
    return;
  }

  // 👇 IMPORTANT FIX
  if (video.videoWidth === 0) {
    alert("Camera is loading, please wait 1–2 seconds");
    return;
  }

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  canvas.toBlob((blob) => {
    if (!blob) {
      alert("Failed to capture image");
      return;
    }

    const file = new File([blob], "selfie.jpg", {
      type: "image/jpeg",
    });

    console.log("📸 Selfie file:", file); // 👈 DEBUG

    setSelfie(file);
    setPreview(URL.createObjectURL(file));
  }, "image/jpeg");

  stopCamera();
};

//

 



  /* 🚀 SUBMIT */
  const handleSubmit = async () => {
    
  if (!taskName || !userName || !selfie) {
    alert("Task name, username & selfie required");
      console.log("Submitting selfie:", selfie);
    return;
  

  }

  const formData = new FormData();
  formData.append("taskName", taskName);
  formData.append("userName", userName); // ✅ IMPORTANT
  formData.append("description", description);
  formData.append("selfie", selfie);     // ✅ file with name
  formData.append("latitude", latitude);
  formData.append("longitude", longitude);

  try {
    const res = await axios.post(
      "http://localhost:5000/api/tasks",
      formData
    );

    if (res.data.success) {
      navigate("/TaskList");
    } else {
      setMessage(res.data.message);
    }
  } catch (err) {
    setMessage("Upload failed");
  }
};


  /* CLEANUP */
  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-5 rounded-xl w-80 shadow">

        <input
          className="border p-2 w-full mb-2"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
  className="border p-2 w-full mb-2"
  placeholder="User Name"
  value={userName}
  onChange={(e) => setUserName(e.target.value)}
/>


        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {!preview && (
          <>
            
            <video
  ref={videoRef}
  autoPlay
  muted
  playsInline
  className="rounded mb-2"
/>


            <button
              onClick={startCamera}
              className="bg-indigo-600 text-white w-full py-2 rounded mb-2"
            >
              Start Camera
            </button>

            <button
              onClick={capturePhoto}
              className="bg-blue-600 text-white w-full py-2 rounded mb-2"
            >
              Capture Selfie
            </button>
          </>
        )}

        {preview && (
          <img src={preview} className="rounded mb-3" />
        )}

       <button
  onClick={getLocation}
  className="bg-gray-700 text-white w-full py-2 rounded mb-2"
>
  {latitude ? "Location Captured ✅" : "Get Location"}
</button>
  <canvas ref={canvasRef} className="hidden" />


        <input
          value={locationText}
          readOnly
          className="border p-2 w-full mb-3"
        />

        {latitude && longitude && (
          <iframe
            title="map"
            width="100%"
            height="200"
            className="rounded mb-3"
            src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
          />
        )}

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          Submit Task
        </button>

        {message && (
          <p className="text-center text-green-600 mt-2">{message}</p>
        )}

       
      </div>
    </div>
  );
}
