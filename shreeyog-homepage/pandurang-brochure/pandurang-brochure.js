'use strict';

/* ==========================================================
   SHREEYOG BUILDERS • SHREE PANDURANG
   Stationary Sidebar Navigation & Interactive Controller
   ========================================================== */

(function () {
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  // ----------------------------------------------------------
  // MOBILE SIDEBAR DRAWER TOGGLE
  // ----------------------------------------------------------
  const sidebar         = qs('#brochureSidebar');
  const sidebarToggle   = qs('#sidebarToggle');
  const sidebarClose    = qs('#sidebarClose');
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

  if (sidebarToggle)   sidebarToggle.addEventListener('click', openSidebar);
  if (sidebarClose)    sidebarClose.addEventListener('click', closeSidebar);
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
      } else {
        break;
      }
    }

    if (current) {
      navLinks.forEach(link => link.classList.remove('active'));
      current.link.classList.add('active');
    }
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetEl = qs(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
          if (window.innerWidth <= 1024) {
            closeSidebar();
          }
        }
      }
    });
  });

  // ----------------------------------------------------------
  // FLOOR PLAN & UNIT PLAN TABS SWITCHER
  // ----------------------------------------------------------
  const planTabs   = qsa('.plan-tab-btn');
  const planPanels = qsa('.plan-panel');

  planTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      const targetPanelId = this.getAttribute('data-tab');
      // Find siblings within same parent
      const parentNav = this.closest('.plans-tab-nav');
      if (parentNav) {
        qsa('.plan-tab-btn', parentNav).forEach(t => t.classList.remove('active'));
      } else {
        planTabs.forEach(t => t.classList.remove('active'));
      }
      this.classList.add('active');

      const targetPanel = qs('#' + targetPanelId);
      if (targetPanel) {
        const container = targetPanel.parentElement;
        qsa('.plan-panel', container).forEach(p => p.classList.remove('active'));
        targetPanel.classList.add('active');
      }
    });
  });

  // ----------------------------------------------------------
  // LIGHTBOX MODAL FOR FLOOR PLANS & DIAGRAMS
  // ----------------------------------------------------------
  const lightboxModal = qs('#lightboxModal');
  const lightboxImg   = qs('#lightboxImg');
  const lightboxClose = qs('#lightboxClose');

  function openLightbox(src, alt) {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || 'Enlarged Architectural Drawing';
    lightboxModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  qsa('[data-zoomable]').forEach(el => {
    el.addEventListener('click', function () {
      const img = this.querySelector('img') || this;
      if (img && img.src) {
        openLightbox(img.src, img.alt);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', function (e) {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // ----------------------------------------------------------
  // ENQUIRY & SITE VISIT MODAL CONTROLLER
  // ----------------------------------------------------------
  const enquiryModal   = qs('#enquiryModal');
  const enquiryClose   = qs('#enquiryClose');
  const enquiryForm    = qs('#enquiryForm');
  const enquirySuccess = qs('#enquirySuccess');
  const modalTitle     = qs('#enquiryModalTitle');
  const modalTypeInput = qs('#enquiryTypeInput');

  function openEnquiryModal(type) {
    if (!enquiryModal) return;
    enquiryModal.classList.add('open');
    document.body.style.overflow = 'hidden';

    if (modalTitle) {
      modalTitle.textContent = (type === 'visit') ? 'Book a Private Site Visit' : 'Enquire About Shree Pandurang';
    }
    if (modalTypeInput) {
      modalTypeInput.value = (type === 'visit') ? 'Site Visit' : 'Brochure Enquiry';
    }
    if (enquirySuccess) enquirySuccess.style.display = 'none';
    if (enquiryForm) enquiryForm.style.display = 'block';

    const firstInput = qs('input[name="name"]', enquiryModal);
    if (firstInput) setTimeout(() => firstInput.focus(), 150);
  }

  function closeEnquiryModal() {
    if (!enquiryModal) return;
    enquiryModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  qsa('[data-open-enquiry]').forEach(btn => {
    btn.addEventListener('click', function () {
      const type = this.getAttribute('data-enquiry-type') || 'enquiry';
      openEnquiryModal(type);
    });
  });

  if (enquiryClose) enquiryClose.addEventListener('click', closeEnquiryModal);
  if (enquiryModal) {
    enquiryModal.addEventListener('click', function (e) {
      if (e.target === enquiryModal) closeEnquiryModal();
    });
  }

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = qs('button[type="submit"]', this);
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Recording Request...';
      }

      setTimeout(() => {
        if (enquiryForm) enquiryForm.style.display = 'none';
        if (enquirySuccess) enquirySuccess.style.display = 'block';
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Request';
        }
        setTimeout(closeEnquiryModal, 3000);
      }, 700);
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeSidebar();
      closeLightbox();
      closeEnquiryModal();
    }
  });

})();
