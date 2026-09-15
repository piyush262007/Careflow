/* ==========================================================================
   CAREFLOW SAAS INTERACTION PLATFORM
   Real-Time ECG Telemetry, AI Triage chatbot, and Design system controllers
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. SCROLL REVEAL & HEADER SCROLL CONTROLLER
     -------------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const revealElements = document.querySelectorAll('.scroll-reveal');

  // Add scroll-triggered class to header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateTimelineProgress();
  });

  // Intersection Observer for scroll reveal
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    el.classList.add('reveal-hidden');
    revealObserver.observe(el);
  });

  // Inject reveal keyframes in CSS on load
  const style = document.createElement('style');
  style.textContent = `
    .reveal-hidden {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .reveal-hidden.revealed {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  /* --------------------------------------------------------------------------
     2. THEME CONTROLLER (LIGHT / DARK SYSTEM)
     -------------------------------------------------------------------------- */
  const themeToggle = document.getElementById('theme-toggle');
  const sunIcon = themeToggle.querySelector('.sun-icon');
  const moonIcon = themeToggle.querySelector('.moon-icon');
  const htmlNode = document.documentElement;

  // Retrieve existing selection or fall back to system preference
  const savedTheme = localStorage.getItem('careflow-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const setTheme = (theme) => {
    htmlNode.setAttribute('data-theme', theme);
    localStorage.setItem('careflow-theme', theme);
    if (theme === 'dark') {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    } else {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    }
  };

  if (savedTheme) {
    setTheme(savedTheme);
  } else if (prefersDark) {
    setTheme('dark');
  } else {
    setTheme('light');
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlNode.getAttribute('data-theme');
    const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(targetTheme);
  });

  /* --------------------------------------------------------------------------
     3. REAL-TIME PREDICTIVE AI SPLINE SCANNER & VITALS STATS
     -------------------------------------------------------------------------- */
  const splinePath = document.querySelector('.spline-line-aqua');
  const trackerLine = document.getElementById('tracker-line');
  const trackerNode = document.getElementById('tracker-node');
  const liveWellnessNum = document.getElementById('live-wellness');
  
  if (splinePath && trackerLine && trackerNode) {
    const pathLength = splinePath.getTotalLength();
    let distance = 0;
    const speed = 1.5; // Speed of scanning along the spline line
    let stepCount = 0;

    const renderSplineScan = () => {
      // Fluctuate Wellness Index slightly (97.9% - 98.9%)
      if (stepCount % 45 === 0 && liveWellnessNum) {
        const delta = (Math.random() * 0.4 - 0.2);
        let currentWellness = (parseFloat(liveWellnessNum.innerText) + delta).toFixed(1);
        if (currentWellness < 97.5) currentWellness = 98.4;
        if (currentWellness > 99.2) currentWellness = 98.4;
        liveWellnessNum.innerText = currentWellness;
      }

      // Update distance along the path
      distance += speed;
      if (distance > pathLength) {
        distance = 0; // Wrap around loop
      }

      // Get exact coordinates along the curve using native SVG geometry
      const point = splinePath.getPointAtLength(distance);

      // Position tracker nodes
      trackerNode.setAttribute('cx', point.x.toFixed(1));
      trackerNode.setAttribute('cy', point.y.toFixed(1));
      
      trackerLine.setAttribute('x1', point.x.toFixed(1));
      trackerLine.setAttribute('x2', point.x.toFixed(1));

      stepCount++;
      requestAnimationFrame(renderSplineScan);
    };

    // Run custom SVG scan loop
    setTimeout(() => {
      requestAnimationFrame(renderSplineScan);
    }, 500);
  }

  /* --------------------------------------------------------------------------
     4. TIMELINE CONNECTING PULSE INDICATOR FILL
     -------------------------------------------------------------------------- */
  const timelineSection = document.getElementById('how-it-works');
  const scrollFillBar = document.getElementById('timeline-scroll-fill');

  function updateTimelineProgress() {
    if (!timelineSection || !scrollFillBar) return;
    
    const rect = timelineSection.getBoundingClientRect();
    const sectionHeight = rect.height;
    const viewHeight = window.innerHeight;

    // Calculate how much of the section is visible
    const scrolledIntoSection = viewHeight - rect.top;
    
    if (scrolledIntoSection < 0) {
      scrollFillBar.style.width = '0%';
    } else if (rect.bottom < viewHeight / 2) {
      scrollFillBar.style.width = '100%';
    } else {
      let percent = (scrolledIntoSection / (sectionHeight + viewHeight * 0.2)) * 100;
      percent = Math.min(100, Math.max(0, percent));
      scrollFillBar.style.width = `${percent.toFixed(1)}%`;
    }
  }

  /* --------------------------------------------------------------------------
     5. 3D PERSPECTIVE GLASS TILT EFFECT
     -------------------------------------------------------------------------- */
  const tiltCards = document.querySelectorAll('[data-tilt]');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const cardRect = card.getBoundingClientRect();
      const cardWidth = cardRect.width;
      const cardHeight = cardRect.height;
      
      // Calculate mouse coordinates relative to card center
      const mouseX = e.clientX - cardRect.left - cardWidth / 2;
      const mouseY = e.clientY - cardRect.top - cardHeight / 2;

      // Restrict rotation angle to a maximum of 8 degrees
      const rotateX = (-mouseY / (cardHeight / 2)) * 8;
      const rotateY = (mouseX / (cardWidth / 2)) * 8;

      // Dynamic Skew translation
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px)`;
      card.style.transition = 'none';
      card.style.boxShadow = '0 30px 60px -10px var(--accent-glow)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      card.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      card.style.boxShadow = 'var(--glass-shadow)';
    });
  });

  /* --------------------------------------------------------------------------
     6. MOBILE HAMBURGER DRAWER TIGHTENER
     -------------------------------------------------------------------------- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      
      // Morph Hamburger lines to X shape
      const spans = mobileToggle.querySelectorAll('span');
      if (mobileToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close drawer when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
        mobileToggle.querySelectorAll('span').forEach(s => s.style.transform = 'none');
        mobileToggle.querySelectorAll('span')[1].style.opacity = '1';
      });
    });
  }

  /* --------------------------------------------------------------------------
     7. TESTIMONIAL CAROUSEL SLIDER
     -------------------------------------------------------------------------- */
  const dots = document.querySelectorAll('.nav-dot');
  const track = document.getElementById('testimonial-track');

  if (dots && track) {
    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-index'));
        
        // Remove active class from all dots and apply to current
        dots.forEach(d => d.classList.remove('active'));
        e.target.classList.add('active');

        // Translate the track horizontally
        track.style.transform = `translateX(-${index * 33.333}%)`;
      });
    });
  }

  /* --------------------------------------------------------------------------
     8. AI NEURAL TRIAGE CHATBOT WIDGET
     -------------------------------------------------------------------------- */
  const chatTrigger = document.getElementById('ai-chat-trigger');
  const chatClose = document.getElementById('ai-chat-close');
  const chatWindow = document.getElementById('ai-chat-window');
  const unreadDot = document.getElementById('unread-dot');
  
  const chatInput = document.getElementById('ai-message-input');
  const chatSendBtn = document.getElementById('ai-send-btn');
  const messagesContainer = document.getElementById('ai-messages');
  const quickPromptBtns = document.querySelectorAll('.quick-prompt-btn');

  // Open Chat
  if (chatTrigger) {
    chatTrigger.addEventListener('click', () => {
      chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
      if (unreadDot) {
        unreadDot.style.display = 'none'; // Clear notifications count
      }
      chatWindow.classList.add('scale-reveal-animation');
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });
  }

  // Close Chat
  if (chatClose) {
    chatClose.addEventListener('click', () => {
      chatWindow.style.display = 'none';
    });
  }

  // Auto response logic
  const handleUserMessage = (text) => {
    if (!text.trim()) return;

    // Append user message bubble
    const userBubble = document.createElement('div');
    userBubble.className = 'message user-msg';
    userBubble.innerText = text;
    messagesContainer.appendChild(userBubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Empty input
    chatInput.value = '';

    // Simulate AI typing delay
    const typingBubble = document.createElement('div');
    typingBubble.className = 'message bot-msg typing-loader';
    typingBubble.innerHTML = '⚡ Processing clinical logs...';
    messagesContainer.appendChild(typingBubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    setTimeout(() => {
      // Remove typing bubble
      typingBubble.remove();

      const botBubble = document.createElement('div');
      botBubble.className = 'message bot-msg';
      
      const query = text.toLowerCase();
      let response = "🤖 CareFlow AI: Telemetry analyzed. I suggest scheduling a clinical scan or connecting with Dr. Evelyn Sterling (Cardiology) to review vitals logs.";

      if (query.includes('bp') || query.includes('blood pressure') || query.includes('warning')) {
        response = "💓 CareFlow AI: Normal adult blood pressure is below 120/80 mmHg. High blood pressure (hypertension) warnings include chest discomfort, short breath, or headaches. I suggest booking an immediate video consult.";
      } else if (query.includes('cardo') || query.includes('slot') || query.includes('doctor') || query.includes('appointment')) {
        response = "📅 CareFlow AI: Understood. I will trigger the scheduling interface now. Please select your clinical frame inside the modal dashboard.";
        // Automatically open the booking modal!
        setTimeout(() => {
          openBookingModal('Dr. Evelyn Sterling');
        }, 1200);
      } else if (query.includes('hipaa') || query.includes('secure') || query.includes('biometric')) {
        response = "🔐 CareFlow AI: Absolute confidentiality is guaranteed under strict HIPAA protocols. CareFlow implements end-to-end ZK cryptography keys (AES-256) on all medical telemetry and doctor channels.";
      }

      botBubble.innerText = response;
      messagesContainer.appendChild(botBubble);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1200);
  };

  if (chatSendBtn && chatInput) {
    chatSendBtn.addEventListener('click', () => handleUserMessage(chatInput.value));
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleUserMessage(chatInput.value);
    });
  }

  // Quick Prompts click triggers
  quickPromptBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const promptText = e.target.getAttribute('data-text');
      handleUserMessage(promptText);
    });
  });

  // Inject Scale animation class
  const animStyle = document.createElement('style');
  animStyle.textContent = `
    .scale-reveal-animation {
      animation: scaleRev 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes scaleRev {
      0% { transform: scale(0.7) translateY(50px); opacity: 0; }
      100% { transform: scale(1) translateY(0); opacity: 1; }
    }
  `;
  document.head.appendChild(animStyle);

  /* --------------------------------------------------------------------------
     9. CLINICAL APPOINTMENT BOOKING MODAL SYSTEM
     -------------------------------------------------------------------------- */
  const bookingModal = document.getElementById('booking-modal');
  const modalClose = document.getElementById('modal-close');
  const bookingForm = document.getElementById('appointment-booking-form');
  const successArea = document.getElementById('booking-success-area');
  const closeSuccessBtn = document.getElementById('close-success-btn');

  const selectDoctorDropdown = document.getElementById('select-doctor');
  const receiptDoc = document.getElementById('receipt-doc');
  const receiptTime = document.getElementById('receipt-time');

  // Open modal triggers (CTAs and doctors cards)
  const openBookingModal = (defaultDoctor = '') => {
    if (bookingModal) {
      bookingModal.style.display = 'flex';
      bookingModal.classList.add('scale-reveal-animation');
      
      // Auto select doctor if passed
      if (defaultDoctor && selectDoctorDropdown) {
        for (let option of selectDoctorDropdown.options) {
          if (option.value.includes(defaultDoctor)) {
            selectDoctorDropdown.value = option.value;
            break;
          }
        }
      }
      
      // Set minimum date to today
      const dateInput = document.getElementById('booking-date');
      if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
      }
    }
  };

  // Attach triggers to CTA buttons
  const heroBookBtn = document.getElementById('hero-book-appointment');
  if (heroBookBtn) {
    heroBookBtn.addEventListener('click', () => openBookingModal());
  }

  const getStartedBtn = document.getElementById('hero-get-started');
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', () => openBookingModal());
  }

  // Attach triggers to Doctor Showcase cards
  const docBookBtns = document.querySelectorAll('.book-doc-btn');
  docBookBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const docName = e.target.getAttribute('data-doc');
      openBookingModal(docName);
    });
  });

  // Close modal
  const closeModalFunc = () => {
    if (bookingModal) {
      bookingModal.style.display = 'none';
      bookingForm.style.display = 'block';
      successArea.style.display = 'none';
      bookingForm.reset();
    }
  };

  if (modalClose) modalClose.addEventListener('click', closeModalFunc);
  if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', closeModalFunc);

  // Close when clicking overlay backdrop
  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        closeModalFunc();
      }
    });
  }

  // Form submission handler
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const doctor = selectDoctorDropdown.value;
      const dateVal = document.getElementById('booking-date').value;
      const timeVal = document.getElementById('booking-time').value;

      // Update success receipt values
      if (receiptDoc) receiptDoc.innerText = doctor;
      if (receiptTime) receiptTime.innerText = `${dateVal} at ${timeVal}`;

      // Transition to success screen
      bookingForm.style.display = 'none';
      successArea.style.display = 'flex';
      successArea.classList.add('scale-reveal-animation');
    });
  }

  /* --------------------------------------------------------------------------
     10. NEWSLETTER REGISTRATION
     -------------------------------------------------------------------------- */
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterSuccess = document.getElementById('newsletter-success');

  if (newsletterForm && newsletterSuccess) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      newsletterForm.style.display = 'none';
      newsletterSuccess.style.display = 'block';
    });
  }

  /* --------------------------------------------------------------------------
     11. ACTIVE NAVIGATION HIGHLIGHTS
     -------------------------------------------------------------------------- */
  const navLinksList = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 120) {
        current = section.getAttribute('id');
      }
    });

    navLinksList.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

});
