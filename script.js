// Store initial username and password in local storage
if (!localStorage.getItem('username') && !localStorage.getItem('password')) {
    localStorage.setItem('username', 'admin');
    localStorage.setItem('password', 'admin123');
}

// Initialize videos from localStorage
const videoList = JSON.parse(localStorage.getItem('videos')) || [
    { title: "Exclusive Hot Video | Premium Gold Exclusive Part 01", link: "https://go.screenpal.com/player/cZ6XfBVWOyJ?ff=1" },
    { title: "Exclusive Hot Video | Premium Gold Exclusive Part 02 | Final", link: "https://go.screenpal.com/player/cZ6XfBVWOyd?ff=1" },
];

// Function to render videos from localStorage
function renderVideos() {
    const videoListElement = document.getElementById('videos');
    videoListElement.innerHTML = '<h3>Hot Videos:</h3>';
    videoList.forEach(video => {
        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-container';
        videoContainer.innerHTML = `
            <iframe class="video-frame" src="${video.link}" allowfullscreen="true"></iframe>
            <p class="part1">${video.title}</p>
        `;
        videoListElement.appendChild(videoContainer);
    });
}

// Call render function to display videos on page load
renderVideos();

// Admin login logic
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    const rememberMe = document.getElementById('rememberMe').checked;

    if (username === storedUsername && password === storedPassword) {
        document.querySelector('.video-form').style.display = 'flex';
        document.querySelector('.admin-login').style.display = 'none';

        // If "Remember Me" is checked, store the login state
        if (rememberMe) {
            localStorage.setItem('isLoggedIn', 'true');
        }
    } else {
        alert('Invalid login credentials!');
    }
}

// Check if the user is already logged in
if (localStorage.getItem('isLoggedIn') === 'true') {
    document.querySelector('.video-form').style.display = 'flex';
    document.querySelector('.admin-login').style.display = 'none';
}

// Video management logic
function addVideo() {
    const title = document.getElementById('videoTitle').value;
    const link = document.getElementById('videoLink').value;

    if (title && link) {
        videoList.push({ title: title, link: link });
        localStorage.setItem('videos', JSON.stringify(videoList));
        renderVideos();
        alert('Video added successfully!');
    } else {
        alert('Please fill out both fields!');
    }
}

function deleteVideo() {
    const title = document.getElementById('videoTitle').value;

    const index = videoList.findIndex(video => video.title === title);
    if (index > -1) {
        videoList.splice(index, 1);
        localStorage.setItem('videos', JSON.stringify(videoList));
        renderVideos();
        alert('Video deleted successfully!');
    } else {
        alert('Video not found!');
    }
}
