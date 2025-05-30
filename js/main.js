// Main JavaScript file

document.addEventListener("DOMContentLoaded", function() {
  // Initialize typed.js
  initTyped();
  
  // Initialize particles.js
  initParticles();
  
  // Set up scrolling animations
  setupScrollAnimations();
  
  // Setup navigation
  setupNavigation();
  
  // Custom cursor
  setupCustomCursor();
  
  // Project filtering
  setupProjectFilters();
  
  // Back to top button
  setupBackToTop();
  
  // Contact form validation
  setupContactForm();
});

// Initialize Typed.js
function initTyped() {
  new Typed('.typed-text', {
    strings: [
      'Web Developer',
      'UI/UX Designer',
      'Machine Learning Enthusiast',
      'Problem Solver',
      'Tech Lover',
      'Architecture Enthusiast',
      'Open Source Contributor',
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true
  });
}

// Initialize particles.js
function initParticles() {
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: "#00f7ff"
        },
        shape: {
          type: "triangle",
          stroke: {
            width: 0,
            color: "#000000"
          },
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#00f7ff",
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab"
          },
          onclick: {
            enable: true,
            mode: "push"
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1
            }
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  }
}

// Set up scrolling animations
function setupScrollAnimations() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const navLinks = document.querySelector('.nav-links');
        const mobileMenu = document.querySelector('.mobile-menu-icon');
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          mobileMenu.classList.remove('change');
        }
      }
    });
  });
  
  // Reveal elements on scroll
  const fadeElements = document.querySelectorAll('.section');
  
  const fadeInOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
  };
  
  const fadeInObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, fadeInOptions);
  
  fadeElements.forEach(element => {
    fadeInObserver.observe(element);
  });
  
  // Animate skill bars when they come into view
  const skillBars = document.querySelectorAll('.skill-level');
  
  const skillBarOptions = {
    threshold: 0.5
  };
  
  const skillBarObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.style.width;
        entry.target.style.width = "0";
        setTimeout(() => {
          entry.target.style.width = width;
        }, 100);
        observer.unobserve(entry.target);
      }
    });
  }, skillBarOptions);
  
  skillBars.forEach(bar => {
    skillBarObserver.observe(bar);
  });
}

// Set up navigation
function setupNavigation() {
  // Mobile menu toggle
  const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
  const navLinks = document.querySelector('.nav-links');
  
  mobileMenuIcon.addEventListener('click', function() {
    this.classList.toggle('change');
    navLinks.classList.toggle('active');
  });

  document.getElementById('logout')?.addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.removeItem('loggedIn');
    window.location.href = 'login.html';
});
  
  // Update active nav link on scroll
  const sections = document.querySelectorAll('.section');
  const navItems = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollY >= (sectionTop - sectionHeight/3)) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });
}

// Custom cursor
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
    
    // Cursor hover effects
    const links = document.querySelectorAll('a, button, .project-card,.certificate-card, input, textarea, .footer-content ');
    
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.backgroundColor = 'transparent';
        cursor.style.border = '2px solid var(--neon-blue)';
        
        if (link.classList.contains('primary-btn')) {
          cursorBlur.style.backgroundColor = 'rgba(255, 45, 85, 0.1)';
        } else if (link.classList.contains('project-card')) {
          cursorBlur.style.backgroundColor = 'rgba(255, 221, 0, 0.05)';
        }
      });
      
      link.addEventListener('mouseleave', () => {
        cursor.style.width = '12px';
        cursor.style.height = '12px';
        cursor.style.backgroundColor = 'var(--neon-blue)';
        cursor.style.border = 'none';
        
        cursorBlur.style.backgroundColor = 'rgba(0, 247, 255, 0.05)';
      });
    });
  }
}

// Project filtering
function setupProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      filterBtns.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get filter value
      const filterValue = this.getAttribute('data-filter');
      
      // Filter projects
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.classList.contains(filterValue)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Certificates Section JavaScript

document.addEventListener("DOMContentLoaded", function() {
  // Initialize certificate filtering if needed
  setupCertificateFilters();
  
  // Add animation delays for certificate cards
  animateCertificateCards();
  
  // Add hover effects for certificate cards
  setupCertificateHoverEffects();
});

// Certificate filtering functionality (similar to projects)
function setupCertificateFilters() {
  const filterBtns = document.querySelectorAll('.certificates-filter-btn');
  const certificateCards = document.querySelectorAll('.certificate-card');
  
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get filter value
        const filterValue = this.getAttribute('data-filter');
        
        // Filter certificates
        certificateCards.forEach(card => {
          if (filterValue === 'all' || card.classList.contains(filterValue)) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 100);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
}

// Back to top button
function setupBackToTop() {
  const backToTop = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
}

// Contact form validation
function setupContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple validation
      let isValid = true;
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const subject = document.getElementById('subject');
      const message = document.getElementById('message');
      
      if (name.value.trim() === '') {
        isValid = false;
        name.style.borderColor = 'var(--neon-red)';
      } else {
        name.style.borderColor = '';
      }
      
      if (email.value.trim() === '' || !isValidEmail(email.value)) {
        isValid = false;
        email.style.borderColor = 'var(--neon-red)';
      } else {
        email.style.borderColor = '';
      }
      
      if (subject.value.trim() === '') {
        isValid = false;
        subject.style.borderColor = 'var(--neon-red)';
      } else {
        subject.style.borderColor = '';
      }
      
      if (message.value.trim() === '') {
        isValid = false;
        message.style.borderColor = 'var(--neon-red)';
      } else {
        message.style.borderColor = '';
      }
      
      if (isValid) {
        // In a real application, you would send the form data to a server
        alert('Thank you! Your message has been sent successfully.');
        contactForm.reset();
      }
    });
  }
}

// Helper function to validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}