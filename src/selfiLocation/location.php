
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">

 <style>
html{
    overflow:none !important;
}
.field-error {
    border: 2px solid red !important;
    background-color: #ffe6e6;
}

   /* Style for the fieldset steps */
.wizard-fieldset {
    display: none;
    opacity: 0;
    transform: translateX(50px);
    transition: opacity 0.4s ease, transform 0.4s ease;
}

/* Show the current step */
.wizard-fieldset.show {
    display: block;
    opacity: 1;
    transform: translateX(0);
}

/* Style for the buttons */
.form-wizard-next-btn,
.form-wizard-prev-btn {
    display: inline-block;
    margin: 10px 5px;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.form-wizard-next-btn:hover,
.form-wizard-prev-btn:hover {
    background-color: #0056b3;
}

/* Disable pointer events for hidden steps */
.wizard-fieldset:not(.show) {
    pointer-events: none;
    visibility: hidden;
}
 
/* Flexbox for horizontal layout */
.form-wizard-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    padding: 0;
    margin: 0;
    list-style: none;
}

/* Default step styles */
.form-wizard-list__item {
    position: relative;
    padding: 10px 20px;
    color: gray;
    text-align: center;
    cursor: pointer;
    transition: color 0.3s ease, background-color 0.3s ease;
    flex: 1;
}

/* Active and completed step styles */
.form-wizard-list__item.active {
    color: #007bff;
    font-weight: bold;
}

.form-wizard-list__item.completed {
    background-color: #004085;
    color: white;
    border-radius: 8px;
}

.form-wizard-list__item.completed .status {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
    color: white;
    font-weight: bold;
}

.form-wizard-list__line {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
    position: relative;
}

.count {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #007bff;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 16px;
    margin: 0 auto;
}

.completed .count {
    background-color: #004085;
}

<!-- Modern Input Styles -->
    .input-modern-lg {
        font-size: 1rem;
        padding: 15px 18px;
        border-radius: 12px;
        border: 1px solid #ccc;
        background-color: #f9f9f9;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        transition: all 0.3s ease-in-out;
    }

    .input-modern-lg:focus {
        border-color: #007bff;
        background-color: #fff;
        box-shadow: 0 2px 10px rgba(0, 123, 255, 0.25);
    }

    .form-label {
        font-weight: 500;
        margin-bottom: 6px;
        color: #333;
    }

    .btn {
        border-radius: 50px;
        font-size: 1rem;
        transition: all 0.3s ease;
    }

    .btn-lg {
        padding: 14px 28px;
    }

    @media (max-width: 768px) {
        .btn {
            width: 100%;
        }

        .input-modern-lg {
            font-size: 1rem;
            padding: 12px 14px;
        }
    }

    .wizard-fieldset {
        display: none;
    }

    .wizard-fieldset.show {
        display: block;
    }
    
    .input-modern-select {
    font-size: 1rem;
    padding: 0px 16px;
    border-radius: 12px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg width='16' height='16' fill='gray' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M4.646 6.146a.5.5 0 0 1 .708 0L8 8.793l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 16px 16px;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.input-modern-select:focus {
    border-color: #007bff;
    background-color: #fff;
    box-shadow: 0 2px 10px rgba(0, 123, 255, 0.2);
    outline: none;
}
input[type="checkbox"],
input[type="checkbox"]:checked + span {
    border: 2px solid #007bff;
    background-color: #e9f5ff;
    border-radius: 5px;
    padding: 2px 6px;
}
</style>

  <main id="main">

<section id="portfolio" class="portfolio" style="color:black;">


<div class="container bg-white p-4 shadow rounded" style="max-width:900px;">

  <form id="candidateForm" action="ajax_submit_js.php" method="POST" enctype="multipart/form-data">

    <div class="step" id="step4">
      <h5 class="mb-3">Map Location</h5>

            

            <label class="form-label mb-0 col-sm-2">Current Location</label>
                <div class="input-group">
                <input type="text" id="location" name="location" class="form-control" placeholder="Enter Current Location" required>
                <button type="button" class="btn btn-primary" onClick="getLocation()">Get Location</button>
            </div>
        
        <iframe
                id="mapFrame"
                width="100%"
                height="350"
                frameborder="0"
                style="border:0"
                allowfullscreen
                loading="lazy">
            </iframe>

    </div>
  </form>
  

</div>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<script>
	function getLocation() {
		if (!navigator.geolocation) {
			Swal.fire("Error", "Geolocation is not supported by this browser.", "error");
			return;
		}

		navigator.geolocation.getCurrentPosition(
			showPosition,
			showError,
			{
				enableHighAccuracy: true,
				timeout: 15000,
				maximumAge: 0
			}
		);
	}

	function showPosition(position) {
		selectedLat = position.coords.latitude;
		selectedLng = position.coords.longitude;

		document.getElementById("location").value =
			selectedLat + ", " + selectedLng;

		// Map in STEP 4
		document.getElementById("mapFrame").src =
			`https://maps.google.com/maps?q=${selectedLat},${selectedLng}&z=15&output=embed`;
	}

	function showError(error) {
		Swal.fire({
			icon: "warning",
			title: "Location Access Required",
			text: "Please allow location access to continue."
		});
	}
	</script>


</section>
</main><!-- End #main -->

</body>

</html>