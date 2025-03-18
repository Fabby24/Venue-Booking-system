function fetchVenues() {
    const capacity = document.getElementById('capacityOption').value;
    const venueSelect = document.getElementById('venueSelect');
    venueSelect.innerHTML = '';

    fetch(`/fetch_venues?capacity_group=${capacity}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                let option = document.createElement('option');
                option.value = '';
                option.text = 'No available venues';
                venueSelect.appendChild(option);
            } else {
                data.forEach(venue => {
                    let option = document.createElement('option');
                    option.value = venue.id;
                    option.text = venue.name;
                    venueSelect.appendChild(option);
                });
            }
        });
}

function bookVenue() {
    const lecturerName = document.getElementById('lecturerName').value.trim();
    const courseTitle = document.getElementById('courseTitle').value.trim();
    const bookingTime = document.getElementById('bookingTime').value;
    const department = document.getElementById('department').value;
    const venueId = document.getElementById('venueSelect').value;

    if (!lecturerName || !courseTitle || !bookingTime || !department || !venueId) {
        alert('Please fill all fields before booking!');
        return;
    }

    const bookingData = {
        lecturer_name: lecturerName,
        course_title: courseTitle,
        booking_time: bookingTime,
        department: department,
        venue_id: venueId
    };

    fetch('/book_venue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('message').innerHTML = data;
        fetchVenues(); // Refresh available venues after booking
    });
}
