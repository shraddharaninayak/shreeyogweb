'use strict';

/* ==========================================================
   SHREEYOG BUILDERS — SHREE VISHWA
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
  });

  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 180;
    let current = observedSections[0];

    for (let i = 0; i < observedSections.length; i++) {
      const item = observedSections[i];
      if (item.section.offsetTop <= scrollPos) {
        current = item;
      }
    }

    if (current) {
      navLinks.forEach(l => l.classList.remove('active'));
      current.link.classList.add('active');
    }
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const target = qs(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (window.innerWidth < 1024) {
            closeSidebar();
          }
        }
      }
    });
  });

  // ----------------------------------------------------------
  // DESKTOP & MOBILE HEADER SCROLL STATE
  // ----------------------------------------------------------
  const header = qs('#brochureHeader');
  const mobileHeader = qs('#mobileHeader');

  function handleHeaderScroll() {
    const scrolled = window.scrollY > 40;
    if (header) header.classList.toggle('scrolled', scrolled);
    if (mobileHeader) mobileHeader.classList.toggle('scrolled', scrolled);
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // ----------------------------------------------------------
  // FLOORPLAN & UNIT PLAN TAB SWITCHER
  // ----------------------------------------------------------
  const planTabs = qsa('.plan-tab-btn');
  const planPanels = qsa('.plan-panel');

  planTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      const targetPlan = this.getAttribute('data-plan');
      planTabs.forEach(t => t.classList.remove('active'));
      planPanels.forEach(p => p.classList.remove('active'));

      this.classList.add('active');
      const activePanel = qs('#plan-' + targetPlan);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });

  // ----------------------------------------------------------
  // BLUEPRINT LIGHTBOX INSPECTOR
  // ----------------------------------------------------------
  const lightbox = qs('#brochureLightbox');
  const lightboxImg = qs('#lightboxImg');
  const lightboxCaption = qs('#lightboxCaption');
  const lightboxClose = qs('#lightboxCloseBtn');
  const zoomTriggers = qsa('[data-zoom-img]');

  function openLightbox(src, caption) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption || 'Architectural Floor Plan — Shree Vishwa';
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

  zoomTriggers.forEach(btn => {
    btn.addEventListener('click', function () {
      const src = this.getAttribute('data-zoom-img');
      const caption = this.getAttribute('data-zoom-caption');
      if (src) openLightbox(src, caption);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeLightbox();
      closeModal();
      closeSidebar();
    }
  });

  // ----------------------------------------------------------
  // ENQUIRY & BOOK SITE VISIT MODAL
  // ----------------------------------------------------------
  const modal = qs('#enquiryModal');
  const modalClose = qs('#modalClose');
  const modalBackdrop = qs('#modalBackdrop');
  const openButtons = qsa('[data-open-enquiry]');
  const tabEnquiry = qs('#tabEnquiry');
  const tabSiteVisit = qs('#tabSiteVisit');
  const visitDateGroup = qs('#visitDateGroup');
  const enquiryTypeInput = qs('#enquiryTypeInput');
  const enquiryForm = qs('#enquiryForm');
  const enquirySuccess = qs('#enquirySuccess');
  const submitBtn = qs('#submitEnquiryBtn');

  function openModal(defaultType, projectName) {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (defaultType === 'visit') {
      selectTab('visit');
    } else {
      selectTab('enquiry');
    }

    const projectSelect = qs('#leadProject');
    if (projectSelect && projectName) {
      projectSelect.value = projectName;
    }
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function selectTab(type) {
    if (type === 'visit') {
      if (tabSiteVisit) tabSiteVisit.classList.add('enquiry-modal__tab--active');
      if (tabEnquiry) tabEnquiry.classList.remove('enquiry-modal__tab--active');
      if (visitDateGroup) visitDateGroup.style.display = 'block';
      if (enquiryTypeInput) enquiryTypeInput.value = 'Book a Site Visit';
      if (submitBtn) submitBtn.querySelector('span').textContent = 'Confirm Site Visit';
    } else {
      if (tabEnquiry) tabEnquiry.classList.add('enquiry-modal__tab--active');
      if (tabSiteVisit) tabSiteVisit.classList.remove('enquiry-modal__tab--active');
      if (visitDateGroup) visitDateGroup.style.display = 'none';
      if (enquiryTypeInput) enquiryTypeInput.value = 'General Enquiry';
      if (submitBtn) submitBtn.querySelector('span').textContent = 'Submit Request';
    }
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const type = this.getAttribute('data-enquiry-type') || 'enquiry';
      const proj = this.getAttribute('data-project-name') || 'Shree Vishwa';
      openModal(type, proj);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
  if (tabEnquiry) tabEnquiry.addEventListener('click', () => selectTab('enquiry'));
  if (tabSiteVisit) tabSiteVisit.addEventListener('click', () => selectTab('visit'));

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const nameInput = qs('#leadName');
      const phoneInput = qs('#leadPhone');
      const nameError = qs('#nameError');
      const phoneError = qs('#phoneError');

      let valid = true;
      if (nameError) nameError.textContent = '';
      if (phoneError) phoneError.textContent = '';

      if (!nameInput || !nameInput.value.trim()) {
        if (nameError) nameError.textContent = 'Please enter your full name';
        valid = false;
      }

      if (!phoneInput || !phoneInput.value.trim() || phoneInput.value.trim().length < 10) {
        if (phoneError) phoneError.textContent = 'Please enter a valid 10-digit mobile number';
        valid = false;
      }

      if (!valid) return;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.querySelector('span').textContent = 'Submitting...';
      }

      setTimeout(() => {
        if (submitBtn) submitBtn.disabled = false;
        enquiryForm.reset();
        if (enquirySuccess) {
          enquirySuccess.style.display = 'block';
          setTimeout(() => {
            closeModal();
            enquirySuccess.style.display = 'none';
          }, 3000);
        }
      }, 700);
    });
  }
})();
