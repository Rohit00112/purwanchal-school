import { z } from "zod";

export const admissionInquirySchema = z.object({
  parentName: z
    .string()
    .min(2, "Parent/Guardian name must be at least 2 characters")
    .max(100, "Name is too long"),
  studentName: z
    .string()
    .min(2, "Student name must be at least 2 characters")
    .max(100, "Name is too long"),
  contactNumber: z
    .string()
    .min(7, "Please enter a valid contact number")
    .max(20, "Contact number is too long")
    .regex(/^[+\d\s()-]+$/, "Please enter a valid phone number"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  currentSchool: z.string().max(200).optional().or(z.literal("")),
  applyingGrade: z.string().min(1, "Please select a grade"),
  academicYear: z.string().optional().or(z.literal("")),
  message: z.string().max(1000, "Message is too long").optional().or(z.literal("")),
});

export type AdmissionInquiryInput = z.infer<typeof admissionInquirySchema>;

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .max(20)
    .regex(/^[+\d\s()-]*$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject is too long"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long"),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const newsArticleSchema = z.object({
  title: z.string().min(3).max(300),
  slug: z.string().min(3).max(300),
  excerpt: z.string().max(500).optional().or(z.literal("")),
  content: z.string().min(10),
  imageUrl: z.string().url().optional().or(z.literal("")),
  categoryId: z.string().optional().or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  isFeatured: z.boolean().default(false),
  metaTitle: z.string().max(100).optional().or(z.literal("")),
  metaDesc: z.string().max(300).optional().or(z.literal("")),
});

export type NewsArticleInput = z.infer<typeof newsArticleSchema>;

export const eventSchema = z.object({
  title: z.string().min(3).max(300),
  slug: z.string().min(3).max(300),
  description: z.string().max(500).optional().or(z.literal("")),
  content: z.string().optional().or(z.literal("")),
  imageUrl: z.string().url().optional().or(z.literal("")),
  location: z.string().max(300).optional().or(z.literal("")),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional().or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  isFeatured: z.boolean().default(false),
  metaTitle: z.string().max(100).optional().or(z.literal("")),
  metaDesc: z.string().max(300).optional().or(z.literal("")),
});

export type EventInput = z.infer<typeof eventSchema>;

export const staffMemberSchema = z.object({
  name: z.string().min(2).max(100),
  role: z.enum([
    "PRINCIPAL",
    "VICE_PRINCIPAL",
    "MANAGEMENT",
    "TEACHER",
    "ADMIN_STAFF",
    "SUPPORT_STAFF",
  ]),
  designation: z.string().max(200).optional().or(z.literal("")),
  department: z.string().max(100).optional().or(z.literal("")),
  qualification: z.string().max(300).optional().or(z.literal("")),
  bio: z.string().max(2000).optional().or(z.literal("")),
  imageUrl: z.string().url().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().max(20).optional().or(z.literal("")),
  joinedYear: z.number().int().min(1950).max(2100).optional().nullable(),
  sortOrder: z.number().int().default(0),
  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
});

export type StaffMemberInput = z.infer<typeof staffMemberSchema>;

export const facilitySchema = z.object({
  title: z.string().min(2).max(200),
  slug: z.string().min(2).max(200),
  description: z.string().max(2000).optional().or(z.literal("")),
  features: z.string().max(2000).optional().or(z.literal("")),
  imageUrl: z.string().url().optional().or(z.literal("")),
  iconName: z.string().max(50).optional().or(z.literal("")),
  sortOrder: z.number().int().default(0),
  isPublished: z.boolean().default(false),
});

export type FacilityInput = z.infer<typeof facilitySchema>;

export const galleryMediaSchema = z.object({
  title: z.string().max(200).optional().or(z.literal("")),
  description: z.string().max(500).optional().or(z.literal("")),
  imageUrl: z.string().url(),
  thumbnailUrl: z.string().url().optional().or(z.literal("")),
  categoryId: z.string().optional().or(z.literal("")),
  mediaType: z.string().default("image"),
  videoUrl: z.string().url().optional().or(z.literal("")),
  sortOrder: z.number().int().default(0),
  isPublished: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
});

export type GalleryMediaInput = z.infer<typeof galleryMediaSchema>;
