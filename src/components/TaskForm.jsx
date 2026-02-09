import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function TaskForm() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [taskName, setTaskName] = useState("");
  const [userName, setUserName] = useState("");
  const [selfie, setSelfie] = useState(null);
  const [preview, setPreview] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [locationText, setLocationText] = useState("");
  const [message, setMessage] = useState("");

  /* 🎥 CAMERA */
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        streamRef.current = stream;
        videoRef.current.srcObject = stream;
      });

    return () =>
      streamRef.current?.getTracks().forEach((t) => t.stop());
  }, []);

  /* 📸 CAPTURE */
  const captureSelfie = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      const file = new File([blob], "selfie.png", {
        type: "image/png",
      });
      setSelfie(file);
      setPreview(URL.createObjectURL(file));
    });
  };

  /* 📍 LOCATION */
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLatitude(pos.coords.latitude);
      setLongitude(pos.coords.longitude);
      setLocationText(
        `${pos.coords.latitude}, ${pos.coords.longitude}`
      );
    });
  };
  ///
  

  /* 🚀 SUBMIT */
//   const handleSubmit = async () => {
//   if (!taskName || !userName || !selfie) {
//     alert("All fields required");
//     return;
//   }

//   const formData = new FormData();
//   formData.append("taskName", taskName);
//   formData.append("userName", userName);
//   formData.append("selfie", selfie);
//   formData.append("latitude", latitude);
//   formData.append("longitude", longitude);

//   try {
//     const res = await axios.post(
//       "http://localhost:5000/api/tasks",
//       formData
//     );

//     // ✅ Add this line to see response in console
//     console.log("API Response:", res.data);

//     setMessage(res.data.message);
//   } catch (err) {
//     console.error("API Error:", err);
//     setMessage("Upload failed");
//   }
// };

//
//
const handleSubmit = async () => {
  if (!taskName || !userName || !selfie) {
    alert("All fields required");
    return;
  }

  const formData = new FormData();
  formData.append("taskName", taskName);
  formData.append("userName", userName);
  formData.append("selfie", selfie);
  formData.append("latitude", latitude);
  formData.append("longitude", longitude);

  try {
    const res = await axios.post(
      "http://localhost:5000/api/tasks",
      formData
    );

    console.log("API Response:", res.data); // Optional debug

    // ✅ Success hone par navigate
    if(res.data.success){ // assuming backend sends success:true
      navigate("/TaskList"); // <-- yaha tumhare route ka path
    } else {
      setMessage(res.data.message || "Upload failed");
    }

  } catch (err) {
    console.error("API Error:", err);
    setMessage("Upload failed");
  }
};


 

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

        <video ref={videoRef} autoPlay className="rounded mb-2" />

        {preview && (
          <img src={preview} className="rounded mb-2" />
        )}

        <button
          onClick={captureSelfie}
          className="bg-blue-600 text-white w-full py-2 rounded mb-2"
        >
          Capture Selfie
        </button>

        <button
  onClick={getLocation}
  className="bg-gray-700 text-white w-full py-2 rounded mb-2"
>
  Get Location
</button>

<input
  value={locationText}
  readOnly
  className="border p-2 w-full mb-3"
/>

{latitude && longitude && (
  <iframe
    title="Google Map"
    width="100%"
    height="300"
    style={{ border: 0, borderRadius: "12px" }}
    loading="lazy"
    allowFullScreen
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
          <p className="text-center text-green-600 mt-2">
            {message}
          </p>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
