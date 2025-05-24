// Animations JavaScript file

document.addEventListener("DOMContentLoaded", function() {
  // Preloader
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 1000);
  
  // Add animation classes on load
  document.querySelectorAll('.section').forEach(section => {
    section.classList.add('fade-in');
  });
  
  // Initialize text animations
  initTextAnimations();
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize hover animations
  initHoverAnimations();
});

// Initialize text animations
function initTextAnimations() {
  // Reveal text animation for section headings
  document.querySelectorAll('.section-header h2').forEach(heading => {
    const text = heading.textContent;
    const mainText = text.split(' ')[0];
    const highlightText = text.split(' ').slice(1).join(' ');
    
    heading.innerHTML = `${mainText} <span>${highlightText}</span>`;
  });
}

// Initialize scroll animations
function initScrollAnimations() {
  // Animate elements when scrolled into view
  const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  };
  
  const scrollObserver = new IntersectionObserver(animateOnScroll, {
    root: null,
    threshold: 0.1,
    rootMargin: "-100px"
  });
  
  document.querySelectorAll('.fade-in').forEach(element => {
    scrollObserver.observe(element);
  });
  
  // Staggered animations for project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });
  
  // Staggered animations for skill bars
  const skillBars = document.querySelectorAll('.skill-item');
  skillBars.forEach((bar, index) => {
    bar.style.transitionDelay = `${index * 0.1}s`;
  });
}

// Initialize hover animations
function initHoverAnimations() {
  // Navigation hover animations
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', (e) => {
      if (window.innerWidth > 991) {
        link.style.transform = 'translateY(-3px)';
        setTimeout(() => {
          link.style.transform = 'translateY(0)';
        }, 300);
      }
    });
  });
  
  // Project card hover animations
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.querySelectorAll('.project-content h3, .project-content p').forEach(element => {
        element.style.transform = 'translateY(-5px)';
        element.style.transition = 'transform 0.3s ease';
      });
    });
    
    card.addEventListener('mouseleave', () => {
      card.querySelectorAll('.project-content h3, .project-content p').forEach(element => {
        element.style.transform = 'translateY(0)';
      });
    });
  });

  // Animate certificate cards on load
function animateCertificateCards() {
  const certificateCards = document.querySelectorAll('.certificate-card');
  
  certificateCards.forEach((card, index) => {
    // Add delay based on index for staggered animation
    card.style.transitionDelay = `${index * 0.1}s`;
    
    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(card);
  });
}

// Hover effects for certificate cards
function setupCertificateHoverEffects() {
  const certificateCards = document.querySelectorAll('.certificate-card');
  
  certificateCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Tilt effect
      card.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(5deg) translateY(-10px)';
      
      // Glow effect
      card.style.boxShadow = '0 15px 30px rgba(0, 247, 255, 0.3)';
      
      // Scale image container
      const img = card.querySelector('.certificate-img');
      if (img) {
        img.style.transform = 'scale(1.05)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      // Reset tilt effect
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      
      // Reset glow effect
      card.style.boxShadow = '0 5px 15px rgba(0, 247, 255, 0.1)';
      
      // Reset image container
      const img = card.querySelector('.certificate-img');
      if (img) {
        img.style.transform = 'scale(1)';
      }
    });
  });
}

// Click handler for certificate cards (optional)
function setupCertificateClickHandlers() {
  const certificateCards = document.querySelectorAll('.certificate-card');
  
  certificateCards.forEach(card => {
    card.addEventListener('click', function(e) {
      // Don't trigger if clicking on a link
      if (e.target.tagName === 'A' || e.target.parentElement.tagName === 'A') {
        return;
      }
      
      // Toggle expanded view or open modal
      this.classList.toggle('expanded');
      
      // Alternatively, you could open a modal with larger certificate image
      // openCertificateModal(this.dataset.certificateId);
    });
  });
}

// Optional modal for certificate viewing
function openCertificateModal(certificateId) {
  // This would be similar to your project modal implementation
  const modal = document.createElement('div');
  modal.className = 'certificate-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <img src="path/to/certificate-${certificateId}-large.jpg" alt="Certificate">
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Close modal handler
  modal.querySelector('.close-modal').addEventListener('click', () => {
    document.body.removeChild(modal);
  });
  
  // Close when clicking outside content
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
}

// Add this to your main initialization
function initCertificatesSection() {
  setupCertificateFilters();
  animateCertificateCards();
  setupCertificateHoverEffects();
  setupCertificateClickHandlers(); // Optional
}

// Call this in your DOMContentLoaded event
// initCertificatesSection();

  // Button hover animations
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
    });
  });
}

// Glitch effect on scroll
window.addEventListener('scroll', () => {
  const glitchElement = document.querySelector('.glitch');
  if (glitchElement) {
    const scrollPosition = window.scrollY;
    const maxGlitch = 5;
    const glitchIntensity = Math.min(scrollPosition / 500, 1) * maxGlitch;
    
    glitchElement.style.setProperty('--glitch-offset', `${glitchIntensity}px`);
  }
});

// Parallax effect for background elements
window.addEventListener('mousemove', (e) => {
  if (window.innerWidth > 991) {
    const xPos = e.clientX / window.innerWidth - 0.5;
    const yPos = e.clientY / window.innerHeight - 0.5;
    
    // Apply parallax effect to elements with .parallax class
    document.querySelectorAll('.section-header').forEach(el => {
      el.style.transform = `translate(${xPos * 20}px, ${yPos * 20}px)`;
    });
  }
});

// Animate navbar on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.style.padding = '10px 0';
    header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
  } else {
    header.style.padding = '20px 0';
    header.style.boxShadow = 'none';
  }
});

// Page transition effect
function pageTransition() {
  const transition = document.createElement('div');
  transition.className = 'page-transition';
  document.body.appendChild(transition);
  
  setTimeout(() => {
    transition.classList.add('active');
  }, 100);
  
  setTimeout(() => {
    transition.classList.remove('active');
  }, 900);
  
  setTimeout(() => {
    document.body.removeChild(transition);
  }, 1700);
}

// Use page transition when navigating to sections
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    // Only add transition for desktop
    if (window.innerWidth > 991) {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      
      pageTransition();
      
      setTimeout(() => {
        window.scrollTo({
          top: target.offsetTop,
          behavior: 'instant'
        });
      }, 500);
    }
  });
});

// Random neon color shifter for accents
function randomNeonColor() {
  const neonColors = [
    'var(--neon-blue)',
    'var(--neon-red)',
    'var(--neon-yellow)'
  ];
  
  return neonColors[Math.floor(Math.random() * neonColors.length)];
}

// Create shooting stars in the background
function createShootingStar() {
  if (window.innerWidth < 768) return;
  
  const shootingStar = document.createElement('div');
  shootingStar.classList.add('shooting-star');
  
  // Random position and angle
  const startX = Math.random() * window.innerWidth;
  const startY = Math.random() * window.innerHeight / 3;
  const angle = Math.random() * 60 - 30; // -30 to 30 degrees
  
  shootingStar.style.left = `${startX}px`;
  shootingStar.style.top = `${startY}px`;
  shootingStar.style.transform = `rotate(${angle}deg)`;
  
  document.body.appendChild(shootingStar);
  
  // Remove after animation completes
  setTimeout(() => {
    document.body.removeChild(shootingStar);
  }, 1000);
}

// Create shooting stars periodically
setInterval(createShootingStar, 3000);

// Type writer effect for specific text elements
function typeWriter(element, text, speed) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Apply typing effect to specific elements (can be used for custom elements)
function applyTypewriterEffects() {
  const elements = document.querySelectorAll('.typewriter');
  elements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    typeWriter(element, text, 70);
  });
}

// Execute on page load
window.addEventListener('load', applyTypewriterEffects);