'use strict';

/* ==========================================================
   SHREEYOG BUILDERS — HOMEPAGE SCRIPT
   ========================================================== */

// ----------------------------------------------------------
// DATA
// ----------------------------------------------------------
const PROJECTS = [
  {
    name: 'Shri Venkatesh',
    img:  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=80',
    alt:  'Shri Venkatesh — residential exterior',
    desc: 'A premium residential development crafted with meticulous attention to detail, offering homes designed for refined everyday living.'
  },
  {
    name: 'Shri Brahmand',
    img:  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=80',
    alt:  'Shri Brahmand — residential exterior',
    desc: 'Thoughtfully planned living spaces that balance architectural elegance with the warmth and comfort a home deserves.'
  },
  {
    name: 'Shri Neelkanth',
    img:  'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=900&q=80',
    alt:  'Shri Neelkanth — residential exterior',
    desc: 'A distinguished residential community where contemporary design meets enduring quality, tailored for those with discerning standards.'
  },
  {
    name: 'Shri Nandan',
    img:  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=80',
    alt:  'Shri Nandan — residential exterior',
    desc: 'Serene, well-considered residences designed to offer a complete living experience with generous spaces and refined finishes.'
  },
  {
    name: 'Shri Malhar',
    img:  'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&w=900&q=80',
    alt:  'Shri Malhar — residential exterior',
    desc: "Carefully designed homes that reflect Shreeyog's commitment to architectural integrity, quality materials, and timeless aesthetics."
  },
  {
    name: 'Shri Murlidhar Park',
    img:  'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?auto=format&fit=crop&w=900&q=80',
    alt:  'Shri Murlidhar Park — residential exterior',
    desc: 'A residential enclave offering well-proportioned homes within a considered environment, crafted for long-term comfort and value.'
  },
  {
    name: 'Shri Pandurang',
    img:  'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=900&q=80',
    alt:  'Shri Pandurang — residential exterior',
    desc: 'Premium homes designed with purpose and precision, bringing together quality craftsmanship and spaces that inspire everyday life.'
  }
];

const TESTIMONIALS = [
  {
    quote: '"Shreeyog delivered a home that exceeded every expectation. The craftsmanship and attention to detail is simply unmatched."',
    name:  'CLIENT PLACEHOLDER — PUNE RESIDENCE'
  },
  {
    quote: '"From the first consultation to the handover, the entire experience was seamless. We could not be happier with our new home."',
    name:  'CLIENT PLACEHOLDER — NASHIK PROJECT'
  },
  {
    quote: '"The spaces feel thoughtfully considered at every turn. Shreeyog understands what a home should truly feel like to live in."',
    name:  'CLIENT PLACEHOLDER — MUMBAI FLAT'
  }
];

// ----------------------------------------------------------
// UTILITY: safe querySelector
// ----------------------------------------------------------
function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

// ----------------------------------------------------------
// NAV: add .scrolled class on scroll
// ----------------------------------------------------------
const nav = qs('.nav');

function handleNavScroll() {
  if (!nav) return;
  nav.classList.toggle('scrolled', window.scrollY > 60);
}
window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

// ----------------------------------------------------------
// HERO: trigger image scale-in after load
// ----------------------------------------------------------
const heroSection = qs('.hero');
const heroImg     = qs('#heroImg');

if (heroImg && heroSection) {
  const onLoad = () => heroSection.classList.add('loaded');
  if (heroImg.complete) {
    onLoad();
  } else {
    heroImg.addEventListener('load', onLoad);
    // Fallback: still trigger after 1.5 s even if no load event fires
    setTimeout(onLoad, 1500);
  }
}

// ----------------------------------------------------------
// INTRO: scroll-driven ABOUT background text (left → right)
// ----------------------------------------------------------
const introBgText  = qs('.intro__bg-text');
const introSection = qs('.intro');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function updateIntroBgText() {
  if (!introBgText || !introSection) return;

  if (reduceMotion.matches) {
    introBgText.style.transform = '';
    return;
  }

  const rect = introSection.getBoundingClientRect();
  const wh   = window.innerHeight;

  // progress: 0 when section enters viewport bottom → 1 when section top is at 25 % of viewport
  const raw     = (wh - rect.top) / (wh * 0.75);
  const t       = Math.max(0, Math.min(1, raw));
  const eased   = 1 - Math.pow(1 - t, 3);          // ease-out cubic

  // translate from –80 vw (off-screen left) to 0 (natural right-anchored position)
  const x = (eased - 1) * 80 * (window.innerWidth / 100);
  introBgText.style.transform = `translateX(${x}px)`;
}

window.addEventListener('scroll', updateIntroBgText, { passive: true });
window.addEventListener('resize', updateIntroBgText, { passive: true });
reduceMotion.addEventListener('change', updateIntroBgText);
updateIntroBgText(); // set correct position on first paint

// ----------------------------------------------------------
// PROJECTS: scroll-driven background text (left → right)
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

  // Identical formula to the About section
  const raw   = (wh - rect.top) / (wh * 0.75);
  const t     = Math.max(0, Math.min(1, raw));
  const eased = 1 - Math.pow(1 - t, 3);

  // Translate from –80 vw (off-screen left) to 0 (natural right-anchored position)
  const x = (eased - 1) * 80 * (window.innerWidth / 100);
  projectsBgText.style.transform = `translateX(${x}px)`;
}

window.addEventListener('scroll', updateProjectsBgText, { passive: true });
window.addEventListener('resize', updateProjectsBgText, { passive: true });
reduceMotion.addEventListener('change', updateProjectsBgText);
updateProjectsBgText(); // set correct position on first paint

// ----------------------------------------------------------
// SERVICES: scroll-driven background text (left → right)
// ----------------------------------------------------------
const servicesBgText    = qs('.services__bg-text');
const servicesSectionEl = qs('.services');

function updateServicesBgText() {
  if (!servicesBgText || !servicesSectionEl) return;

  if (reduceMotion.matches) {
    servicesBgText.style.transform = '';
    return;
  }

  const rect = servicesSectionEl.getBoundingClientRect();
  const wh   = window.innerHeight;

  // Identical formula to the About and Projects sections
  const raw   = (wh - rect.top) / (wh * 0.75);
  const t     = Math.max(0, Math.min(1, raw));
  const eased = 1 - Math.pow(1 - t, 3);

  // Translate from –80 vw (off-screen left) to 0 (natural right-anchored position)
  const x = (eased - 1) * 80 * (window.innerWidth / 100);
  servicesBgText.style.transform = `translateX(${x}px)`;
}

window.addEventListener('scroll', updateServicesBgText, { passive: true });
window.addEventListener('resize', updateServicesBgText, { passive: true });
reduceMotion.addEventListener('change', updateServicesBgText);
updateServicesBgText(); // set correct position on first paint

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
menuLinks.forEach(link => link.addEventListener('click', closeMenu));

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});

// ----------------------------------------------------------
// PROJECTS CAROUSEL
// ----------------------------------------------------------
const projectsTrack   = qs('#projectsTrack');
const projectNameEl   = qs('#projectName');
const projectCurrentEl= qs('#projectCurrent');
const projectTotalEl  = qs('#projectTotal');
const projectPrevBtn  = qs('#projectPrev');
const projectNextBtn  = qs('#projectNext');
const projectDescEl   = qs('#projectDesc');
const projectDescTextEl = qs('#projectDescText');

let currentProject      = 0;
let projectSlides       = [];
let projectsInitialized = false;
let nameTimer;
let descTimer;

function buildProjectSlides() {
  if (!projectsTrack) return;
  if (projectTotalEl) projectTotalEl.textContent = PROJECTS.length;

  PROJECTS.forEach((project, i) => {
    const slide = document.createElement('div');
    slide.className = 'project-slide';

    const img = document.createElement('img');
    img.src     = project.img;
    img.alt     = project.alt;
    img.className = 'project-slide__img';
    img.loading = 'lazy';

    slide.appendChild(img);

    // Clicking an adjacent slide navigates to it
    slide.addEventListener('click', () => {
      if (i !== currentProject) {
        currentProject = i;
        updateCarousel(true);
      }
    });

    projectsTrack.appendChild(slide);
    projectSlides.push(slide);
  });

  updateCarousel();
  projectsInitialized = true; // crossfade activates after initial build
}

function updateCarousel(isNavigation) {
  if (!projectsTrack || projectSlides.length === 0) return;

  // Apply state classes
  projectSlides.forEach((slide, i) => {
    slide.className = 'project-slide';
    const diff = Math.abs(i - currentProject);
    if      (diff === 0) slide.classList.add('active');
    else if (diff === 1) slide.classList.add('adjacent');
    else                 slide.classList.add('hidden');
  });

  // Force layout reflow so offsetWidth reflects new classes
  void projectsTrack.offsetWidth;

  // Calculate translate so active slide is centred in the stage
  const stage  = projectsTrack.parentElement;
  const stageW = stage ? stage.offsetWidth : window.innerWidth * 0.8;
  const gap    = 32; // 2rem in px at 16px base

  let offsetBefore = 0;
  for (let i = 0; i < currentProject; i++) {
    offsetBefore += projectSlides[i].offsetWidth + gap;
  }
  const activeW  = projectSlides[currentProject].offsetWidth;
  const translate = offsetBefore - (stageW / 2 - activeW / 2);

  projectsTrack.style.transform = `translateX(${-Math.max(0, translate)}px)`;

  // Update counter immediately (no need to animate this)
  if (projectCurrentEl) projectCurrentEl.textContent = String(currentProject + 1);

  // Update name: instant on initial render, crossfade on navigation
  if (projectNameEl) {
    const newName = PROJECTS[currentProject].name;
    if (!projectsInitialized || projectNameEl.textContent === newName) {
      // First render or same project (e.g. resize) — set immediately
      projectNameEl.textContent = newName;
      projectNameEl.style.opacity = '1';
    } else {
      // Navigating to a new project — crossfade the name out then in
      clearTimeout(nameTimer);
      projectNameEl.style.opacity = '0';
      nameTimer = setTimeout(() => {
        projectNameEl.textContent = newName;
        projectNameEl.style.opacity = '1';
      }, 280);
    }
  }

  // Update description panel: hidden on initial build, revealed + crossfade on navigation
  if (projectDescEl && projectDescTextEl) {
    const newDesc = PROJECTS[currentProject].desc;
    if (!projectsInitialized) {
      // Initial build: populate text silently, keep panel hidden
      projectDescTextEl.textContent = newDesc;
    } else if (isNavigation && !projectDescEl.classList.contains('visible')) {
      // First user navigation: reveal panel with text already set
      projectDescTextEl.textContent = newDesc;
      requestAnimationFrame(() => projectDescEl.classList.add('visible'));
    } else if (projectDescEl.classList.contains('visible') && projectDescTextEl.textContent !== newDesc) {
      // Navigating between projects: crossfade the description text
      clearTimeout(descTimer);
      projectDescTextEl.classList.add('fading');
      descTimer = setTimeout(() => {
        projectDescTextEl.textContent = newDesc;
        projectDescTextEl.classList.remove('fading');
      }, 350);
    }
  }
}

if (projectPrevBtn) {
  projectPrevBtn.addEventListener('click', () => {
    currentProject = (currentProject - 1 + PROJECTS.length) % PROJECTS.length;
    updateCarousel(true);
  });
}
if (projectNextBtn) {
  projectNextBtn.addEventListener('click', () => {
    currentProject = (currentProject + 1) % PROJECTS.length;
    updateCarousel(true);
  });
}

// Keyboard navigation while projects section is in view
document.addEventListener('keydown', e => {
  const section = qs('.projects');
  if (!section) return;
  const rect = section.getBoundingClientRect();
  if (rect.top > window.innerHeight || rect.bottom < 0) return;
  if (e.key === 'ArrowLeft') {
    currentProject = (currentProject - 1 + PROJECTS.length) % PROJECTS.length;
    updateCarousel(true);
  }
  if (e.key === 'ArrowRight') {
    currentProject = (currentProject + 1) % PROJECTS.length;
    updateCarousel(true);
  }
});

// Re-centre on resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(updateCarousel, 120);
});

buildProjectSlides();

// ----------------------------------------------------------
// TESTIMONIALS SLIDER
// ----------------------------------------------------------
const testimonialsTrack = qs('#testimonialsTrack');
const testimonialDots   = qs('#testimonialDots');

let currentTestimonial = 0;
let testimonialTimer   = null;

function buildTestimonials() {
  if (!testimonialsTrack) return;

  TESTIMONIALS.forEach((t, i) => {
    // Slide
    const slide = document.createElement('div');
    slide.className = 'testimonial-slide';
    slide.innerHTML = `
      <p class="testimonial-slide__quote">${t.quote}</p>
      <div class="testimonial-slide__avatar" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      </div>
      <p class="testimonial-slide__name">${t.name}</p>
    `;
    testimonialsTrack.appendChild(slide);

    // Dot
    if (testimonialDots) {
      const dot = document.createElement('button');
      dot.className = 'testimonials__dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      dot.addEventListener('click', () => goToTestimonial(i));
      testimonialDots.appendChild(dot);
    }
  });
}

function goToTestimonial(index) {
  currentTestimonial = index;
  if (testimonialsTrack) {
    testimonialsTrack.style.transform = `translateX(${-index * 100}%)`;
  }
  qsa('.testimonials__dot').forEach((d, i) => {
    d.classList.toggle('active', i === index);
  });
}

function startTestimonialAuto() {
  clearInterval(testimonialTimer);
  testimonialTimer = setInterval(() => {
    goToTestimonial((currentTestimonial + 1) % TESTIMONIALS.length);
  }, 5500);
}

// Pause auto-advance while user hovers
const testimonialsSection = qs('.testimonials');
if (testimonialsSection) {
  testimonialsSection.addEventListener('mouseenter', () => clearInterval(testimonialTimer));
  testimonialsSection.addEventListener('mouseleave', startTestimonialAuto);
}

buildTestimonials();
startTestimonialAuto();

// ----------------------------------------------------------
// SCROLL REVEAL (IntersectionObserver)
// ----------------------------------------------------------
const revealEls = qsa('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach(el => revealObserver.observe(el));
} else {
  // Fallback: show everything immediately
  revealEls.forEach(el => el.classList.add('visible'));
}

// ----------------------------------------------------------
// STATEMENT: scroll-driven cinematic reveal
// ----------------------------------------------------------
(function () {
  var section  = qs('.statement');
  if (!section) return;

  var img     = qs('.statement__img',            section);
  var overlay = qs('.statement__overlay',         section);
  var decor   = qs('.statement__decor',           section);
  var line1   = qs('.statement__heading-line--1', section);
  var line2   = qs('.statement__heading-line--2', section);
  var inset   = qs('.statement__inset',           section);

  // Respect reduced-motion: reveal everything at once and bail out
  if (reduceMotion.matches) {
    if (img)     { img.style.opacity = '1';  img.style.transform = 'scale(1)'; }
    if (overlay)   overlay.style.background = 'rgba(0,0,0,0.52)';
    if (decor)     decor.style.opacity = '1';
    if (line1)   { line1.style.opacity = '1'; line1.style.transform = 'translateY(0)'; }
    if (line2)   { line2.style.opacity = '1'; line2.style.transform = 'translateY(0)'; }
    if (inset)   { inset.style.opacity = '1'; inset.style.transform = 'translateY(0)'; }
    return;
  }

  // Ease-out cubic
  function eOut(t) { return 1 - Math.pow(1 - t, 3); }

  // Sub-progress: window starting at 'start', spanning 'len', within [0,1]
  function sub(p, start, len) {
    return Math.max(0, Math.min(1, (p - start) / len));
  }

  var rafId = null;

  function update() {
    rafId = null;
    var rect = section.getBoundingClientRect();
    var vh   = window.innerHeight;

    // p = 0: section top at viewport bottom (just entering)
    // p = 1: section has scrolled (vh * 0.65) pixels into view
    var p = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.65)));

    // Background image — scale 1.08 → 1.0, opacity 0 → 1
    if (img) {
      var ei = eOut(p);
      img.style.opacity   = ei.toFixed(4);
      img.style.transform = 'scale(' + (1.08 - 0.08 * ei).toFixed(5) + ')';
    }

    // Overlay — eases from 0.72 to 0.52 as section enters
    if (overlay) {
      overlay.style.background =
        'rgba(0,0,0,' + (0.72 - 0.20 * eOut(p)).toFixed(3) + ')';
    }

    // Decorative grid — opacity only, starts at p=0.10
    if (decor) {
      decor.style.opacity = eOut(sub(p, 0.10, 0.60)).toFixed(4);
    }

    // Heading line 1 — up 28px, starts at p=0.18
    if (line1) {
      var e1 = eOut(sub(p, 0.18, 0.55));
      line1.style.opacity   = e1.toFixed(4);
      line1.style.transform = 'translateY(' + (28 - 28 * e1).toFixed(2) + 'px)';
    }

    // Heading line 2 — staggered, starts at p=0.28
    if (line2) {
      var e2 = eOut(sub(p, 0.28, 0.55));
      line2.style.opacity   = e2.toFixed(4);
      line2.style.transform = 'translateY(' + (28 - 28 * e2).toFixed(2) + 'px)';
    }

    // Inset image — up 20px, starts at p=0.32
    if (inset) {
      var ei2 = eOut(sub(p, 0.32, 0.55));
      inset.style.opacity   = ei2.toFixed(4);
      inset.style.transform = 'translateY(' + (20 - 20 * ei2).toFixed(2) + 'px)';
    }
  }

  function onScroll() {
    if (!rafId) rafId = requestAnimationFrame(update);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', update,   { passive: true });
  update(); // set correct state immediately on first paint
}());

// ----------------------------------------------------------
// SMOOTH SCROLL for anchor links
// ----------------------------------------------------------
qsa('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    if (id === '#') return;
    const target = qs(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
