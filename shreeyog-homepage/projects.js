'use strict';

/* ==========================================================
   SHREEYOG BUILDERS — PROJECTS PAGE SCRIPT
   ========================================================== */

(function () {
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // ----------------------------------------------------------
  // NAV: add .scrolled class on scroll
  // ----------------------------------------------------------
  const nav = qs('#mainNav');

  function handleNavScroll() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 40);
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

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
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
  // HANDLE HASH ANCHOR SCROLL ON LOAD
  // ----------------------------------------------------------
  function handleHashScroll() {
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        setTimeout(() => {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    }
  }

  window.addEventListener('load', handleHashScroll);
  window.addEventListener('hashchange', handleHashScroll);
})();
