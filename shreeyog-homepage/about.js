'use strict';

/* ==========================================================
   SHREEYOG BUILDERS — DEDICATED ABOUT PAGE SCRIPT
   ========================================================== */

(function () {
  // ----------------------------------------------------------
  // UTILITY: safe querySelector
  // ----------------------------------------------------------
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // ----------------------------------------------------------
  // NAV: add .scrolled class on scroll
  // ----------------------------------------------------------
  const nav = qs('#mainNav');

  function handleNavScroll() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 50);
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
    if (!link.classList.contains('menu-overlay__dropdown-toggle')) {
      link.addEventListener('click', closeMenu);
    }
  });
  qsa('.menu-overlay__sub-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Mobile menu dropdown toggle
  const dropdownToggle = qs('.menu-overlay__dropdown-toggle');
  const subMenu = qs('.menu-overlay__sub-menu');
  if (dropdownToggle && subMenu) {
    dropdownToggle.addEventListener('click', function (e) {
      e.preventDefault();
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
      subMenu.style.display = expanded ? 'none' : 'flex';
      const chevron = this.querySelector('.chevron-icon');
      if (chevron) chevron.style.transform = expanded ? 'rotate(0deg)' : 'rotate(180deg)';
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  // ----------------------------------------------------------
  // SCROLL-DRIVEN BACKGROUND TYPOGRAPHY
  // ----------------------------------------------------------
  const bgElements = [
    { el: qs('.about-story__bg-text'),      sec: qs('.about-story'),      dir: 1 },
    { el: qs('.about-philosophy__bg-text'), sec: qs('.about-philosophy'), dir: -1 },
    { el: qs('.about-journey__bg-text'),    sec: qs('.about-journey'),    dir: 1 },
    { el: qs('.about-approach__bg-text'),   sec: qs('.about-approach'),   dir: -1 }
  ];

  function updateBgTexts() {
    if (reduceMotion.matches) {
      bgElements.forEach(item => {
        if (item.el) item.el.style.transform = '';
      });
      return;
    }

    const wh = window.innerHeight;

    bgElements.forEach(item => {
      if (!item.el || !item.sec) return;
      const rect = item.sec.getBoundingClientRect();

      // progress: 0 when entering viewport bottom → 1 when top is at 30% viewport
      const raw = (wh - rect.top) / (wh * 0.7);
      const t = Math.max(0, Math.min(1, raw));
      const eased = 1 - Math.pow(1 - t, 3);

      const offset = (eased - 1) * 60 * item.dir;
      item.el.style.transform = `translateX(${offset}px)`;
    });
  }

  window.addEventListener('scroll', updateBgTexts, { passive: true });
  window.addEventListener('resize', updateBgTexts, { passive: true });
  reduceMotion.addEventListener('change', updateBgTexts);
  updateBgTexts();

  // ----------------------------------------------------------
  // SCROLL REVEAL (IntersectionObserver)
  // ----------------------------------------------------------
  const revealEls = qsa('.reveal');

  if (reduceMotion.matches) {
    revealEls.forEach(el => el.classList.add('visible'));
  } else if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  // ----------------------------------------------------------
  // SMOOTH ANCHOR NAVIGATION (within page)
  // ----------------------------------------------------------
  qsa('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = qs(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
