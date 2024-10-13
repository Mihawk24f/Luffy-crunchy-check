document.getElementById('videoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('videoTitle').value;
    const link = document.getElementById('videoLink').value;

    // Create a new video container
    const videoContainer = document.createElement('div');
    videoContainer.className = 'video-container';
    videoContainer.innerHTML = `
        <iframe class="video-frame" src="${link}" allowfullscreen="true"></iframe>
        <p class="video-title">${title}</p>
    `;

    // Append to videos section
    document.querySelector('.videos').appendChild(videoContainer);
    
    // Clear input fields
    document.getElementById('videoForm').reset();
});

// Admin login functionality
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Basic validation (you can replace this with your own logic)
    if (username === 'admin' && password === 'password') {
        alert('Login successful!');
        // Redirect to video management or other admin features
    } else {
        alert('Invalid username or password.');
    }

    // Remember Me functionality
    if (document.getElementById('rememberMe').checked) {
        localStorage.setItem('username', username);
    } else {
        localStorage.removeItem('username');
    }
});

// Auto-fill username if remembered
window.onload = function() {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        document.getElementById('username').value = savedUsername;
        document.getElementById('rememberMe').checked = true;
    }
};
