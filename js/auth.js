document.addEventListener('DOMContentLoaded', () => {
    // Handle registration
    if(document.getElementById('registerForm')) {
        document.getElementById('registerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('regUsername').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if(password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            // Store user in localStorage
            localStorage.setItem('user', JSON.stringify({
                username,
                email,
                password
            }));

            alert('Registration successful! Please login.');
            window.location.href = 'login.html';
        });
    }

    // Handle login
    if(document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            const storedUser = JSON.parse(localStorage.getItem('user'));

            if(storedUser && storedUser.username === username && storedUser.password === password) {
                // Create session
                sessionStorage.setItem('loggedIn', 'true');
                window.location.href = 'index.html';
            } else {
                alert('Invalid credentials!');
            }
        });
    }
});

// auth.js
document.addEventListener("DOMContentLoaded", function() {
  initParticles();
  setupCustomCursor();
});

// Particles initialization (same as main.js)
function initParticles() {
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      // Keep the same config as in main.js
      particles: {
        /* same configuration */
      },
      interactivity: {
        /* same configuration */
      },
      retina_detect: true
    });
  }
}

// Custom cursor (same as main.js)
function setupCustomCursor() {
  const cursor = document.getElementById('cursor');
  const cursorBlur = document.getElementById('cursor-blur');
  
  if (window.innerWidth > 991) {
    document.addEventListener('mousemove', function(e) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursorBlur.style.left = e.clientX + 'px';
      cursorBlur.style.top = e.clientY + 'px';
    });

    const links = document.querySelectorAll('a, button, input, .neon-btn');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.backgroundColor = 'transparent';
        cursor.style.border = '2px solid var(--neon-blue)';
      });
      
      link.addEventListener('mouseleave', () => {
        cursor.style.width = '12px';
        cursor.style.height = '12px';
        cursor.style.backgroundColor = 'var(--neon-blue)';
        cursor.style.border = 'none';
      });
    });
  }
}