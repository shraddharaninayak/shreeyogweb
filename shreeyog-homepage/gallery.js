'use strict';

/* ==========================================================
   SHREEYOG BUILDERS — DEDICATED GALLERY PAGE SCRIPT
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
  menuLinks.forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMenu();
      closeEnquiryModal();
      closeLightbox();
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
        opt.text = projectName;
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

  if (navEnquireBtn) navEnquireBtn.addEventListener('click', () => openEnquiryModal('enquiry'));
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeEnquiryModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeEnquiryModal);
  if (tabEnquiry)    tabEnquiry.addEventListener('click', () => setEnquiryTab('enquiry'));
  if (tabSiteVisit)  tabSiteVisit.addEventListener('click', () => setEnquiryTab('visit'));

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
  // BACKGROUND WATERMARK ANIMATION (GALLERY)
  // ----------------------------------------------------------
  const galleryBgText    = qs('.gallery__bg-text');
  const gallerySectionEl = qs('.gallery-hero');

  function updateGalleryBgText() {
    if (!galleryBgText || !gallerySectionEl) return;
    if (reduceMotion.matches) {
      galleryBgText.style.transform = '';
      return;
    }
    const rect = gallerySectionEl.getBoundingClientRect();
    const wh   = window.innerHeight;
    const raw  = (wh - rect.top) / (wh * 0.75);
    const t    = Math.max(0, Math.min(1, raw));
    const eased= 1 - Math.pow(1 - t, 3);
    const x    = (eased - 1) * 80 * (window.innerWidth / 100);
    galleryBgText.style.transform = `translateX(${x}px)`;
  }

  window.addEventListener('scroll', updateGalleryBgText, { passive: true });
  window.addEventListener('resize', updateGalleryBgText, { passive: true });
  updateGalleryBgText();

  // ----------------------------------------------------------
  // GALLERY CATEGORY FILTER & RENDERING
  // ----------------------------------------------------------
  const galleryTabs        = qsa('.gallery__tab');
  const galleryGrid        = qs('#galleryGrid');
  const galleryPlaceholder = qs('#galleryPlaceholder');
  const placeholderDesc    = qs('#galleryPlaceholderDesc');

  let activeCategory = 'all';

  function renderGallery() {
    const items = typeof GALLERY_ITEMS !== 'undefined' && Array.isArray(GALLERY_ITEMS) ? GALLERY_ITEMS : [];
    const filtered = activeCategory === 'all' ? items : items.filter(it => it.category === activeCategory);

    if (filtered.length === 0) {
      if (galleryGrid) galleryGrid.style.display = 'none';
      if (galleryPlaceholder) {
        galleryPlaceholder.style.display = 'flex';
        galleryPlaceholder.style.opacity = '1';
        if (placeholderDesc) {
          if (items.length === 0) {
            placeholderDesc.textContent = "We're preparing a collection of project photographs and special moments from the Shreeyog journey. Check back soon to explore our gallery.";
          } else {
            placeholderDesc.textContent = `No photographs currently under the ${activeCategory} category. Please check back soon for updates.`;
          }
        }
      }
      return;
    }

    if (galleryPlaceholder) galleryPlaceholder.style.display = 'none';
    if (galleryGrid) {
      galleryGrid.innerHTML = '';
      galleryGrid.style.display = 'grid';

      filtered.forEach(item => {
        const card = document.createElement('article');
        card.className = `gallery-item ${item.aspect === 'portrait' ? 'gallery-item--portrait' : ''}`;
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', item.title || 'Gallery Photograph');

        card.innerHTML = `
          <div class="gallery-item__media">
            <img src="${item.image}" alt="${item.title || 'Shreeyog Builders Photograph'}" class="gallery-item__img" loading="lazy" />
          </div>
          <div class="gallery-item__content">
            <span class="gallery-item__badge">${(item.category || '').toUpperCase()}</span>
            <h3 class="gallery-item__title">${item.title || ''}</h3>
            ${item.caption ? `<p class="gallery-item__desc">${item.caption}</p>` : ''}
          </div>
        `;

        card.addEventListener('click', () => openLightbox(item));
        card.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightbox(item);
          }
        });

        galleryGrid.appendChild(card);
      });
    }
  }

  // Category Tabs
  galleryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const cat = tab.getAttribute('data-category');
      if (cat === activeCategory) return;
      activeCategory = cat;

      galleryTabs.forEach(t => {
        const isActive = t === tab;
        t.classList.toggle('gallery__tab--active', isActive);
        t.setAttribute('aria-selected', String(isActive));
      });

      renderGallery();
    });
  });

  // ----------------------------------------------------------
  // LIGHTBOX MODAL
  // ----------------------------------------------------------
  const lightbox         = qs('#galleryLightbox');
  const lightboxImg      = qs('#lightboxImg');
  const lightboxTitle    = qs('#lightboxTitle');
  const lightboxDesc     = qs('#lightboxDesc');
  const lightboxCloseBtn = qs('#lightboxClose');

  function openLightbox(item) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = item.image;
    lightboxImg.alt = item.title || '';
    if (lightboxTitle) lightboxTitle.textContent = item.title || '';
    if (lightboxDesc)  lightboxDesc.textContent = item.caption || item.projectName || '';
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
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Initial render
  renderGallery();
})();

