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

// Upload Video Functionality
function uploadVideo(event) {
    event.preventDefault(); // Prevent form submission

    const videoUrl = document.getElementById('videoUrl').value;
    const videoTitle = document.getElementById('videoTitle').value;
    const videoCategory = document.getElementById('videoCategory').value;

    if (videoUrl && videoTitle) {
        // Convert the video URL to an embeddable link
        const embedUrl = videoUrl.replace("watch?v=", "embed/");
        
        // Store video details in local storage
        const videos = JSON.parse(localStorage.getItem('videos')) || [];
        videos.push({ url: embedUrl, title: videoTitle, category: videoCategory });
        localStorage.setItem('videos', JSON.stringify(videos));

        // Clear the input fields
        document.getElementById('videoUrl').value = '';
        document.getElementById('videoTitle').value = '';
        document.getElementById('videoCategory').value = '';

        alert('Video uploaded successfully!');
        renderVideos(); // Refresh video list on the dashboard
    } else {
        alert('Please fill in all fields.');
    }
}

// Function to render videos on the main page
function renderVideos() {
    const videoList = document.getElementById('videoList');
    videoList.innerHTML = ''; // Clear existing video list

    const videos = JSON.parse(localStorage.getItem('videos')) || [];
    videos.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-container');
        videoItem.innerHTML = `
            <iframe class="video-frame" src="${video.url}?ff=1" allowfullscreen="true"></iframe>
            <p class="video-title">${video.title}</p>
        `;
        videoList.appendChild(videoItem);
    });
}

// Render videos on page load
if (window.location.pathname === '/index.html') {
    renderVideos();
}

// Also render videos on the dashboard
if (window.location.pathname === '/dashboard.html') {
    renderVideos();
}
