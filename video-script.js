// Admin Login Functionality
function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'password123') {
        localStorage.setItem('isLoggedIn', true); // Store login state
        window.location.href = 'dashboard.html'; // Redirect to the dashboard
        return false; // Prevent form submission
    } else {
        document.getElementById('error-message').innerText = 'Invalid username or password';
        return false; // Prevent form submission
    }
}

// Check if the user is logged in on the admin dashboard
if (window.location.pathname === '/dashboard.html' && !localStorage.getItem('isLoggedIn')) {
    window.location.href = 'admin.html'; // Redirect to login if not logged in
}

// Logout Functionality
function logout() {
    localStorage.removeItem('isLoggedIn'); // Remove login state
    window.location.href = 'index.html'; // Redirect to home after logout
}

// Video Search Functionality
function searchVideos() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const videos = document.getElementsByClassName('video-container');

    for (let i = 0; i < videos.length; i++) {
        const title = videos[i].getAttribute('data-title').toLowerCase();
        if (title.includes(searchInput)) {
            videos[i].style.display = 'block';
        } else {
            videos[i].style.display = 'none';
        }
    }
}

// Upload Video Functionality (dummy for now)
function uploadVideo() {
    // Here you can add logic to store video URLs and titles in a database (if possible)
    alert('Video uploaded successfully!');
}
