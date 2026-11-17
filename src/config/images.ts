/**
 * Curated, freely-hosted photography that gives the redesigned site its
 * visual identity out of the box. Pages can still override these with
 * institution-supplied imageUrl values from the CMS.
 */
const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  // Hero & identity
  heroStudents: u("photo-1523240795612-9a054b0db644", 2000),
  heroClassroom: u("photo-1503676260728-1c00da094a0b", 2000),
  campus: u("photo-1580582932707-520aed937b7b", 1400),
  campusWide: u("photo-1509062522246-3755977927d7", 1800),
  graduation: u("photo-1523050854058-8df90110c9f1", 1400),
  teacher: u("photo-1427504494785-3a9ca7044f45", 1200),
  teacherPortrait: u("photo-1573496359142-b8d87734a5a2", 900),

  // Academics
  scienceLab: u("photo-1532094349884-543bc11b234d", 1400),
  microscope: u("photo-1576086213369-97a306d36557", 1200),
  computerLab: u("photo-1517373116369-9bdb8cdc9f98", 1400),
  library: u("photo-1507842217343-583bb7270b66", 1400),
  books: u("photo-1497633762265-9d179a990aa6", 1200),
  study: u("photo-1584697964358-3e14ca57658b", 1200),
  lecture: u("photo-1524178232363-1fb2b075b655", 1400),

  // Campus life
  sports: u("photo-1574629810360-7efbbe195018", 1400),
  athletics: u("photo-1530549387789-4c1017266635", 1400),
  culture: u("photo-1505373877841-8d25f7d46678", 1400),
  assembly: u("photo-1531058020387-3be344556be6", 1400),
  children: u("photo-1476234251651-f353703a034d", 1200),
  kidsLearning: u("photo-1503454537195-1dcabb73ffb9", 1200),
  bus: u("photo-1570125909232-eb263c188f7e", 1200),

  // Place & atmosphere
  nepal: u("photo-1544735716-392fe2489ffa", 1400),
  mountains: u("photo-1506905925346-21bda4d32df4", 1800),
} as const;

export const galleryImages = [
  { src: images.scienceLab, title: "Science Lab Practical", category: "Academics" },
  { src: images.sports, title: "Annual Sports Meet", category: "Sports" },
  { src: images.heroClassroom, title: "Interactive Classroom", category: "Classroom" },
  { src: images.culture, title: "Cultural Showcase", category: "Cultural" },
  { src: images.library, title: "Reading Room", category: "Academics" },
  { src: images.computerLab, title: "Computer Lab", category: "Academics" },
  { src: images.children, title: "Campus Life", category: "Students" },
  { src: images.assembly, title: "School Assembly", category: "Community" },
] as const;
