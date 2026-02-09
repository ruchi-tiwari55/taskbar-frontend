<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
include_once("./lorus_include/lorus_db.php");
include_once("./lorus_include/function.php");
$search_term = $_SESSION['mobile'];
if ($search_term) {
    $response = check_user_step($search_term);
    $response_data = json_decode($response, true);
    $current_url = basename($_SERVER['PHP_SELF']); 
    if($response_data['message'] == 1) {
        $target_url = $response_data['redirect'];
        if ($current_url !== $target_url) {
            header('Location: ' . $target_url);
            exit;
        }
    }elseif ($response_data['message'] == 2) {
        $target_url = $response_data['redirect'];
        if ($current_url !== $target_url) {
            header('Location: ' . $target_url);
            exit;
        }
    }elseif($response_data['message'] == 0) {
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
  <title>Selfie Tips</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"/>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
      <style>
        #video {
            border: 2px dashed #ccc;
            border-radius: 8px;
        }
    </style>
</head>
<body class="bg-gray-100 flex items-center justify-center min-h-screen px-4">
<div class="bg-white rounded-2xl shadow-lg w-full max-w-xs p-5 mx-auto">

    
    <script>
      const totalSteps = 14;
      const currentStep = 8; // 🔁 Change this to highlight current step (1–14)
    
      function renderSteps(start, end, containerId, lineId) {
        const container = document.getElementById(containerId);
        const stepCount = end - start + 1;
    
        for (let i = start; i <= end; i++) {
          const step = document.createElement("div");
          step.className = "relative z-10 flex flex-col items-center w-full";
    
          const circle = document.createElement("div");
          circle.className =
            "w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold";
    
          if (i < currentStep) {
            circle.classList.add("bg-blue-600", "text-white");
            circle.textContent = "✓";
          } else if (i === currentStep) {
            circle.classList.add("bg-orange-500", "text-white");
            circle.textContent = i;
          } else {
            circle.classList.add("bg-gray-300", "text-gray-700");
            circle.textContent = i;
          }
    
          const label = document.createElement("span");
          label.className = "mt-1 text-[10px] font-medium";
          label.textContent = `Step ${i}`;
    
          if (i < currentStep) label.classList.add("text-blue-800");
          else if (i === currentStep) label.classList.add("text-orange-600");
          else label.classList.add("text-gray-500");
    
          step.appendChild(circle);
          step.appendChild(label);
          container.appendChild(step);
        }
    
        // Progress line calculation
        const completed = Math.min(Math.max(currentStep - start, 0), stepCount - 1);
        const progress = (completed / (stepCount - 1)) * 100;
        document.getElementById(lineId).style.width = `${progress}%`;
      }
    
      renderSteps(1, 7, "progressRow1", "progressLine1");
      renderSteps(8, 14, "progressRow2", "progressLine2");
    </script>

  <!-- Selfie Capture -->
  <div class="bg-blue-600 rounded-xl p-3 flex justify-center shadow-inner">
    <video id="video" class="w-40 h-40 object-cover rounded-full border-4 border-white shadow-lg" autoplay></video>
  </div>

  <!-- Captured Image Preview -->
  <div id="selfie-image" class="mt-5 hidden">
    <h3 class="text-base font-semibold text-gray-800 mb-2">Captured Selfie:</h3>
    <img id="captured-selfie" src="" alt="User's captured selfie" class="w-full rounded-xl border border-gray-300 shadow-sm">
    <input type="file" id="image-input" name="selfie" class="hidden" />
  </div>

  <!-- Selfie Tips -->
  <div class="mt-6 text-center">
    <h2 class="text-base font-semibold text-gray-800">Selfie Tips</h2>
    <ul class="mt-3 space-y-3 text-sm text-gray-700 text-left px-3">
      <li class="flex items-start gap-2">
        <i class="fas fa-smile text-blue-600 mt-1"></i>
        <span>Ensure your face is clearly visible</span>
      </li>
      <li class="flex items-start gap-2">
        <i class="fas fa-camera text-blue-600 mt-1"></i>
        <span>Look directly at the camera</span>
      </li>
      <li class="flex items-start gap-2">
        <i class="fas fa-glasses text-blue-600 mt-1"></i>
        <span>Remove spectacles, masks, and hats</span>
      </li>
    </ul>

    <!-- Capture Button -->
    <button id="capture-btn" class="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium shadow">
      Click Photo
    </button>
  </div>
</div>

  
  <script>
        const video = document.getElementById('video');
        const captureBtn = document.getElementById('capture-btn');
        const selfieImage = document.getElementById('selfie-image');
        const capturedSelfie = document.getElementById('captured-selfie');
        const imageInput = document.getElementById('image-input');

        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                video.srcObject = stream;
            })
            .catch(err => {
                console.error("Error accessing the camera: ", err);
            });

        captureBtn.addEventListener('click', captureSelfie);

        function captureSelfie() {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataURL = canvas.toDataURL('image/png');
            capturedSelfie.src = dataURL;
            selfieImage.classList.remove('hidden');
        
            // Send the image to the server via AJAX
            uploadSelfie(dataURL);
        }
        
        function uploadSelfie(dataURL) {
            const randomFileName = 'selfie_' + Date.now() + '_' + Math.floor(Math.random() * 1000) + '.png';
            const blob = dataURLtoBlob(dataURL);
            const file = new File([blob], randomFileName, { type: 'image/png' });

            // Create FormData and append the file
            const formData = new FormData();
            formData.append('selfie', file);

            // AJAX request to upload the file
            $.ajax({
            url: 'lorus_include/ajax.php?action=step_8',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            beforeSend: function () {
                $('#submit-btn').prop('disabled', true).text('Processing...');
            },
            success: function (response) {
                console.log(response);
                const res = JSON.parse(response);  // Assuming the server returns JSON
                if (res.status === 'success') {
                    window.location.href = 'step_9.php';
                } else {
                    alert('Verification failed. Please try again.');
                }
            },
            error: function (xhr, status, error) {
                console.error("Submission Error: ", error);
                alert('An error occurred while submitting the form.');
            },
            complete: function () {
                $('#submit-btn').prop('disabled', false).text('Proceed');
            }
        });
        }

        function dataURLtoBlob(dataURL) {
            const byteString = atob(dataURL.split(',')[1]);
            const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ab], { type: mimeString });
        }
    </script>
</body>
</html>
