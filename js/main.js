/* ============================================================
   SHYAM WEAVETECH — Main JavaScript
   Features: Loading, Navbar, Dark Mode, Language, Scroll,
             Counter Animation, Intersection Observer, WhatsApp
   ============================================================ */

(function () {
  'use strict';

  /* ── Constants ── */
  const WA_NUMBER = '919054141504';
  const WA_BASE = `https://wa.me/${WA_NUMBER}`;

  const WA_MSG_GENERAL = encodeURIComponent(
    'Hello Shyam Weavetech,\n\nI would like to know more about your products.\n\nPlease contact me.\n\nThank you.'
  );

  function waProductMsg(productName) {
    return encodeURIComponent(
      `Hello Shyam Weavetech,\n\nI am interested in:\n\nProduct: ${productName}\n\nRequired Quantity:\n\nApplication:\n\nDelivery Location:\n\nAdditional Requirements:\n\nPlease send quotation.\n\nThank you.`
    );
  }

  /* ══════════════════════════════════════════════
     TOAST NOTIFICATION
  ══════════════════════════════════════════════ */
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.right = '24px';
    toast.style.background = type === 'success' ? '#25D366' : '#e74c3c';
    toast.style.color = '#fff';
    toast.style.padding = '16px 24px';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    toast.style.zIndex = '9999';
    toast.style.fontFamily = "'Poppins', sans-serif";
    toast.style.fontSize = '0.95rem';
    toast.style.fontWeight = '500';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s ease';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    }, 10);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
      setTimeout(() => document.body.contains(toast) && document.body.removeChild(toast), 300);
    }, 4500);
  }

  /* ══════════════════════════════════════════════
     THEME (Dark / Light)
  ══════════════════════════════════════════════ */
  function initTheme() {
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('sw-theme') || 'light';
    html.setAttribute('data-theme', savedTheme);

    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('sw-theme', next);
    });
  }



  /* ══════════════════════════════════════════════
     NAVBAR
  ══════════════════════════════════════════════ */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    // Scroll effects
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // Active link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });

    // Mobile menu
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('open');
      });

      // Close on link click
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('open');
          mobileMenu.classList.remove('open');
        });
      });
    }
  }

  /* ══════════════════════════════════════════════
     SCROLL PROGRESS
  ══════════════════════════════════════════════ */
  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = pct + '%';
    }, { passive: true });
  }

  /* ══════════════════════════════════════════════
     SCROLL TO TOP
  ══════════════════════════════════════════════ */
  function initScrollTop() {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ══════════════════════════════════════════════
     INTERSECTION OBSERVER (Fade Animations)
  ══════════════════════════════════════════════ */
  function initAnimations() {
    const targets = document.querySelectorAll('.fade-up, .fade-in, .slide-left, .slide-right');
    if (!targets.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

    targets.forEach(el => observer.observe(el));
  }

  /* ══════════════════════════════════════════════
     COUNTER ANIMATION
  ══════════════════════════════════════════════ */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  }

  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1800;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      const current = Math.round(eased * target);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  /* ══════════════════════════════════════════════
     WHATSAPP INTEGRATION
  ══════════════════════════════════════════════ */
  function initWhatsApp() {
    // Float button
    const waFloat = document.getElementById('whatsapp-float');
    if (waFloat) {
      waFloat.href = `${WA_BASE}?text=${WA_MSG_GENERAL}`;
      waFloat.target = '_blank';
      waFloat.rel = 'noopener noreferrer';
    }

    // General WA buttons
    document.querySelectorAll('[data-wa="general"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(`${WA_BASE}?text=${WA_MSG_GENERAL}`, '_blank', 'noopener,noreferrer');
      });
    });

    // Product enquiry buttons
    document.querySelectorAll('[data-wa-product]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const product = btn.dataset.waProduct;
        window.open(`${WA_BASE}?text=${waProductMsg(product)}`, '_blank', 'noopener,noreferrer');
      });
    });
  }

  /* ══════════════════════════════════════════════
     CONTACT FORM
  ══════════════════════════════════════════════ */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      let originalText = "Send Email";
      let span;
      if (submitBtn) {
        span = submitBtn.querySelector('span');
        if (span) {
          originalText = span.textContent;
          span.textContent = 'Sending...';
        } else {
          originalText = submitBtn.textContent;
          submitBtn.textContent = 'Sending...';
        }
        submitBtn.disabled = true;
      }

      const name = form.querySelector('[name="name"]')?.value || '';
      const company = form.querySelector('[name="company"]')?.value || '';
      const email = form.querySelector('[name="email"]')?.value || '';
      const phone = form.querySelector('[name="phone"]')?.value || '';
      const subject = form.querySelector('[name="subject"]')?.value || 'Contact Enquiry';
      const message = form.querySelector('[name="message"]')?.value || '';

      const fullMessage = `Company: ${company}\nPhone: ${phone}\n\nMessage:\n${message}`;

      try {
        const scriptURL = 'https://script.google.com/macros/s/AKfycbzOjoHV173DUcOdUrHWP01Zj3ylSFX4Xi88klkut-oKDLU1nJblagkc53nghPOVlEzm/exec';
        
        await fetch(scriptURL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            purpose: subject,
            message: fullMessage
          })
        });
        
        showToast("Thank you! Shyam Weavetech got your request via email.");
        form.reset();
      } catch (error) {
        showToast("Error sending email. Please try again.", "error");
      } finally {
        if (submitBtn) {
          if (span) {
            span.textContent = originalText;
          } else {
            submitBtn.textContent = originalText;
          }
          submitBtn.disabled = false;
        }
      }
    });
  }

  /* ══════════════════════════════════════════════
     APPLY FORM
  ══════════════════════════════════════════════ */
  function initApplyForm() {
    const form = document.getElementById('apply-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('[name="name"]')?.value || '';
      const email = form.querySelector('[name="email"]')?.value || '';
      const position = form.querySelector('[name="position"]')?.value || '';
      const phone = form.querySelector('[name="phone"]')?.value || '';
      const experience = form.querySelector('[name="experience"]')?.value || '';
      const message = form.querySelector('[name="message"]')?.value || '';

      const lines = [
        '*New Job Application*',
        '',
        `*Name:* ${name}`,
        `*Email:* ${email}`,
        `*Position:* ${position}`,
        `*Phone:* ${phone}`,
        `*Experience:* ${experience} years`,
        '',
        '*About Me:*',
        message
      ];

      const text = encodeURIComponent(lines.join('\n'));
      window.open(`https://wa.me/919054141504?text=${text}`, '_blank', 'noopener,noreferrer');
    });
  }

  /* ══════════════════════════════════════════════
     ACCORDION (Product FAQ / Quality)
  ══════════════════════════════════════════════ */
  function initAccordion() {
    document.querySelectorAll('.accordion-trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.accordion-item');
        const panel = item.querySelector('.accordion-panel');
        const isOpen = item.classList.contains('open');

        // Close all
        document.querySelectorAll('.accordion-item').forEach(i => {
          i.classList.remove('open');
          i.querySelector('.accordion-panel').style.maxHeight = null;
        });

        if (!isOpen) {
          item.classList.add('open');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    });
  }

  /* ══════════════════════════════════════════════
     IMAGE LAZY LOAD
  ══════════════════════════════════════════════ */
  function initLazyImages() {
    const images = document.querySelectorAll('img[data-src]');
    if (!images.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => observer.observe(img));
  }

  /* ══════════════════════════════════════════════
     PAGE TRANSITIONS
  ══════════════════════════════════════════════ */
  function initPageTransitions() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && link.target !== '_blank') {
        const isInternal = href.startsWith('/') || href.startsWith('./') || !href.startsWith('http');
        if (isInternal) {
          e.preventDefault();
          document.body.classList.add('page-exit');
          setTimeout(() => {
            window.location.href = link.href;
          }, 350);
        }
      }
    });

    window.addEventListener('pageshow', (event) => {
      if (event.persisted) {
        document.body.classList.remove('page-exit');
      }
    });
  }

  /* ══════════════════════════════════════════════
     INIT ALL
  ══════════════════════════════════════════════ */
  document.addEventListener('DOMContentLoaded', () => {
    initPageTransitions();
    initTheme();

    initNavbar();
    initScrollProgress();
    initScrollTop();
    initAnimations();
    initCounters();
    initWhatsApp();
    initContactForm();
    initApplyForm();
    initAccordion();
    initLazyImages();
    initEmailModal();
  });

  /* ══════════════════════════════════════════════
     EMAIL MODAL
  ══════════════════════════════════════════════ */
  function initEmailModal() {
    const modal = document.getElementById('email-modal-overlay');
    const closeBtn = document.getElementById('email-modal-close');
    const form = document.getElementById('email-modal-form');
    if (!modal || !closeBtn || !form) return;

    // Open Modal on trigger click
    document.querySelectorAll('.email-modal-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
      });
    });

    // Close Modal
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    // Close on overlay click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });

    // Handle Form Submit
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent || "Send Email";
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      const purpose = document.getElementById('email-modal-purpose').value;
      const name = document.getElementById('email-modal-name').value;
      const email = document.getElementById('email-modal-email').value;
      const phone = document.getElementById('email-modal-phone').value;
      const message = document.getElementById('email-modal-message').value;
      
      const fullMessage = `Phone: ${phone}\n\nMessage:\n${message}`;

      try {
        const scriptURL = 'https://script.google.com/macros/s/AKfycbzOjoHV173DUcOdUrHWP01Zj3ylSFX4Xi88klkut-oKDLU1nJblagkc53nghPOVlEzm/exec';
        
        // Google Apps Script requires no-cors to prevent redirect CORS errors
        await fetch(scriptURL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            purpose: purpose,
            message: fullMessage
          })
        });
        
        // With no-cors we can't read the response, so we assume success if no network error occurred
        showToast("Thank you! Shyam Weavetech got your request via email.");
        modal.classList.remove('active');
        form.reset();
      } catch (error) {
        showToast("Error sending email. Please try again.", "error");
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

})();

// WhatsApp Modal Logic
(function() {
  const modal = document.getElementById('wa-modal-overlay');
  const closeBtn = document.getElementById('wa-modal-close');
  const triggers = document.querySelectorAll('.wa-modal-trigger');
  const form = document.getElementById('wa-modal-form');

  if(modal && closeBtn && form) {
    triggers.forEach(t => {
      t.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
      });
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
      if(e.target === modal) modal.classList.remove('active');
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('wa-modal-name').value;
      const topic = document.getElementById('wa-modal-topic').value;
      const details = document.getElementById('wa-modal-details').value;

      const lines = [
        '*WhatsApp Enquiry*',
        `*Name:* ${name}`,
        `*Topic:* ${topic}`,
        '',
        '*Details:*',
        details
      ];

      const text = encodeURIComponent(lines.join('\n'));
      window.open(`https://wa.me/919054141504?text=${text}`, '_blank', 'noopener,noreferrer');

      modal.classList.remove('active');
      form.reset();
    });
  }
})();
