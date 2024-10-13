// Store initial username and password in local storage
if (!localStorage.getItem('username') && !localStorage.getItem('password')) {
    localStorage.setItem('username', 'admin');
    localStorage.setItem('password', 'admin123');
}

// Initialize videos from localStorage
const videoList = JSON.parse(localStorage.getItem('videos')) || [];
const videoListElement = document.getElementById('videos');

// Function to render videos from localStorage
function renderVideos() {
    videoListElement.innerHTML = '<h3>Hot Videos:</h3>';
    videoList.forEach(video => {
        const videoHTML = `
            <p>${video.title}</p>
            <iframe width="100%" height="100%" style="border:0;" scrolling="no" 
                src="${video.link}?controls=1" allowfullscreen="true"></iframe>`;
        videoListElement.innerHTML += videoHTML;
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
    let link = document.getElementById('videoLink').value;

    // Check if the link is a YouTube direct link and convert it to an embed link
    if (link.includes('youtube.com/watch')) {
        const videoID = link.split('v=')[1];
        link = `https://www.youtube.com/embed/${videoID}`;
    }

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
    const titleToDelete = prompt('Enter the title of the video to delete:');
    const videoIndex = videoList.findIndex(video => video.title === titleToDelete);

    if (videoIndex > -1) {
        videoList.splice(videoIndex, 1);
        localStorage.setItem('videos', JSON.stringify(videoList));
        renderVideos();
        alert('Video deleted successfully!');
    }
}
