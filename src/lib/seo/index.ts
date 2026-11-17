import { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface PageSEOProps {
  title: string;
  description?: string;
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
}

export function generatePageMeta({
  title,
  description,
  ogImage,
  canonical,
  noIndex = false,
}: PageSEOProps): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  const desc = description || siteConfig.description;

  return {
    title: fullTitle,
    description: desc,
    openGraph: {
      title: fullTitle,
      description: desc,
      url: canonical || siteConfig.url,
      siteName: siteConfig.name,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : [],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: ogImage ? [ogImage] : [],
    },
    alternates: {
      canonical: canonical || undefined,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function schoolStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "School",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Itahari-20, Tarahara",
      addressLocality: "Sunsari",
      addressRegion: "Koshi Province",
      addressCountry: "NP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.coordinates.lat,
      longitude: siteConfig.coordinates.lng,
    },
    foundingDate: siteConfig.establishedYear.toString(),
    sameAs: [siteConfig.facebook],
  };
}
