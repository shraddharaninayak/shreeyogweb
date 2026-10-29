'use strict';

/* ==========================================================
   SHREEYOG BUILDERS — SHREE ANANT
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
  // DESKTOP HEADER SCROLL EFFECT
  // ----------------------------------------------------------
  const header = qs('#brochureHeader');
  function handleHeaderScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // ----------------------------------------------------------
  // ENQUIRY & SITE VISIT MODAL
  // ----------------------------------------------------------
  const modal = qs('#enquiryModal');
  const modalClose = qs('#modalClose');
  const modalForm = qs('#modalForm');
  const tabEnquiry = qs('#tabEnquiry');
  const tabVisit = qs('#tabVisit');
  const dateFieldGroup = qs('#dateFieldGroup');
  const enquiryTypeInput = qs('#enquiryTypeInput');
  const modalSuccess = qs('#modalSuccess');
  const openEnquiryButtons = qsa('[data-open-enquiry]');

  function setModalTab(type) {
    if (type === 'visit') {
      if (tabVisit) tabVisit.classList.add('active');
      if (tabEnquiry) tabEnquiry.classList.remove('active');
      if (dateFieldGroup) dateFieldGroup.style.display = 'flex';
      if (enquiryTypeInput) enquiryTypeInput.value = 'Site Visit';
    } else {
      if (tabEnquiry) tabEnquiry.classList.add('active');
      if (tabVisit) tabVisit.classList.remove('active');
      if (dateFieldGroup) dateFieldGroup.style.display = 'none';
      if (enquiryTypeInput) enquiryTypeInput.value = 'General Enquiry';
    }
  }

  function openModal(type) {
    if (!modal) return;
    setModalTab(type || 'enquiry');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  openEnquiryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-enquiry-type') || 'enquiry';
      openModal(type);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (tabEnquiry) {
    tabEnquiry.addEventListener('click', () => setModalTab('enquiry'));
  }
  if (tabVisit) {
    tabVisit.addEventListener('click', () => setModalTab('visit'));
  }

  if (modalForm) {
    modalForm.addEventListener('submit', function (e) {
      e.preventDefault();
      modalForm.style.display = 'none';
      if (modalSuccess) modalSuccess.style.display = 'block';

      setTimeout(() => {
        closeModal();
        modalForm.reset();
        modalForm.style.display = 'flex';
        if (modalSuccess) modalSuccess.style.display = 'none';
      }, 3500);
    });
  }

  // ----------------------------------------------------------
  // LIGHTBOX MODAL FOR FLOOR PLANS & DIAGRAMS
  // ----------------------------------------------------------
  const lightbox = qs('#lightboxModal');
  const lightboxImg = qs('#lightboxImg');
  const lightboxClose = qs('#lightboxClose');
  const zoomTriggers = qsa('[data-zoom-img]');

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || 'Enlarged Architectural Drawing';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  zoomTriggers.forEach(el => {
    el.addEventListener('click', function () {
      const src = this.getAttribute('data-zoom-img') || (this.querySelector('img') && this.querySelector('img').src);
      const alt = this.getAttribute('data-zoom-alt') || (this.querySelector('img') && this.querySelector('img').alt);
      if (src) openLightbox(src, alt);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target === lightboxClose) closeLightbox();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeModal();
      closeLightbox();
      closeSidebar();
    }
  });

})();

