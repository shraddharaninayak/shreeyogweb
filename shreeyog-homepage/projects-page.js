'use strict';

/* ==========================================================
   SHREEYOG BUILDERS — DEDICATED PROJECTS PAGE SCRIPT
   ========================================================== */

(function () {
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // ----------------------------------------------------------
  // NAVBAR SCROLL EFFECT
  // ----------------------------------------------------------
  const nav = qs('#mainNav');
  function handleNavScroll() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 30);
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ----------------------------------------------------------
  // MOBILE MENU OVERLAY
  // ----------------------------------------------------------
  const menuOpenBtn  = qs('#menuOpen');
  const menuOverlay  = qs('#menuOverlay');
  const menuCloseBtn = qs('#menuClose');
  const menuLinks    = qsa('.menu-overlay__link');

  function openMenu() {
    if (!menuOverlay) return;
    menuOverlay.classList.add('open');
    menuOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!menuOverlay) return;
    menuOverlay.classList.remove('open');
    menuOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (menuOpenBtn)  menuOpenBtn.addEventListener('click', openMenu);
  if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenu);
  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMenu();
      closeEnquiryModal();
    }
  });

  // Mobile menu "Enquire Now" button
  const mobileEnquireBtn = qs('#mobileEnquireBtn');
  if (mobileEnquireBtn) {
    mobileEnquireBtn.addEventListener('click', () => {
      closeMenu();
      openEnquiryModal('enquiry');
    });
  }

  // ----------------------------------------------------------
  // ENQUIRY & SITE VISIT MODAL CONTROLLER
  // ----------------------------------------------------------
  const enquiryModal     = qs('#enquiryModal');
  const modalCloseBtn    = qs('#modalClose');
  const modalBackdrop    = qs('#modalBackdrop');
  const tabEnquiry       = qs('#tabEnquiry');
  const tabSiteVisit     = qs('#tabSiteVisit');
  const modalHeading     = qs('#modalHeading');
  const visitDateGroup   = qs('#visitDateGroup');
  const enquiryTypeInput = qs('#enquiryTypeInput');
  const enquiryForm      = qs('#enquiryForm');
  const enquirySuccess   = qs('#enquirySuccess');
  const submitEnquiryBtn = qs('#submitEnquiryBtn');
  const navEnquireBtn    = qs('#navEnquireBtn');
  const leadProjectSelect= qs('#leadProject');

  function openEnquiryModal(type, projectName) {
    if (!enquiryModal) return;
    enquiryModal.classList.add('open');
    enquiryModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setEnquiryTab(type || 'enquiry');

    if (projectName && leadProjectSelect) {
      let found = false;
      for (let i = 0; i < leadProjectSelect.options.length; i++) {
        if (leadProjectSelect.options[i].text.toLowerCase().includes(projectName.toLowerCase())) {
          leadProjectSelect.selectedIndex = i;
          found = true;
          break;
        }
      }
      if (!found) {
        const opt = document.createElement('option');
        opt.value = projectName;
        opt.text = projectName + ' (Delivered)';
        leadProjectSelect.add(opt);
        leadProjectSelect.value = projectName;
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
      modalHeading.textContent = isVisit ? 'Book a Private Site Visit' : 'Schedule Your Enquiry';
    }
    if (enquiryTypeInput) {
      enquiryTypeInput.value = isVisit ? 'Site Visit' : 'General Enquiry';
    }
  }

  if (navEnquireBtn) {
    navEnquireBtn.addEventListener('click', () => openEnquiryModal('enquiry'));
  }
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeEnquiryModal);
  }
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeEnquiryModal);
  }
  if (tabEnquiry) {
    tabEnquiry.addEventListener('click', () => setEnquiryTab('enquiry'));
  }
  if (tabSiteVisit) {
    tabSiteVisit.addEventListener('click', () => setEnquiryTab('visit'));
  }

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

  // ----------------------------------------------------------
  // BACKGROUND WATERMARK ANIMATION (PORTFOLIO)
  // ----------------------------------------------------------
  const projectsBgText    = qs('.projects__bg-text');
  const projectsSectionEl = qs('.projects');

  function updateProjectsBgText() {
    if (!projectsBgText || !projectsSectionEl) return;
    if (reduceMotion.matches) {
      projectsBgText.style.transform = '';
      return;
    }
    const rect = projectsSectionEl.getBoundingClientRect();
    const wh   = window.innerHeight;
    const raw  = (wh - rect.top) / (wh * 0.75);
    const t    = Math.max(0, Math.min(1, raw));
    const eased= 1 - Math.pow(1 - t, 3);
    const x    = (eased - 1) * 80 * (window.innerWidth / 100);
    projectsBgText.style.transform = `translateX(${x}px)`;
  }

  window.addEventListener('scroll', updateProjectsBgText, { passive: true });
  window.addEventListener('resize', updateProjectsBgText, { passive: true });
  updateProjectsBgText();

  // ----------------------------------------------------------
  // CATEGORY SWITCHER (Completed Projects vs Ongoing Projects)
  // ----------------------------------------------------------
  const projectsCatalog     = qs('#projectsCatalog');
  const projectsPlaceholder = qs('#projectsPlaceholder');
  const ongoingEnquireBtn   = qs('#ongoingEnquireBtn');
  const categoryTabs        = qsa('.projects__tab');

  let currentCategory = 'completed'; // Default: completed

  function switchCategory(category) {
    currentCategory = category;

    categoryTabs.forEach(t => {
      const isActive = t.getAttribute('data-category') === category;
      t.classList.toggle('projects__tab--active', isActive);
      t.setAttribute('aria-selected', String(isActive));
    });

    if (category === 'completed') {
      if (projectsPlaceholder) projectsPlaceholder.style.display = 'none';
      if (projectsCatalog) {
        projectsCatalog.style.display = 'block';
        projectsCatalog.style.opacity = '0';
        requestAnimationFrame(() => {
          projectsCatalog.style.transition = 'opacity 0.35s ease';
          projectsCatalog.style.opacity = '1';
        });
      }
    } else {
      if (projectsCatalog) projectsCatalog.style.display = 'none';
      if (projectsPlaceholder) {
        projectsPlaceholder.style.display = 'flex';
        projectsPlaceholder.style.opacity = '0';
        requestAnimationFrame(() => {
          projectsPlaceholder.style.transition = 'opacity 0.35s ease';
          projectsPlaceholder.style.opacity = '1';
        });
      }
    }
  }

  if (categoryTabs.length > 0) {
    categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const selectedCat = tab.getAttribute('data-category');
        if (selectedCat === currentCategory) return;
        switchCategory(selectedCat);

  // Initialize category based on URL parameters or hash
  const urlParams = new URLSearchParams(window.location.search);
  const hash = window.location.hash.toLowerCase();
  const path = window.location.pathname.toLowerCase();
  if (urlParams.get('tab') === 'ongoing' || urlParams.get('filter') === 'ongoing' || hash === '#ongoing' || path.includes('/ongoing')) {
    switchCategory('ongoing');
  } else {
    switchCategory('completed');
  }

  const navSearchBtn = qs('#navSearchBtn');
  if (navSearchBtn) {
    navSearchBtn.addEventListener('click', () => {
      openEnquiryModal('enquiry');
    });
  }

      });
    });
  }

  // Ongoing Placeholder Enquire Button
  if (ongoingEnquireBtn) {
    ongoingEnquireBtn.addEventListener('click', () => {
      openEnquiryModal('enquiry', 'Upcoming Launches');
    });
  }

  // Card Enquire Buttons in Grid
  qsa('.project-card__enquire-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const projName = this.getAttribute('data-project-name');
      openEnquiryModal('enquiry', projName);
    });
  });
})();
