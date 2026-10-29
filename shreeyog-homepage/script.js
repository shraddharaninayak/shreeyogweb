'use strict';

/* ==========================================================
   SHREEYOG BUILDERS — HOMEPAGE SCRIPT
   ========================================================== */

// ----------------------------------------------------------
// DATA (Projects data loaded globally from projects-data.js)
// ----------------------------------------------------------
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
// HERO: video background & entrance initialization
// ----------------------------------------------------------
const heroSection = qs('.hero');
const heroVideo   = qs('#heroVideo');

if (heroVideo && heroSection) {
  heroVideo.muted = true;
  const advanceToVisual = () => {
    try {
      if (heroVideo.currentTime < 2) heroVideo.currentTime = 3.5;
    } catch (_) {}
  };
  if (heroVideo.readyState >= 1) {
    advanceToVisual();
  } else {
    heroVideo.addEventListener('loadedmetadata', advanceToVisual, { once: true });
  }
  const playPromise = heroVideo.play();
  if (playPromise !== undefined) {
    playPromise
      .then(() => {
        heroSection.classList.add('loaded');
      })
      .catch(() => {
        heroSection.classList.add('loaded');
      });
  } else {
    heroSection.classList.add('loaded');
  }
} else if (heroSection) {
  heroSection.classList.add('loaded');
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
// AWARDS: scroll-driven background text (left → right)
// ----------------------------------------------------------
const awardsBgText    = qs('.awards__bg-text');
const awardsSectionEl = qs('.awards');

function updateAwardsBgText() {
  if (!awardsBgText || !awardsSectionEl) return;

  if (reduceMotion.matches) {
    awardsBgText.style.transform = '';
    return;
  }

  const rect = awardsSectionEl.getBoundingClientRect();
  const wh   = window.innerHeight;

  const raw   = (wh - rect.top) / (wh * 0.75);
  const t     = Math.max(0, Math.min(1, raw));
  const eased = 1 - Math.pow(1 - t, 3);

  const x = (eased - 1) * 80 * (window.innerWidth / 100);
  awardsBgText.style.transform = `translateX(${x}px)`;
}

window.addEventListener('scroll', updateAwardsBgText, { passive: true });
window.addEventListener('resize', updateAwardsBgText, { passive: true });
reduceMotion.addEventListener('change', updateAwardsBgText);
updateAwardsBgText();

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

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
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
const bookVisitBtn     = qs('#bookVisitBtn');

function setModalMode(mode) {
  const isVisit = mode === 'site-visit';
  if (tabEnquiry && tabSiteVisit) {
    tabEnquiry.classList.toggle('enquiry-modal__tab--active', !isVisit);
    tabEnquiry.setAttribute('aria-selected', !isVisit);
    tabSiteVisit.classList.toggle('enquiry-modal__tab--active', isVisit);
    tabSiteVisit.setAttribute('aria-selected', isVisit);
  }
  if (modalHeading) {
    modalHeading.textContent = isVisit ? 'Book a Private Site Visit' : 'Schedule Your Consultation';
  }
  if (visitDateGroup) {
    visitDateGroup.style.display = isVisit ? 'block' : 'none';
    const dateInput = qs('#leadVisitDate');
    if (dateInput) dateInput.required = isVisit;
  }
  if (enquiryTypeInput) {
    enquiryTypeInput.value = isVisit ? 'Book a Site Visit' : 'General Enquiry';
  }
  if (submitEnquiryBtn) {
    const label = submitEnquiryBtn.querySelector('span');
    if (label) label.textContent = isVisit ? 'Confirm Site Visit Request' : 'Submit Request';
  }
}

function openEnquiryModal(mode = 'enquiry') {
  if (!enquiryModal) return;
  setModalMode(mode);
  if (enquirySuccess) enquirySuccess.style.display = 'none';
  if (enquiryForm) {
    const inputs = enquiryForm.querySelectorAll('input, select, textarea');
    inputs.forEach(el => el.disabled = false);
    if (submitEnquiryBtn) submitEnquiryBtn.style.display = 'inline-flex';
  }
  enquiryModal.classList.add('open');
  enquiryModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  const nameInput = qs('#leadName');
  if (nameInput) setTimeout(() => nameInput.focus(), 120);
}

function closeEnquiryModal() {
  if (!enquiryModal) return;
  enquiryModal.classList.remove('open');
  enquiryModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (navEnquireBtn) navEnquireBtn.addEventListener('click', () => openEnquiryModal('enquiry'));
if (bookVisitBtn)  bookVisitBtn.addEventListener('click', () => openEnquiryModal('site-visit'));
if (tabEnquiry)    tabEnquiry.addEventListener('click', () => setModalMode('enquiry'));
if (tabSiteVisit)  tabSiteVisit.addEventListener('click', () => setModalMode('site-visit'));
if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeEnquiryModal);
if (modalBackdrop) modalBackdrop.addEventListener('click', closeEnquiryModal);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && enquiryModal && enquiryModal.classList.contains('open')) {
    closeEnquiryModal();
  }
});

// Form submission validation & feedback
if (enquiryForm) {
  enquiryForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nameInput  = qs('#leadName');
    const phoneInput = qs('#leadPhone');
    const nameErr    = qs('#nameError');
    const phoneErr   = qs('#phoneError');

    let isValid = true;
    if (nameErr) nameErr.textContent = '';
    if (phoneErr) phoneErr.textContent = '';

    if (!nameInput || !nameInput.value.trim()) {
      if (nameErr) nameErr.textContent = 'Please enter your full name.';
      isValid = false;
    }

    if (!phoneInput || !phoneInput.value.trim() || phoneInput.value.trim().length < 8) {
      if (phoneErr) phoneErr.textContent = 'Please provide a valid phone number.';
      isValid = false;
    }

    if (!isValid) return;

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
      }, 3500);
    }, 600);
  });
}

// ----------------------------------------------------------
// PROJECTS SECTION & CATEGORY SWITCHER
// ----------------------------------------------------------
const projectsTrack       = qs('#projectsTrack');
const projectsShowcase    = qs('#projectsShowcase');
const projectsMeta        = qs('#projectsMeta');
const projectsPlaceholder = qs('#projectsPlaceholder');
const projectNameEl       = qs('#projectName');
const projectCurrentEl    = qs('#projectCurrent');
const projectTotalEl      = qs('#projectTotal');
const projectPrevBtn      = qs('#projectPrev');
const projectNextBtn      = qs('#projectNext');
const projectDescEl       = qs('#projectDesc');
const projectDescBadgeEl  = qs('#projectDescBadge');
const projectDescLabelEl  = qs('#projectDescLabel');
const projectDescTextEl   = qs('#projectDescText');
const projectDescLinkEl   = qs('#projectDescLink');
const ongoingEnquireBtn   = qs('#ongoingEnquireBtn');
const categoryTabs        = qsa('.projects__tab');

let currentCategory       = 'completed'; // Default to Completed Projects (9 delivered landmarks)
let currentProjects       = [];
let currentProject        = 0;
let projectSlides         = [];
let projectsInitialized   = false;
let nameTimer;
let descTimer;

function getProjectsForCurrentCategory() {
  if (typeof ALL_PROJECTS !== 'undefined' && Array.isArray(ALL_PROJECTS)) {
    return ALL_PROJECTS.filter(p => p.category === currentCategory);
  }
  return [];
}

function buildProjectSlides() {
  if (!projectsTrack) return;

  currentProjects = getProjectsForCurrentCategory();
  projectsTrack.innerHTML = '';
  projectSlides = [];
  currentProject = 0;

  if (currentProjects.length === 0) {
    if (projectsShowcase) projectsShowcase.style.display = 'none';
    if (projectsMeta) projectsMeta.style.display = 'none';
    if (projectsPlaceholder) projectsPlaceholder.style.display = 'flex';
    return;
  }

  if (projectsShowcase) projectsShowcase.style.display = 'flex';
  if (projectsMeta) projectsMeta.style.display = 'block';
  if (projectsPlaceholder) projectsPlaceholder.style.display = 'none';

  if (projectTotalEl) projectTotalEl.textContent = String(currentProjects.length);

  currentProjects.forEach((project, i) => {
    const slide = document.createElement('div');
    slide.className = 'project-slide';
    slide.setAttribute('data-id', project.id);
    slide.setAttribute('role', 'button');
    slide.setAttribute('tabindex', '0');
    slide.setAttribute('aria-label', project.name);

    const img = document.createElement('img');
    img.src = project.image;
    img.alt = project.name + ' — ' + (project.category === 'completed' ? 'Completed Landmark' : 'Ongoing Development') + ' by Shreeyog Builders';
    img.className = 'project-slide__img';
    img.loading = 'lazy';

    slide.appendChild(img);

    slide.addEventListener('click', () => {
      if (i !== currentProject) {
        currentProject = i;
        updateCarousel(true);
      } else if (project.projectDetailsUrl) {
        window.location.href = project.projectDetailsUrl;
      }
    });

    slide.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (i !== currentProject) {
          currentProject = i;
          updateCarousel(true);
        } else if (project.projectDetailsUrl) {
          window.location.href = project.projectDetailsUrl;
        }
      }
    });

    projectsTrack.appendChild(slide);
    projectSlides.push(slide);
  });

  updateCarousel();
  projectsInitialized = true;
}

function updateCarousel(isNavigation) {
  if (!projectsTrack || projectSlides.length === 0 || currentProjects.length === 0) return;

  // Apply state classes
  projectSlides.forEach((slide, i) => {
    slide.className = 'project-slide';
    const diff = Math.abs(i - currentProject);
    if      (diff === 0) slide.classList.add('active');
    else if (diff === 1) slide.classList.add('adjacent');
    else                 slide.classList.add('hidden');
  });

  void projectsTrack.offsetWidth;

  const stage  = projectsTrack.parentElement;
  const stageW = stage ? stage.offsetWidth : window.innerWidth * 0.8;
  const gap    = 32;

  let offsetBefore = 0;
  for (let i = 0; i < currentProject; i++) {
    offsetBefore += projectSlides[i].offsetWidth + gap;
  }
  const activeW   = projectSlides[currentProject].offsetWidth;
  const translate = offsetBefore - (stageW / 2 - activeW / 2);

  projectsTrack.style.transform = `translateX(${-Math.max(0, translate)}px)`;

  if (projectCurrentEl) projectCurrentEl.textContent = String(currentProject + 1);

  const activeData = currentProjects[currentProject];
  if (!activeData) return;

  // Update name
  if (projectNameEl) {
    const newName = activeData.name;
    if (!projectsInitialized || projectNameEl.textContent === newName) {
      projectNameEl.textContent = newName;
      projectNameEl.style.opacity = '1';
    } else {
      clearTimeout(nameTimer);
      projectNameEl.style.opacity = '0';
      nameTimer = setTimeout(() => {
        projectNameEl.textContent = newName;
        projectNameEl.style.opacity = '1';
      }, 240);
    }
  }

  // Update description badge, label & text
  if (projectDescEl) {
    if (projectDescBadgeEl) {
      projectDescBadgeEl.textContent = activeData.category === 'completed' ? 'COMPLETED' : 'ONGOING';
    }
    if (projectDescLabelEl) {
      projectDescLabelEl.textContent = activeData.category === 'completed' ? 'DELIVERED LANDMARK' : 'ONGOING DEVELOPMENT';
    }

    const newDesc = activeData.shortDescription || (activeData.name + ' by Shreeyog Builders & Land Developers in ' + (activeData.location || 'Nashik, Maharashtra') + '.');

    if (projectDescTextEl) {
      if (!projectsInitialized) {
        projectDescTextEl.textContent = newDesc;
      } else if (isNavigation && !projectDescEl.classList.contains('visible')) {
        projectDescTextEl.textContent = newDesc;
        requestAnimationFrame(() => projectDescEl.classList.add('visible'));
      } else if (projectDescEl.classList.contains('visible') && projectDescTextEl.textContent !== newDesc) {
        clearTimeout(descTimer);
        projectDescTextEl.classList.add('fading');
        descTimer = setTimeout(() => {
          projectDescTextEl.textContent = newDesc;
          projectDescTextEl.classList.remove('fading');
        }, 300);
      }
    }

    if (projectDescLinkEl) {
      if (activeData.projectDetailsUrl) {
        projectDescLinkEl.style.display = 'inline-block';
        projectDescLinkEl.href = activeData.projectDetailsUrl;
        projectDescLinkEl.textContent = 'VIEW PROJECT';
      } else {
        projectDescLinkEl.style.display = 'none';
      }
    }
  }
}

// Category Tabs Interaction
if (categoryTabs.length > 0) {
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const selectedCat = tab.getAttribute('data-category');
      if (selectedCat === currentCategory) return;
      currentCategory = selectedCat;

      categoryTabs.forEach(t => {
        const isActive = t === tab;
        t.classList.toggle('projects__tab--active', isActive);
        t.setAttribute('aria-selected', String(isActive));
      });

      buildProjectSlides();
    });
  });
}

// Placeholder Enquire Button (for Ongoing Launches)
if (ongoingEnquireBtn) {
  ongoingEnquireBtn.addEventListener('click', () => {
    const navBtn = qs('#navEnquireBtn');
    if (navBtn) navBtn.click();
  });
}

if (projectPrevBtn) {
  projectPrevBtn.addEventListener('click', () => {
    if (currentProjects.length <= 1) return;
    currentProject = (currentProject - 1 + currentProjects.length) % currentProjects.length;
    updateCarousel(true);
  });
}
if (projectNextBtn) {
  projectNextBtn.addEventListener('click', () => {
    if (currentProjects.length <= 1) return;
    currentProject = (currentProject + 1) % currentProjects.length;
    updateCarousel(true);
  });
}

// Keyboard navigation while projects section is in view
document.addEventListener('keydown', e => {
  const section = qs('.projects');
  if (!section || currentProjects.length <= 1) return;
  const rect = section.getBoundingClientRect();
  if (rect.top > window.innerHeight || rect.bottom < 0) return;
  if (e.key === 'ArrowLeft') {
    currentProject = (currentProject - 1 + currentProjects.length) % currentProjects.length;
    updateCarousel(true);
  }
  if (e.key === 'ArrowRight') {
    currentProject = (currentProject + 1) % currentProjects.length;
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
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-sand)" stroke-width="1">
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
    if (overlay)   overlay.style.background = 'rgba(88,71,56,0.58)';
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

    // Overlay — eases from 0.78 to 0.58 as section enters
    if (overlay) {
      overlay.style.background =
        'rgba(88,71,56,' + (0.78 - 0.20 * eOut(p)).toFixed(3) + ')';
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
