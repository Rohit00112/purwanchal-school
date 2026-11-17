"use client";

import * as React from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { cn } from "@/lib/utils";
import { images } from "@/config/images";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  alt: string;
  image: string;
}

const galleryItems: GalleryItem[] = [
  { id: "1", title: "Science laboratory", category: "Academics", alt: "Illustrative photograph of a science laboratory", image: images.scienceLab },
  { id: "2", title: "Sports ground", category: "Sports", alt: "Illustrative photograph of a sports ground", image: images.sports },
  { id: "3", title: "Classroom", category: "Classroom", alt: "Illustrative photograph of a classroom", image: images.heroClassroom },
  { id: "4", title: "Computer laboratory", category: "Academics", alt: "Illustrative photograph of a computer laboratory", image: images.computerLab },
  { id: "5", title: "Cultural performance", category: "Cultural", alt: "Illustrative photograph of a cultural performance", image: images.culture },
  { id: "6", title: "Athletics", category: "Sports", alt: "Illustrative photograph of an athletics track", image: images.athletics },
  { id: "7", title: "Microscope", category: "Academics", alt: "Illustrative photograph of a microscope", image: images.microscope },
  { id: "8", title: "Children learning", category: "Classroom", alt: "Illustrative photograph of children learning", image: images.children },
  { id: "9", title: "Library", category: "Campus", alt: "Illustrative photograph of a library", image: images.library },
];

const categories = ["All", "Academics", "Sports", "Classroom", "Cultural", "Campus"];

export function GalleryGrid() {
  const [category, setCategory] = React.useState("All");
  const [active, setActive] = React.useState<GalleryItem | null>(null);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const wasOpenRef = React.useRef(false);

  const filtered = React.useMemo(
    () => (category === "All" ? galleryItems : galleryItems.filter((item) => item.category === category)),
    [category]
  );

  const index = active ? filtered.findIndex((item) => item.id === active.id) : -1;

  const move = React.useCallback((direction: -1 | 1) => {
    if (index < 0 || filtered.length === 0) return;
    setActive(filtered[(index + direction + filtered.length) % filtered.length]);
  }, [index, filtered]);

  const open = (item: GalleryItem, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setActive(item);
  };

  React.useEffect(() => {
    if (active) {
      if (!wasOpenRef.current) {
        wasOpenRef.current = true;
        closeRef.current?.focus();
      }
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false;
      triggerRef.current?.focus();
    }
  }, [active]);

  React.useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setActive(null);
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        move(-1);
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        move(1);
        return;
      }
      if (event.key !== "Tab") return;

      const container = dialogRef.current;
      if (!container) return;
      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>("button, [href], [tabindex]:not([tabindex=\"-1\"])")
      ).filter((element) => !element.hasAttribute("disabled"));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, move]);

  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="shell">
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
              className={cn(
                "min-h-11 rounded-lg border px-4 py-2 text-sm font-bold",
                category === cat
                  ? "border-brand-600 bg-brand-600 text-white"
                  : "border-line bg-white text-ink-soft"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={(event) => open(item, event.currentTarget)}
              className="flex h-full flex-col rounded-lg border border-line bg-white text-left"
            >
              <span className="relative aspect-[4/3] w-full overflow-hidden rounded-t-lg img-fallback">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="img-cover object-center"
                />
                <span className="absolute left-3 top-3 rounded bg-white/95 px-2 py-1 text-xs font-extrabold uppercase tracking-[0.12em] text-brand-700">
                  {item.category}
                </span>
                <span className="absolute right-3 top-3 inline-flex size-9 items-center justify-center rounded bg-white/95 text-brand-900">
                  <Expand className="size-4" aria-hidden="true" />
                </span>
              </span>
              <span className="flex flex-1 flex-col p-4">
                <span className="block text-sm font-extrabold text-ink">{item.title}</span>
                <span className="mt-1 block text-xs text-ink-soft">Illustrative photograph</span>
              </span>
              <span className="sr-only">Open {item.title} in full screen</span>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Illustrative photograph viewer"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-950 p-4 sm:p-8"
          onClick={() => setActive(null)}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={(event) => { event.stopPropagation(); setActive(null); }}
            className="absolute right-5 top-5 z-10 inline-flex size-11 items-center justify-center rounded-lg bg-white/10 text-white"
            aria-label="Close image"
          >
            <X className="size-5" aria-hidden="true" />
          </button>

          {filtered.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => { event.stopPropagation(); move(-1); }}
                className="absolute left-3 z-10 inline-flex size-11 items-center justify-center rounded-lg bg-white/10 text-white sm:left-6"
                aria-label="Previous image"
              >
                <ChevronLeft className="size-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={(event) => { event.stopPropagation(); move(1); }}
                className="absolute right-3 z-10 inline-flex size-11 items-center justify-center rounded-lg bg-white/10 text-white sm:right-6"
                aria-label="Next image"
              >
                <ChevronRight className="size-6" aria-hidden="true" />
              </button>
            </>
          )}

          <figure className="relative z-[1] w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-brand-900">
              <Image src={active.image} alt={active.alt} fill sizes="90vw" className="img-cover object-contain" />
            </div>
            <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-2 text-white">
              <div>
                <p className="text-base font-extrabold sm:text-lg">{active.title}</p>
                <p className="mt-1 text-sm text-white/80">Illustrative photograph. Not an image of Purwanchal School.</p>
              </div>
              <span className="text-sm font-semibold text-sun-300">{index + 1} / {filtered.length}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
