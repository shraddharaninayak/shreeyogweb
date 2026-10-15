/* ==========================================================
   SHREEYOG BUILDERS — PROJECT DATA REPOSITORY
   ==========================================================
   Edit this file to update project details, descriptions,
   images, and status across the Shreeyog Builders website.
   ========================================================== */

const ONGOING_PROJECTS = [
  {
    id: 'shri-venkatesh',
    name: 'Shri Venkatesh',
    configuration: '2 & 3 BHK Modern Homes',
    location: 'Nashik, Maharashtra',
    status: 'Ongoing Residential Development',
    description: 'A premium residential development crafted with meticulous attention to detail, offering modern 2 & 3 BHK homes designed for refined everyday living.',
    image: 'images/venkatesh-real.png',
    alt: 'Shri Venkatesh — residential exterior by Shreeyog Builders',
    badge: 'Ongoing'
  },
  {
    id: 'shri-brahmand',
    name: 'Shri Brahmand',
    configuration: '2 & 3 BHK Modern Homes',
    location: 'Nashik, Maharashtra',
    status: 'Ongoing Residential Development',
    description: 'Thoughtfully planned living spaces that balance architectural elegance with the warmth and comfort a home deserves.',
    image: 'images/bramhand-real.jpg',
    alt: 'Shri Brahmand — residential exterior by Shreeyog Builders',
    badge: 'Ongoing'
  },
  {
    id: 'shri-neelkanth',
    name: 'Shri Neelkanth',
    configuration: '2 & 3 BHK Luxurious Flats',
    location: 'Nashik, Maharashtra',
    status: 'Ongoing Residential Development',
    description: 'A distinguished residential community where contemporary design meets enduring quality, tailored for those with discerning standards.',
    image: 'images/neelkanth-real.jpg',
    alt: 'Shri Neelkanth — residential exterior by Shreeyog Builders',
    badge: 'Ongoing'
  },
  {
    id: 'shri-nandan',
    name: 'Shri Nandan',
    configuration: '2 & 3 BHK Luxurious Flats',
    location: 'Nashik, Maharashtra',
    status: 'Ongoing Residential Development',
    description: 'Serene, well-considered residences designed to offer a complete living experience with generous spaces and refined finishes.',
    image: 'images/nandan-real.jpg',
    alt: 'Shri Nandan — residential exterior by Shreeyog Builders',
    badge: 'Ongoing'
  },
  {
    id: 'shri-malhar',
    name: 'Shri Malhar',
    configuration: '3 BHK Luxurious Flats',
    location: 'Nashik, Maharashtra',
    status: 'Ongoing Residential Development',
    description: "Carefully designed homes that reflect Shreeyog's commitment to architectural integrity, quality materials, and timeless aesthetics.",
    image: 'images/malhar-real.jpg',
    alt: 'Shri Malhar — residential exterior by Shreeyog Builders',
    badge: 'Ongoing'
  },
  {
    id: 'shri-murlidhar-park',
    name: 'Shri Murlidhar Park',
    configuration: '1, 2 & 3 BHK Luxurious Flats & Shops',
    location: 'Nashik, Maharashtra',
    status: 'Ongoing Residential & Commercial Development',
    description: 'A residential and commercial enclave offering well-proportioned homes and retail spaces within a considered environment, crafted for long-term comfort and value.',
    image: 'images/murlidhar-real.jpg',
    alt: 'Shri Murlidhar Park — residential and commercial exterior by Shreeyog Builders',
    badge: 'Ongoing'
  },
  {
    id: 'shri-pandurang',
    name: 'Shri Pandurang',
    configuration: '2 & 3 BHK Luxurious Flats',
    location: 'Nashik, Maharashtra',
    status: 'Ongoing Residential Development',
    description: 'Premium homes designed with purpose and precision, bringing together quality craftsmanship and spaces that inspire everyday life.',
    image: 'images/pandurang-real.jpg',
    alt: 'Shri Pandurang — residential exterior by Shreeyog Builders',
    badge: 'Ongoing'
  }
];

const COMPLETED_PROJECTS = [
  {
    id: 'shri-nakshatra',
    name: 'Shri Nakshatra',
    configuration: 'Delivered Residential Landmark',
    location: 'Nashik, Maharashtra',
    status: 'Completed Project — Delivered',
    description: 'A landmark residential development delivered with exceptional craftsmanship, structural durability, and enduring community value in Nashik.',
    image: 'images/nakshatra-real.jpg',
    alt: 'Shri Nakshatra — completed residential landmark by Shreeyog Builders',
    badge: 'Completed'
  },
  {
    id: 'shri-vrindavan',
    name: 'Shri Vrindavan',
    configuration: 'Delivered Residential Landmark',
    location: 'Nashik, Maharashtra',
    status: 'Completed Project — Delivered',
    description: 'A completed residential sanctuary designed for comfort, architectural harmony, and timeless family living.',
    image: 'images/vrindavan-real.jpg',
    alt: 'Shri Vrindavan — completed residential landmark by Shreeyog Builders',
    badge: 'Completed'
  },
  {
    id: 'shri-chintan',
    name: 'Shri Chintan',
    configuration: 'Residential & Commercial Landmark',
    location: 'Nashik, Maharashtra',
    status: 'Completed Project — Delivered',
    description: 'A thoughtfully planned mixed-use development combining modern residential spaces with functional commercial premises.',
    image: 'images/chintan-real.jpg',
    alt: 'Shri Chintan — completed residential and commercial development by Shreeyog Builders',
    badge: 'Completed'
  },
  {
    id: 'shri-shakuntal',
    name: 'Shri Shakuntal',
    configuration: 'Delivered Premium Residences',
    location: 'Nashik, Maharashtra',
    status: 'Completed Project — Delivered',
    description: 'A signature residential address crafted with architectural precision, premium finishes, and enduring structural integrity.',
    image: 'images/shakuntal-real.jpg',
    alt: 'Shri Shakuntal — completed premium residences by Shreeyog Builders',
    badge: 'Completed'
  }
];

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
  module.exports = { ONGOING_PROJECTS, COMPLETED_PROJECTS, COMPLETED_AMENITIES };
}
