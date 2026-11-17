import { PrismaClient, UserRole, PublicationStatus, InquiryStatus, MessageStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Purwanchal School database seeding...");

  // 1. Admin User
  const passwordHash = await bcrypt.hash("AdminPassword2026!", 10);
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@purwanchalschool.edu.np" },
    update: {
      passwordHash,
      role: UserRole.SUPER_ADMIN,
      isActive: true,
    },
    create: {
      name: "School Administration",
      email: "admin@purwanchalschool.edu.np",
      passwordHash,
      role: UserRole.SUPER_ADMIN,
      isActive: true,
    },
  });
  console.log("✅ Admin user ready:", adminUser.email);

  // 2. News Categories
  const categoriesData = [
    { name: "Academic Notices", slug: "academic-notices", sortOrder: 1 },
    { name: "Examination & Routine", slug: "examination-routine", sortOrder: 2 },
    { name: "Admissions", slug: "admissions", sortOrder: 3 },
    { name: "Events & Sports", slug: "events-sports", sortOrder: 4 },
    { name: "Circulars", slug: "circulars", sortOrder: 5 },
  ];

  const categories = await Promise.all(
    categoriesData.map((cat) =>
      prisma.newsCategory.upsert({
        where: { slug: cat.slug },
        update: { name: cat.name, sortOrder: cat.sortOrder },
        create: cat,
      })
    )
  );
  console.log(`✅ Seeded ${categories.length} news categories`);

  // Map categories for quick lookup
  const categoryMap = Object.fromEntries(categories.map((c) => [c.slug, c.id]));

  // 3. News Articles
  const articlesData = [
    {
      title: "Admissions Open for Academic Session 2081/2082 (Nursery to Grade 11)",
      slug: "admissions-open-academic-session-2081-2082",
      excerpt: "Application forms for the upcoming academic session are now available at the administrative office and through our online portal. Diagnostic evaluations occur weekly.",
      content: `Purwanchal Secondary Boarding School announces that enrollment applications for the new academic session 2081/2082 are officially open for Nursery through Grade 9, as well as Grade 11 Higher Secondary streams (+2 in Management, Computer Science, and Education).

Interested parents and guardians are cordially invited to visit our administrative front desk in Tarahara, Itahari-20, between 9:00 AM and 4:30 PM (Sunday to Friday) to obtain the school prospectus, registration kit, and schedule placement assessments.

Online inquiries may also be submitted directly through our official website portal.`,
      categoryId: categoryMap["admissions"],
      authorId: adminUser.id,
      status: PublicationStatus.PUBLISHED,
      isFeatured: true,
      publishedAt: new Date(),
    },
    {
      title: "SEE Board Examination Routine & Special Preparation Classes for Grade 10",
      slug: "see-board-examination-routine-preparation",
      excerpt: "The National Examination Board has announced the timetable for the upcoming Secondary Education Examination (SEE). Special coaching classes commence this Sunday.",
      content: `All students appearing for the Secondary Education Examination (SEE) and their guardians are informed that final preparation sessions and mock board test series will begin from this Sunday.

The school has arranged intensive morning revision sessions for compulsory Mathematics, Science, and English, alongside doubt-clearing clinics in the afternoon. Full attendance is mandatory for all registered candidates. Admit cards will be distributed following the completion of the second mock series.`,
      categoryId: categoryMap["examination-routine"],
      authorId: adminUser.id,
      status: PublicationStatus.PUBLISHED,
      isFeatured: false,
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      title: "Second Terminal Assessment Results & Parent-Teacher Meeting (PTM)",
      slug: "second-terminal-assessment-results-ptm",
      excerpt: "Parents and guardians are cordially invited to review progress report cards and discuss student academic development with class teachers.",
      content: `The results for the Second Terminal Assessment have been finalized by the academic committee. Parents and guardians are invited to visit the school campus on Friday from 10:00 AM to 3:00 PM to collect academic report cards and interact with respective subject educators.

We encourage open dialogue regarding each child's academic progress, attendance records, and extracurricular involvement.`,
      categoryId: categoryMap["academic-notices"],
      authorId: adminUser.id,
      status: PublicationStatus.PUBLISHED,
      isFeatured: false,
      publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    },
    {
      title: "School Transportation Timing Updates & Winter Schedule",
      slug: "school-transportation-timing-updates",
      excerpt: "Due to morning fog and winter conditions, morning school bus pickup schedules across Tarahara and Itahari routes have been adjusted by 15 minutes.",
      content: `Parents utilizing school transportation services across Itahari-20, Tarahara, and surrounding Sunsari routes are notified that morning pickup times have been adjusted by 15 minutes to ensure student safety during winter morning conditions.

Please coordinate with your respective route drivers. Contact the transport supervisor at the administrative desk for specific junction timings.`,
      categoryId: categoryMap["circulars"],
      authorId: adminUser.id,
      status: PublicationStatus.PUBLISHED,
      isFeatured: false,
      publishedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    },
  ];

  for (const article of articlesData) {
    await prisma.newsArticle.upsert({
      where: { slug: article.slug },
      update: article,
      create: article,
    });
  }
  console.log(`✅ Seeded ${articlesData.length} published news articles`);

  // 4. Events
  const eventsData = [
    {
      title: "Annual Sports Week & Track and Field Meet",
      slug: "annual-sports-week-track-field-meet-2081",
      description: "Inter-house tournaments in football, volleyball, badminton, athletics, and traditional school games.",
      content: `The Purwanchal Annual Sports Week will be conducted on the main school grounds. Events include track sprints, relay races, high jump, long jump, volleyball, football, and tug-of-war. Medals and house trophies will be awarded at the closing ceremony.`,
      location: "School Main Sports Ground",
      startDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      authorId: adminUser.id,
      status: PublicationStatus.PUBLISHED,
      isFeatured: true,
    },
    {
      title: "New Academic Session Orientation Day",
      slug: "new-session-orientation-day-2081",
      description: "Comprehensive orientation for newly enrolled students and guardians covering academic policies and campus facilities.",
      content: `Welcoming new students and guardians to the Purwanchal family. The program introduces subject teachers, code of conduct, textbook requirements, and daily routine.`,
      location: "School Assembly Hall",
      startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      authorId: adminUser.id,
      status: PublicationStatus.PUBLISHED,
      isFeatured: true,
    },
    {
      title: "Inter-House Science, Computing & Mathematics Exhibition",
      slug: "inter-house-science-computing-exhibition",
      description: "Student-crafted science experiments, working electronic models, and computing software presentations.",
      content: `Students from Grades 6 through 12 demonstrate practical scientific models, eco-friendly energy solutions, computer programs, and mathematical puzzles. Open to all visiting parents and alumni.`,
      location: "Science Laboratories & Computer Lab",
      startDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 46 * 24 * 60 * 60 * 1000),
      authorId: adminUser.id,
      status: PublicationStatus.PUBLISHED,
      isFeatured: false,
    },
  ];

  for (const ev of eventsData) {
    await prisma.event.upsert({
      where: { slug: ev.slug },
      update: ev,
      create: ev,
    });
  }
  console.log(`✅ Seeded ${eventsData.length} school events`);

  // 5. Admission Inquiries
  const sampleInquiries = [
    {
      parentName: "Bikash Adhikari",
      studentName: "Aarav Adhikari",
      contactNumber: "9842012345",
      email: "bikash.adhikari@gmail.com",
      currentSchool: "Little Angels Montessori",
      applyingGrade: "Nursery",
      academicYear: "2081/2082",
      message: "Looking for nursery admission with school bus pick-up in Tarahara near the chowk.",
      status: InquiryStatus.NEW,
    },
    {
      parentName: "Sunita Sharma",
      studentName: "Pooja Sharma",
      contactNumber: "9801234567",
      email: "sunita.sharma@yahoo.com",
      currentSchool: "Sunsari Modern English School",
      applyingGrade: "Grade 6",
      academicYear: "2081/2082",
      message: "Transferring due to family relocation to Itahari-20. Would like to inquire about admission test dates.",
      status: InquiryStatus.REVIEWED,
    },
    {
      parentName: "Ramesh Shrestha",
      studentName: "Bibek Shrestha",
      contactNumber: "9812345678",
      email: "ramesh.shrestha@gmail.com",
      currentSchool: "Shree Secondary School, Tarahara",
      applyingGrade: "Grade 11 (Computer Science)",
      academicYear: "2081/2082",
      message: "Interested in the NEB +2 Computer Science stream. Please share the fee schedule and scholarship criteria for GPA 3.6+ students.",
      status: InquiryStatus.NEW,
    },
    {
      parentName: "Kiran Rai",
      studentName: "Roshani Rai",
      contactNumber: "9852033445",
      email: "kiran.rai@outlook.com",
      currentSchool: "Janata Secondary School",
      applyingGrade: "Grade 11 (Management)",
      academicYear: "2081/2082",
      message: "Inquiring about +2 Management stream with Business Studies and Accountancy.",
      status: InquiryStatus.CONTACTED,
    },
  ];

  await prisma.admissionInquiry.deleteMany({});
  for (const inq of sampleInquiries) {
    await prisma.admissionInquiry.create({ data: inq });
  }
  console.log(`✅ Seeded ${sampleInquiries.length} sample admission inquiries`);

  // 6. Contact Messages
  const sampleMessages = [
    {
      fullName: "Dipak Karki",
      email: "dipak.karki@gmail.com",
      phone: "9842556677",
      subject: "Inquiry regarding school bus routes in Tarahara Ward 20",
      message: "Namaste. Could you please confirm if your school bus route reaches near the Tarahara army camp intersection during morning hours?",
      status: MessageStatus.UNREAD,
    },
    {
      fullName: "Sarita Thapa",
      email: "sarita.thapa@yahoo.com",
      phone: "9807112233",
      subject: "+2 Management subject combinations and entrance schedule",
      message: "Greetings, I would like to inquire about the elective subject options available in +2 Management for the upcoming academic session.",
      status: MessageStatus.READ,
    },
    {
      fullName: "Mahesh Chaudhary",
      email: "mahesh.c@gmail.com",
      phone: "9819887766",
      subject: "Request for character certificate and official marksheet copy",
      message: "I am an alumnus who completed SEE in 2078 BS. I need an official transcript copy for university admission verification.",
      status: MessageStatus.UNREAD,
    },
  ];

  await prisma.contactMessage.deleteMany({});
  for (const msg of sampleMessages) {
    await prisma.contactMessage.create({ data: msg });
  }
  console.log(`✅ Seeded ${sampleMessages.length} sample contact messages`);

  // 7. School Profile
  await prisma.schoolProfile.deleteMany({});
  await prisma.schoolProfile.create({
    data: {
      name: "Purwanchal Secondary Boarding School",
      nameNepali: "पूर्वाञ्चल माध्यमिक आवासीय विद्यालय",
      tagline: "Building Knowledge. Inspiring Futures with Discipline & Character.",
      description: "Established in 1994 AD (2051 BS) in Itahari-20, Tarahara, Sunsari. Providing disciplined, high-standard education from Nursery to Grade 12 (+2 Management, Computer Science, and Education).",
      address: "Itahari-20, Tarahara, Sunsari, Koshi Province, Nepal",
      phone: "+977-25-475403",
      email: "info@purwanchalschool.edu.np",
      website: "https://purwanchalschool.edu.np",
      facebookUrl: "https://www.facebook.com/purwanchalschool",
      establishedYear: 1994,
      officeHoursStart: "9:00 AM",
      officeHoursEnd: "4:30 PM",
    },
  });
  console.log("✅ Seeded official school profile");

  // 8. Gallery Categories & Media
  const galleryCatData = [
    { name: "Campus & Architecture", slug: "campus-architecture", sortOrder: 1 },
    { name: "Science & Computing Labs", slug: "science-computing-labs", sortOrder: 2 },
    { name: "Sports & Athletics", slug: "sports-athletics", sortOrder: 3 },
    { name: "Cultural & Annual Functions", slug: "cultural-annual-functions", sortOrder: 4 },
  ];

  const galleryCats = await Promise.all(
    galleryCatData.map((cat) =>
      prisma.galleryCategory.upsert({
        where: { slug: cat.slug },
        update: { name: cat.name, sortOrder: cat.sortOrder },
        create: cat,
      })
    )
  );
  const galleryCatMap = Object.fromEntries(galleryCats.map((c) => [c.slug, c.id]));

  const sampleGalleryMedia = [
    {
      title: "Main Campus Academic Building",
      description: "Three-storey academic block with spacious, well-ventilated classrooms and administrative office in Tarahara.",
      imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
      categoryId: galleryCatMap["campus-architecture"],
      isFeatured: true,
      isPublished: true,
      sortOrder: 1,
    },
    {
      title: "Senior Secondary Computer Laboratory",
      description: "Modern network workstations for practical programming, Office automation, and +2 Computer Science curricula.",
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      categoryId: galleryCatMap["science-computing-labs"],
      isFeatured: true,
      isPublished: true,
      sortOrder: 2,
    },
    {
      title: "Inter-House Track & Sports Tournament",
      description: "Students competing in 100m sprint heats during the Annual Purwanchal Athletic Meet.",
      imageUrl: "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=1200&q=80",
      categoryId: galleryCatMap["sports-athletics"],
      isFeatured: true,
      isPublished: true,
      sortOrder: 3,
    },
    {
      title: "Annual Day Cultural Performance",
      description: "Traditional Nepali dance presented by secondary wing students during the 30th Anniversary Celebrations.",
      imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
      categoryId: galleryCatMap["cultural-annual-functions"],
      isFeatured: true,
      isPublished: true,
      sortOrder: 4,
    },
    {
      title: "Physics & Chemistry Practical Laboratory",
      description: "Supervised experimental stations equipped for secondary science curricula and board examinations.",
      imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80",
      categoryId: galleryCatMap["science-computing-labs"],
      isFeatured: false,
      isPublished: true,
      sortOrder: 5,
    },
  ];

  await prisma.galleryMedia.deleteMany({});
  for (const media of sampleGalleryMedia) {
    await prisma.galleryMedia.create({ data: media });
  }
  console.log(`✅ Seeded ${sampleGalleryMedia.length} gallery media items`);

  console.log("✨ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
