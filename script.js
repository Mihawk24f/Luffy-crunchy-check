// Initialize default admin credentials if not set
if (!localStorage.getItem('adminUsername') && !localStorage.getItem('adminPassword')) {
    localStorage.setItem('adminUsername', 'admin');
    localStorage.setItem('adminPassword', 'admin123');
}

// Retrieve videos from localStorage or use default
const videoList = JSON.parse(localStorage.getItem('videos')) || [
    { title: "Exclusive Hot Video | Premium Gold Exclusive Part 01", link: "https://go.screenpal.com/player/cZ6XfBVWOyJ?ff=1" },
    { title: "Exclusive Hot Video | Premium Gold Exclusive Part 02 | Final", link: "https://go.screenpal.com/player/cZ6XfBVWOyd?ff=1" },
];

// Function to render videos
function renderVideos() {
    const videosSection = document.getElementById('videos');
    videosSection.innerHTML = '<h3>Hot Videos:</h3>'; // Reset content

    videoList.forEach(video => {
        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-container';
        videoContainer.innerHTML = `
            <iframe class="video-frame" src="${video.link}" allowfullscreen></iframe>
            <p class="part1">${video.title}</p>
        `;
        videosSection.appendChild(videoContainer);
    });
}

// Call renderVideos on page load
document.addEventListener('DOMContentLoaded', renderVideos);

// Admin Login Function
function login() {
    const usernameInput = document.getElementById('username').value.trim();
    const passwordInput = document.getElementById('password').value.trim();
    const rememberMe = document.getElementById('rememberMe').checked;

    const storedUsername = localStorage.getItem('adminUsername');
    const storedPassword = localStorage.getItem('adminPassword');

    if (usernameInput === storedUsername && passwordInput === storedPassword) {
        // Hide login form and show video management
        document.getElementById('login').style.display = 'none';
        document.querySelector('.video-form').style.display = 'flex';

        // If "Remember Me" is checked, keep user logged in
        if (rememberMe) {
            localStorage.setItem('isLoggedIn', 'true');
        }
    } else {
        alert('Invalid login credentials!');
    }
}

// Check if user is already logged in
window.onload = function() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        document.getElementById('login').style.display = 'none';
        document.querySelector('.video-form').style.display = 'flex';
    }
};

// Function to add a new video
function addVideo() {
    const title = document.getElementById('videoTitle').value.trim();
    let link = document.getElementById('videoLink').value.trim();

    if (title === '' || link === '') {
        alert('Please fill out both the title and URL fields.');
        return;
    }

    // Convert YouTube direct links to embed links
    if (link.includes('youtube.com/watch')) {
        const urlParams = new URLSearchParams(new URL(link).search);
        const videoID = urlParams.get('v');
        if (videoID) {
            link = `https://www.youtube.com/embed/${videoID}`;
        } else {
            alert('Invalid YouTube URL.');
            return;
        }
    }

    // Add new video to the list and update localStorage
    videoList.push({ title: title, link: link });
    localStorage.setItem('videos', JSON.stringify(videoList));

    // Re-render videos
    renderVideos();

    // Clear input fields
    document.getElementById('videoTitle').value = '';
    document.getElementById('videoLink').value = '';

    alert('Video added successfully!');
}

// Function to delete a video
function deleteVideo() {
    const titleToDelete = prompt('Enter the exact title of the video you want to delete:');

    if (!titleToDelete) {
        alert('Deletion cancelled.');
        return;
    }

    const index = videoList.findIndex(video => video.title === titleToDelete.trim());

    if (index !== -1) {
        videoList.splice(index, 1);
        localStorage.setItem('videos', JSON.stringify(videoList));
        renderVideos();
        alert('Video deleted successfully!');
    } else {
        alert('Video title not found. Please ensure you entered the correct title.');
    }
}
