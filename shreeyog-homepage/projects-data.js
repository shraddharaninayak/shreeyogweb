/* ==========================================================
   SHREEYOG BUILDERS — PROJECT DATA REPOSITORY
   ==========================================================
   Unified data structure for all Shreeyog Builders projects.
   Categories supported: 'ongoing', 'completed', 'upcoming'
   ========================================================== */

const ALL_PROJECTS = [
  // ----------------------------------------------------------
  // COMPLETED PROJECTS (9 Verified Delivered Developments)
  // ----------------------------------------------------------
  {
    id: 'shree-vishwa',
    name: 'ShreeVishwa',
    category: 'completed',
    image: 'images/projects/shree-vishwa.jpg',
    shortDescription: 'Completed residential landmark by Shreeyog Builders and Land Developers.',
    location: 'Nashik, Maharashtra',
    brochure: '',
    projectDetailsUrl: 'projects/completed/#shree-vishwa'
  },
  {
    id: 'shree-samruddhi-park',
    name: 'ShreeSamruddhi Park',
    category: 'completed',
    image: 'images/projects/shree-samruddhi-park.jpg',
    shortDescription: 'Completed residential development by Shreeyog Builders and Land Developers.',
    location: 'Nashik, Maharashtra',
    brochure: 'images/new images/ShreeSamruddhi brochure .pdf',
    projectDetailsUrl: 'projects/completed/#shree-samruddhi-park'
  },
  {
    id: 'shree-neelkanth',
    name: 'ShreeNeelkanth',
    category: 'completed',
    image: 'images/projects/shree-neelkanth.jpg',
    shortDescription: 'Completed residential landmark by Shreeyog Builders and Land Developers.',
    location: 'Nashik, Maharashtra',
    brochure: 'images/new images/Neelkanth 11.25 x 11.25 - final - 1.pdf',
    projectDetailsUrl: 'projects/completed/#shree-neelkanth'
  },
  {
    id: 'shree-padma',
    name: 'ShreePadma',
    category: 'completed',
    image: 'images/projects/shree-padma.jpg',
    shortDescription: 'Completed residential development by Shreeyog Builders and Land Developers.',
    location: 'Nashik, Maharashtra',
    brochure: '',
    projectDetailsUrl: 'projects/completed/#shree-padma'
  },
  {
    id: 'shree-anant',
    name: 'ShreeAnant',
    category: 'completed',
    image: 'images/projects/shree-anant.svg',
    shortDescription: 'Completed residential development by Shreeyog Builders and Land Developers.',
    location: 'Nashik, Maharashtra',
    brochure: '',
    projectDetailsUrl: 'projects/completed/#shree-anant'
  },
  {
    id: 'shree-niwas',
    name: 'ShreeNiwas',
    category: 'completed',
    image: 'images/projects/shree-niwas.svg',
    shortDescription: 'Completed residential development by Shreeyog Builders and Land Developers.',
    location: 'Nashik, Maharashtra',
    brochure: '',
    projectDetailsUrl: 'projects/completed/#shree-niwas'
  },
  {
    id: 'shree-nath-enclave',
    name: 'ShreeNath Enclave',
    category: 'completed',
    image: 'images/projects/shree-nath-enclave.svg',
    shortDescription: 'Completed residential enclave by Shreeyog Builders and Land Developers.',
    location: 'Nashik, Maharashtra',
    brochure: '',
    projectDetailsUrl: 'projects/completed/#shree-nath-enclave'
  },
  {
    id: 'shree-navshakti',
    name: 'ShreeNavshakti',
    category: 'completed',
    image: 'images/projects/shree-navshakti.svg',
    shortDescription: 'Completed residential development by Shreeyog Builders and Land Developers.',
    location: 'Nashik, Maharashtra',
    brochure: '',
    projectDetailsUrl: 'projects/completed/#shree-navshakti'
  },
  {
    id: 'shree-swarup',
    name: 'ShreeSwarup',
    category: 'completed',
    image: 'images/projects/shree-swarup.jpg',
    shortDescription: 'Completed residential landmark by Shreeyog Builders and Land Developers.',
    location: 'Nashik, Maharashtra',
    brochure: '',
    projectDetailsUrl: 'projects/completed/#shree-swarup'
  }

  // ----------------------------------------------------------
  // ONGOING PROJECTS
  // Awaiting verified client details. Populated automatically
  // when client provides ongoing developments.
  // ----------------------------------------------------------
];

// Computed helpers to preserve existing API for standalone project pages
const ONGOING_PROJECTS = ALL_PROJECTS.filter(p => p.category === 'ongoing');
const COMPLETED_PROJECTS = ALL_PROJECTS.filter(p => p.category === 'completed');

// Verified Community Amenities (featured on Completed Projects)
const COMPLETED_AMENITIES = [
  {
    title: 'Jogging Track',
    desc: 'Dedicated paved tracks designed for morning fitness and peaceful walking amidst landscaped greens.',
    icon: 'track'
  },
  {
    title: 'Rain Water Harvesting',
    desc: 'Sustainable conservation systems ensuring water replenishment and ecological responsibility.',
    icon: 'water'
  },
  {
    title: 'Solar System',
    desc: 'Energy-efficient solar integrations powering common areas with clean renewable energy.',
    icon: 'solar'
  },
  {
    title: 'Gazebo',
    desc: 'Sheltered outdoor relaxation pavilion for community gatherings and quiet evening reflection.',
    icon: 'gazebo'
  },
  {
    title: 'Kids Play Area',
    desc: 'Safe, dedicated recreational spaces with modern play equipment for children.',
    icon: 'kids'
  },
  {
    title: 'Branded Auto-Door Lift',
    desc: 'High-speed, energy-efficient automated passenger elevators with comprehensive safety systems.',
    icon: 'lift'
  },
  {
    title: 'Indoor & Outdoor Gym',
    desc: 'Fully equipped fitness facilities supporting healthy, active lifestyles for all residents.',
    icon: 'gym'
  },
  {
    title: 'Party Area',
    desc: 'Multi-purpose open-air celebration deck for festive occasions and family events.',
    icon: 'party'
  },
  {
    title: 'Yoga Sitting Place',
    desc: 'Tranquil meditation and yoga zones oriented for morning sunlight and fresh air.',
    icon: 'yoga'
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ALL_PROJECTS, ONGOING_PROJECTS, COMPLETED_PROJECTS, COMPLETED_AMENITIES };
}
