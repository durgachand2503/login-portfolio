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
  
  // Initialize lazy loading for images
  setupLazyLoading();
  
  // Initialize mobile optimizations
  initMobileOptimizations();
  
  // Setup contact form interactions
  setupContactForm();
  
  // Performance optimizations
  setupPerformanceOptimizations();
});

// Initialize Typed.js
function initTyped() {
  if (typeof Typed !== 'undefined') {
    new Typed('.typed-text', {
      strings: [
        'Web Developer',
        'UI/UX Designer',
        'Machine Learning Enthusiast',
        'Problem Solver',
        'Tech Innovator',
        'Architecture Specialist',
        'Open Source Contributor'
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 2000,
      loop: true,
      smartBackspace: true,
      cursorChar: '|',
      autoInsertCss: true
    });
  }
}

// Initialize particles.js
function initParticles() {
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: window.innerWidth < 768 ? 40 : 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: "#4ff0f6"
        },
        shape: {
          type: ["circle", "triangle", "edge"],
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
          color: "#4ff0f6",
          opacity: 0.3,
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
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200
          }
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
          },
          remove: {
            particles_nb: 2
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
          top: target.offsetTop - 80, // Adjust for header height
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
  
  // Reveal elements on scroll with IntersectionObserver
  if ('IntersectionObserver' in window) {
    const fadeElements = document.querySelectorAll('.fade-in');
    const appearOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -100px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, appearOptions);
    
    fadeElements.forEach(element => {
      appearOnScroll.observe(element);
    });
    
    // Animate elements with reveal-on-scroll class
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const revealOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };
    
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      });
    }, revealOptions);
    
    revealElements.forEach(element => {
      revealOnScroll.observe(element);
    });
  }
}

// Set up navigation
function setupNavigation() {
  // Mobile menu toggle
  const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuIcon && navLinks) {
    mobileMenuIcon.addEventListener('click', function() {
      this.classList.toggle('change');
      navLinks.classList.toggle('active');
      
      // Add animation to each link with delay
      if (navLinks.classList.contains('active')) {
        navLinks.querySelectorAll('a').forEach((link, index) => {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        });
      } else {
        navLinks.querySelectorAll('a').forEach(link => {
          link.style.animation = '';
        });
      }
    });
  }
  
  // Header scroll effect
  const header = document.querySelector('header');
  let scrollPosition = 0;
  let lastScrollTop = 0;
  const scrollThreshold = 50;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add scrolled class for styling
    if (currentScroll > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Hide/show header on scroll direction
    if (currentScroll > lastScrollTop && currentScroll > 100) {
      // Scrolling down
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });
  
  // Update active nav link on scroll
  const sections = document.querySelectorAll('.section');
  const navItems = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', function() {
    let current = '';
    const scrollY = window.pageYOffset;
    
    // Find the current section
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100; // Adjust for header
      const sectionHeight = section.offsetHeight;
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    // Update active class
    navItems.forEach(item => {
      item.classList.remove('active');
      if (current && item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (navLinks && navLinks.classList.contains('active')) {
      if (!navLinks.contains(e.target) && !mobileMenuIcon.contains(e.target)) {
        navLinks.classList.remove('active');
        if (mobileMenuIcon) mobileMenuIcon.classList.remove('change');
      }
    }
  });
}

// Custom cursor
function setupCustomCursor() {
  const cursor = document.getElementById('cursor');
  const cursorBlur = document.getElementById('cursor-blur');
  
  // Only enable custom cursor on desktop devices
  if (window.innerWidth > 991 && cursor && cursorBlur && !isReducedMotionPreferred()) {
    document.body.style.cursor = 'none';
    
    document.addEventListener('mousemove', function(e) {
      // Use requestAnimationFrame for smoother cursor movement
      requestAnimationFrame(() => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Delayed blur effect for smoother trailing
        setTimeout(() => {
          cursorBlur.style.left = e.clientX + 'px';
          cursorBlur.style.top = e.clientY + 'px';
        }, 50);
      });
    });
    
    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .certificate-card, input, textarea, .social-link, .filter-btn');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.backgroundColor = 'transparent';
        cursor.style.border = '2px solid var(--neon-blue)';
        cursor.style.mixBlendMode = 'normal';
        
        // Customize cursor blur based on element type
        if (el.classList.contains('project-card') || el.classList.contains('certificate-card')) {
          cursorBlur.style.width = '450px';
          cursorBlur.style.height = '450px';
          cursorBlur.style.backgroundColor = 'rgba(79, 240, 246, 0.07)';
        } else if (el.classList.contains('social-link')) {
          cursorBlur.style.width = '300px';
          cursorBlur.style.height = '300px';
          cursorBlur.style.backgroundColor = 'rgba(79, 240, 246, 0.1)';
        } else if (el.classList.contains('btn') || el.tagName === 'BUTTON') {
          cursorBlur.style.width = '300px';
          cursorBlur.style.height = '300px';
          cursorBlur.style.backgroundColor = 'rgba(79, 240, 246, 0.1)';
        }
      });
      
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '12px';
        cursor.style.height = '12px';
        cursor.style.backgroundColor = 'var(--neon-blue)';
        cursor.style.border = 'none';
        cursor.style.mixBlendMode = 'screen';
        
        cursorBlur.style.width = '400px';
        cursorBlur.style.height = '400px';
        cursorBlur.style.backgroundColor = 'rgba(79, 240, 246, 0.03)';
      });
    });
    
    // Hide cursor when leaving the window
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      cursorBlur.style.opacity = '0';
    });
    
    // Show cursor when entering the window
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      cursorBlur.style.opacity = '1';
    });
    
    // Scale cursor on click
    document.addEventListener('mousedown', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  } else if (cursor && cursorBlur) {
    // Hide custom cursor on mobile or when reduced motion is preferred
    cursor.style.display = 'none';
    cursorBlur.style.display = 'none';
  }
}

// Project filtering
function setupProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterBtns.length && projectCards.length) {
    // Default state - all visible
    document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
    
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get filter value
        const filterValue = this.getAttribute('data-filter');
        
        // Filter projects with animation
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
}

// Back to top button
function setupBackToTop() {
  const backToTop = document.querySelector('.back-to-top');
  
  if (backToTop) {
    // Hide/show button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.scrollY > 700) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    
    // Smooth scroll to top
    backToTop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Setup lazy loading for images
function setupLazyLoading() {
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '100px',
      threshold: 0.1
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers without IntersectionObserver support
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

// Initialize mobile optimizations
function initMobileOptimizations() {
  if (window.innerWidth < 768) {
    // Reduce particles on mobile
    if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
      pJSDom[0].pJS.particles.number.value = 30;
      pJSDom[0].pJS.particles.line_linked.distance = 100;
      pJSDom[0].pJS.fn.particlesRefresh();
    }
    
    // Add touch capability for project cards and other interactive elements
    document.querySelectorAll('.project-card, .certificate-card, .btn, .social-link').forEach(el => {
      el.addEventListener('touchstart', function() {
        this.classList.add('touch-focus');
      }, { passive: true });
      
      el.addEventListener('touchend', function() {
        setTimeout(() => {
          this.classList.remove('touch-focus');
        }, 300);
      }, { passive: true });
    });
  }
}

// Setup contact form interactions
function setupContactForm() {
  // This is a placeholder for contact form functionality
  // Add actual form handling logic here if needed
  const contactLinks = document.querySelectorAll('.contact-link');
  
  contactLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.classList.add('wave-effect');
    });
    
    link.addEventListener('mouseleave', function() {
      this.classList.remove('wave-effect');
    });
  });
}

// Setup performance optimizations
function setupPerformanceOptimizations() {
  // Debounce scroll events
  function debounce(func, wait = 15, immediate = true) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
  
  // Optimize scroll handlers
  const optimizedScroll = debounce(() => {
    // Any heavy scroll operations should go here
  }, 15);
  
  window.addEventListener('scroll', optimizedScroll);
  
  // Optimize resize handlers
  const optimizedResize = debounce(() => {
    if (window.innerWidth < 768) {
      initMobileOptimizations();
    }
  }, 100);
  
  window.addEventListener('resize', optimizedResize);
  
  // Use passive event listeners where possible for better scrolling performance
  const passiveSupported = checkPassiveSupport();
  const wheelOpt = passiveSupported ? { passive: true } : false;
  
  window.addEventListener('wheel', () => {}, wheelOpt);
  window.addEventListener('touchstart', () => {}, wheelOpt);
  window.addEventListener('touchmove', () => {}, wheelOpt);
}

// Check if passive event listeners are supported
function checkPassiveSupport() {
  let passiveSupported = false;
  
  try {
    const options = {
      get passive() {
        passiveSupported = true;
        return false;
      }
    };
    
    window.addEventListener("test", null, options);
    window.removeEventListener("test", null, options);
  } catch(err) {
    passiveSupported = false;
  }
  
  return passiveSupported;
}

// Check if user prefers reduced motion
function isReducedMotionPreferred() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Add easter egg
document.addEventListener('keydown', function(e) {
  // Konami code: up, up, down, down, left, right, left, right, b, a
  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  const keyCode = e.keyCode || e.which;
  
  if (!window.konamiIndex) window.konamiIndex = 0;
  
  if (keyCode === konamiCode[window.konamiIndex++]) {
    if (window.konamiIndex === konamiCode.length) {
      // Easter egg activated
      activateEasterEgg();
      window.konamiIndex = 0;
    }
  } else {
    window.konamiIndex = 0;
  }
});

// Easter egg function
function activateEasterEgg() {
  const glitchElements = document.querySelectorAll('.glitch, .brand');
  
  glitchElements.forEach(el => {
    el.style.animation = 'none';
    el.offsetHeight; // Trigger reflow
    
    // Apply intense glitch effect
    el.style.animation = 'flicker 0.5s infinite alternate';
    el.style.color = 'var(--neon-red)';
    
    setTimeout(() => {
      el.style.animation = '';
      el.style.color = '';
    }, 3000);
  });
  
  // Create matrix-like raining code effect
  createMatrixEffect();
}

// Matrix effect for easter egg
function createMatrixEffect() {
  if (document.getElementById('matrix-canvas')) return;
  
  const canvas = document.createElement('canvas');
  canvas.id = 'matrix-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '1000';
  canvas.style.opacity = '0.8';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const ctx = canvas.getContext('2d');
  const characters = '01'.split('');
  const fontSize = 10;
  const columns = canvas.width / fontSize;
  const drops = [];
  
  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }
  
  function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0f0';
    ctx.font = `${fontSize}px monospace`;
    
    for (let i = 0; i < drops.length; i++) {
      const text = characters[Math.floor(Math.random() * characters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      
      drops[i]++;
    }
  }
  
  const matrixInterval = setInterval(drawMatrix, 33);
  
  setTimeout(() => {
    clearInterval(matrixInterval);
    canvas.remove();
  }, 5000);
}

// Document ready - additional initializations
window.addEventListener('load', function() {
  // Remove preloader if exists
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }
  
  // Initialize any animations that depend on page being fully loaded
  document.querySelectorAll('.section-line').forEach(line => {
    line.classList.add('animate');
  });
  
  // Check if URL has hash and scroll to that section
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }, 500);
    }
  }
  
  // Initialize any third-party libraries that need page to be fully loaded
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
});