"use client";

import { useSyncExternalStore } from "react";

// Stable snapshot for the server prerender; the real year is read on the client.
const FALLBACK_YEAR = 2026;

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return new Date().getFullYear();
}

function getServerSnapshot() {
  return FALLBACK_YEAR;
}

/** Renders the current year without reading the clock during prerender. */
export function CurrentYear() {
  const year = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return <span>{year}</span>;
}
