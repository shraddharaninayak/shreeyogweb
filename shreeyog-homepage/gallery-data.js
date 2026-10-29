/* ==========================================================
   SHREEYOG BUILDERS — GALLERY DATA REPOSITORY
   ==========================================================
   Unified data structure for all Shreeyog Builders gallery
   photographs, construction milestones, and moments.
   
   Categories supported:
   - 'all'
   - 'projects'
   - 'construction'
   - 'events' (Events & Achievements)

   Each item structure:
   - id: unique string identifier
   - image: relative image file path
   - title: photograph title or heading
   - caption: descriptive text or caption
   - category: 'projects' | 'construction' | 'events'
   - projectName: associated project name (optional)
   - date: year or date of capture (optional)
   - aspect: 'landscape' | 'portrait' (optional)
   ========================================================== */

const GALLERY_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'projects', label: 'Projects' },
  { id: 'construction', label: 'Construction' },
  { id: 'events', label: 'Events & Achievements' }
];

/**
 * Gallery photographs will be populated here when provided by the client.
 * The gallery page automatically renders this data in a responsive
 * architectural grid with lightbox zoom and category filtering.
 * While empty, the page displays the verified temporary announcement.
 */
const GALLERY_ITEMS = [
  // Actual photographs will be added here.
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GALLERY_CATEGORIES, GALLERY_ITEMS };
}

