export const siteConfig = {
  name: "Purwanchal Secondary Boarding School",
  nameShort: "Purwanchal School",
  tagline: "Building Knowledge, Inspiring Futures",
  description:
    "An academic institution in Itahari-20, Tarahara, Sunsari, providing structured learning, scientific exploration, and moral discipline from Nursery through Grade 12.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://purwanchalsecondaryschool.com",
  address: "Itahari-20, Tarahara, Sunsari, Koshi Province, Nepal",
  phone: "+977-25-475403",
  email: "info@purwanchalsecondaryschool.com",
  facebook: "https://www.facebook.com/p/Purwanchal-Secondary-Boarding-School-100042750254850/",
  establishedYear: 1994,
  coordinates: {
    lat: 26.6648,
    lng: 87.2769,
  },
  officeHours: {
    start: "7:00 AM",
    end: "4:00 PM",
    days: "Sunday to Friday",
  },
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Academics", href: "/academics" },
  { label: "Facilities", href: "/facilities" },
  { label: "Admissions", href: "/admissions" },
  {
    label: "News & Events",
    href: "/news",
    children: [
      { label: "Latest Notices", href: "/news" },
      { label: "Campus Events", href: "/events" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;

export const academicLevels = [
  { label: "Early Childhood Development", value: "ECD", grades: "Nursery to KG" },
  { label: "Primary Education", value: "PRIMARY", grades: "Grade 1 to 5" },
  { label: "Lower Secondary Education", value: "LOWER_SECONDARY", grades: "Grade 6 to 8" },
  { label: "Secondary Education", value: "SECONDARY", grades: "Grade 9 to 10" },
  { label: "Higher Secondary (+2)", value: "PLUS_TWO", grades: "Grade 11 to 12" },
] as const;

export const plusTwoStreams = [
  { label: "Management", value: "management" },
  { label: "Computer Science", value: "computer-science" },
  { label: "Education", value: "education" },
] as const;
