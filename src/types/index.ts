import { UserRole, PublicationStatus, InquiryStatus, MessageStatus, StaffRole, ProgramLevel } from "@prisma/client";

export type { UserRole, PublicationStatus, InquiryStatus, MessageStatus, StaffRole, ProgramLevel };

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface PageMeta {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface DashboardStats {
  totalInquiries: number;
  newInquiries: number;
  unreadMessages: number;
  publishedNews: number;
  upcomingEvents: number;
  totalGalleryImages: number;
  totalStaff: number;
}
