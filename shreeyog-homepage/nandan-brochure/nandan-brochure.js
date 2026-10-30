'use strict';

/* ==========================================================
   SHREEYOG BUILDERS • SHREE NANDAN
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

      planTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      planPanels.forEach(panel => {
        if (panel.id === targetPanelId) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // ----------------------------------------------------------
  // LIGHTBOX VIEWER
  // ----------------------------------------------------------
  const lightboxOverlay = qs('#lightboxOverlay');
  const lightboxImg     = qs('#lightboxImg');
  const lightboxClose   = qs('#lightboxClose');

  function openLightbox(src, alt) {
    if (!lightboxOverlay || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || 'Shree Nandan Architectural Plan';
    lightboxOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxOverlay) return;
    lightboxOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  qsa('[data-lightbox]').forEach(el => {
    el.addEventListener('click', function () {
      const img = this.querySelector('img') || this;
      const src = this.getAttribute('data-lightbox') || img.src;
      const alt = img.getAttribute('alt') || 'Architectural Plan';
      openLightbox(src, alt);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', function (e) {
      if (e.target === lightboxOverlay || e.target === lightboxClose) {
        closeLightbox();
      }
    });
  }

  // ----------------------------------------------------------
  // ENQUIRY MODAL SYSTEM
  // ----------------------------------------------------------
  const enquiryModal   = qs('#enquiryModal');
  const modalCloseBtn  = qs('#modalCloseBtn');
  const modalTitle     = qs('#modalTitle');
  const openEnquiryBtns = qsa('[data-open-enquiry]');
  const flatInterestSel = qs('#flatInterest');
  const enquiryForm    = qs('#enquiryForm');

  function openModal(enquiryType) {
    if (!enquiryModal) return;

    if (flatInterestSel) {
      if (enquiryType === '2bhk') {
        flatInterestSel.value = '2 BHK (Wing A or Wing B)';
      } else if (enquiryType === '3bhk') {
        flatInterestSel.value = '3 BHK (Wing A or Wing B)';
      } else {
        flatInterestSel.value = 'General Site Visit';
      }
    }

    if (modalTitle) {
      modalTitle.textContent = enquiryType === 'visit'
        ? 'Schedule a Personal Site Inspection'
        : 'Inquire About Shree Nandan';
    }

    enquiryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!enquiryModal) return;
    enquiryModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openEnquiryBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const type = this.getAttribute('data-enquiry-type') || 'general';
      openModal(type);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (enquiryModal) {
    enquiryModal.addEventListener('click', function (e) {
      if (e.target === enquiryModal) {
        closeModal();
      }
    });
  }

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = qs('.form-submit-btn', this);
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting Request...';
      }

      setTimeout(() => {
        alert('Thank you! Your inquiry for Shree Nandan has been received. Our luxury residential advisory team will contact you shortly.');
        this.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Enquiry';
        }
        closeModal();
      }, 700);
    });
  }

  // ----------------------------------------------------------
  // ESC KEY LISTENER FOR MODALS & LIGHTBOX
  // ----------------------------------------------------------
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeLightbox();
      closeModal();
      closeSidebar();
    }
  });

})();

