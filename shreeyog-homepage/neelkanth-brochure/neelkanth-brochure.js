'use strict';

/* ==========================================================
   SHREEYOG BUILDERS — SHRI NEELKANTH INTERACTIVE BROCHURE
   Left-Side Navigation & Interactive Presentation Controller
   ========================================================== */

(function () {
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  // ----------------------------------------------------------
  // MOBILE SIDEBAR DRAWER TOGGLE
  // ----------------------------------------------------------
  const sidebar = qs('#brochureSidebar');
  const sidebarToggle = qs('#sidebarToggle');
  const sidebarClose = qs('#sidebarClose');
  const sidebarBackdrop = qs('#sidebarBackdrop');

  function openSidebar() {
    if (!sidebar) return;
    sidebar.classList.add('open');
    if (sidebarBackdrop) sidebarBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    if (!sidebar) return;
    sidebar.classList.remove('open');
    if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (sidebarToggle) sidebarToggle.addEventListener('click', openSidebar);
  if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
  if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', closeSidebar);

  // ----------------------------------------------------------
  // SIDEBAR SCROLLSPY & SMOOTH SCROLLING
  // ----------------------------------------------------------
  const navLinks = qsa('.sidebar-nav__link');
  const observedSections = [];

  navLinks.forEach(link => {
    const targetId = link.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      const section = qs(targetId);
      if (section) {
        observedSections.push({ link, section });
      }
    }

    link.addEventListener('click', function () {
      // On mobile, close sidebar after clicking link
      if (window.innerWidth <= 1024) {
        closeSidebar();
      }
    });
  });

  function updateScrollSpy() {
    const scrollPos = window.scrollY + 160;
    let currentId = '';

    for (let i = observedSections.length - 1; i >= 0; i--) {
      const { section } = observedSections[i];
      if (section.offsetTop <= scrollPos) {
        currentId = '#' + section.id;
        break;
      }
    }

    navLinks.forEach(link => {
      const isMatch = link.getAttribute('href') === currentId;
      link.classList.toggle('active', isMatch);
    });
  }

  window.addEventListener('scroll', updateScrollSpy, { passive: true });
  updateScrollSpy();

  // ----------------------------------------------------------
  // FLOOR PLANS INTERACTIVE TAB SWITCHER
  // ----------------------------------------------------------
  const planTabBtns = qsa('.plan-tab-btn');
  const planPanels  = qsa('.plan-panel');

  planTabBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const targetPlan = this.getAttribute('data-plan');

      planTabBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      planPanels.forEach(panel => {
        panel.classList.toggle('active', panel.getAttribute('data-plan-panel') === targetPlan);
      });
    });
  });

  // ----------------------------------------------------------
  // UNIT PLANS (2 BHK vs 3 BHK) INTERACTIVE TAB SWITCHER
  // ----------------------------------------------------------
  const unitTabBtns = qsa('.unit-tab-btn');
  const unitPanels  = qsa('.unit-panel');

  unitTabBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const targetUnit = this.getAttribute('data-unit');

      unitTabBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      unitPanels.forEach(panel => {
        panel.classList.toggle('active', panel.getAttribute('data-unit-panel') === targetUnit);
      });
    });
  });

  // ----------------------------------------------------------
  // SPECIFICATIONS INTERACTIVE TAB FILTER
  // ----------------------------------------------------------
  const specsTabBtns = qsa('.specs-tab-btn');
  const specCards    = qsa('.spec-category-card');

  specsTabBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const category = this.getAttribute('data-category');

      specsTabBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      specCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ----------------------------------------------------------
  // FULLSCREEN LIGHTBOX FOR BLUEPRINTS & PLANS
  // ----------------------------------------------------------
  const lightbox         = qs('#brochureLightbox');
  const lightboxImg      = qs('#lightboxImg');
  const lightboxCaption  = qs('#lightboxCaption');
  const lightboxCloseBtn = qs('#lightboxCloseBtn');

  function openLightbox(src, caption) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption || 'Shree Neelkanth Architectural Blueprint';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Attach Lightbox triggers
  qsa('[data-lightbox-src]').forEach(trigger => {
    trigger.addEventListener('click', function () {
      const src = this.getAttribute('data-lightbox-src');
      const caption = this.getAttribute('data-lightbox-caption') || 'Shree Neelkanth Architectural Drawing';
      if (src) openLightbox(src, caption);
    });
  });

  // ----------------------------------------------------------
  // ENQUIRY & SITE VISIT MODAL CONTROLLER
  // ----------------------------------------------------------
  const enquiryModal      = qs('#enquiryModal');
  const modalCloseBtn     = qs('#modalClose');
  const modalBackdrop     = qs('#modalBackdrop');
  const tabEnquiry        = qs('#tabEnquiry');
  const tabSiteVisit      = qs('#tabSiteVisit');
  const modalHeading      = qs('#modalHeading');
  const visitDateGroup    = qs('#visitDateGroup');
  const enquiryTypeInput  = qs('#enquiryTypeInput');
  const enquiryForm       = qs('#enquiryForm');
  const enquirySuccess    = qs('#enquirySuccess');
  const submitEnquiryBtn  = qs('#submitEnquiryBtn');
  const leadProjectSelect = qs('#leadProject');

  function openEnquiryModal(type, projectName) {
    if (!enquiryModal) return;
    enquiryModal.classList.add('open');
    enquiryModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setEnquiryTab(type || 'enquiry');

    const proj = projectName || 'ShreeNeelkanth';
    if (leadProjectSelect) {
      let found = false;
      for (let i = 0; i < leadProjectSelect.options.length; i++) {
        if (leadProjectSelect.options[i].value.toLowerCase() === proj.toLowerCase() ||
            leadProjectSelect.options[i].text.toLowerCase().includes(proj.toLowerCase())) {
          leadProjectSelect.selectedIndex = i;
          found = true;
          break;
        }
      }
      if (!found) {
        const opt = document.createElement('option');
        opt.value = proj;
        opt.text = proj + ' (Delivered)';
        leadProjectSelect.add(opt);
        leadProjectSelect.value = proj;
      }
    }

    const firstInput = qs('input[name="name"]', enquiryModal);
    if (firstInput) setTimeout(() => firstInput.focus(), 150);
  }

  function closeEnquiryModal() {
    if (!enquiryModal) return;
    enquiryModal.classList.remove('open');
    enquiryModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (enquirySuccess) enquirySuccess.style.display = 'none';
    if (submitEnquiryBtn) {
      submitEnquiryBtn.style.display = 'inline-flex';
      submitEnquiryBtn.disabled = false;
      const span = submitEnquiryBtn.querySelector('span');
      if (span) span.textContent = 'Submit Request';
    }
  }

  function setEnquiryTab(type) {
    const isVisit = type === 'visit';
    if (tabEnquiry) {
      tabEnquiry.classList.toggle('enquiry-modal__tab--active', !isVisit);
      tabEnquiry.setAttribute('aria-selected', String(!isVisit));
    }
    if (tabSiteVisit) {
      tabSiteVisit.classList.toggle('enquiry-modal__tab--active', isVisit);
      tabSiteVisit.setAttribute('aria-selected', String(isVisit));
    }
    if (visitDateGroup) {
      visitDateGroup.style.display = isVisit ? 'block' : 'none';
      const visitInput = qs('#leadVisitDate');
      if (visitInput) visitInput.required = isVisit;
    }
    if (modalHeading) {
      modalHeading.textContent = isVisit ? 'Book a Private Site Visit — Shree Neelkanth' : 'Enquire About Shree Neelkanth';
    }
    if (enquiryTypeInput) {
      enquiryTypeInput.value = isVisit ? 'Site Visit' : 'General Enquiry';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeEnquiryModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeEnquiryModal);
  if (tabEnquiry) tabEnquiry.addEventListener('click', () => setEnquiryTab('enquiry'));
  if (tabSiteVisit) tabSiteVisit.addEventListener('click', () => setEnquiryTab('visit'));

  // Attach enquiry triggers
  qsa('[data-open-enquiry]').forEach(btn => {
    btn.addEventListener('click', function () {
      const type = this.getAttribute('data-enquiry-type') || 'enquiry';
      const proj = this.getAttribute('data-project-name') || 'ShreeNeelkanth';
      openEnquiryModal(type, proj);
    });
  });

  // Global ESC key listener
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeSidebar();
      closeLightbox();
      closeEnquiryModal();
    }
  });

  // Form Submission
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const nameInput  = qs('#leadName');
      const phoneInput = qs('#leadPhone');
      const nameErr    = qs('#nameError');
      const phoneErr   = qs('#phoneError');

      if (nameErr) nameErr.textContent = '';
      if (phoneErr) phoneErr.textContent = '';

      let hasError = false;
      if (!nameInput || !nameInput.value.trim()) {
        if (nameErr) nameErr.textContent = 'Please enter your name';
        hasError = true;
      }
      if (!phoneInput || !phoneInput.value.trim() || phoneInput.value.trim().length < 8) {
        if (phoneErr) phoneErr.textContent = 'Please enter a valid phone number';
        hasError = true;
      }

      if (hasError) return;

      if (submitEnquiryBtn) {
        submitEnquiryBtn.disabled = true;
        const span = submitEnquiryBtn.querySelector('span');
        if (span) span.textContent = 'Sending...';
      }

      setTimeout(() => {
        if (enquirySuccess) enquirySuccess.style.display = 'block';
        if (submitEnquiryBtn) submitEnquiryBtn.style.display = 'none';
        enquiryForm.reset();
        setTimeout(() => {
          closeEnquiryModal();
          if (submitEnquiryBtn) {
            submitEnquiryBtn.disabled = false;
            submitEnquiryBtn.style.display = 'inline-flex';
            const span = submitEnquiryBtn.querySelector('span');
            if (span) span.textContent = 'Submit Request';
          }
        }, 3200);
      }, 600);
    });
  }
})();
