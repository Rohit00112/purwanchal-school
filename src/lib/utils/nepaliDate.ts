import NepaliDate from "nepali-date-converter";

export const NEPALI_MONTHS = [
  { index: 0, name: "Baisakh", nameNepali: "बैशाख" },
  { index: 1, name: "Jestha", nameNepali: "जेठ" },
  { index: 2, name: "Ashadh", nameNepali: "असार" },
  { index: 3, name: "Shrawan", nameNepali: "श्रावण" },
  { index: 4, name: "Bhadra", nameNepali: "भाद्र" },
  { index: 5, name: "Ashwin", nameNepali: "असोज" },
  { index: 6, name: "Kartik", nameNepali: "कार्तिक" },
  { index: 7, name: "Mangsir", nameNepali: "मंसिर" },
  { index: 8, name: "Poush", nameNepali: "पुष" },
  { index: 9, name: "Magh", nameNepali: "माघ" },
  { index: 10, name: "Falgun", nameNepali: "फागुन" },
  { index: 11, name: "Chaitra", nameNepali: "चैत" },
];

export const NEPALI_DAYS = [
  { short: "Sun", nepali: "आइत" },
  { short: "Mon", nepali: "सोम" },
  { short: "Tue", nepali: "मंगल" },
  { short: "Wed", nepali: "बुध" },
  { short: "Thu", nepali: "बिही" },
  { short: "Fri", nepali: "शुक्र" },
  { short: "Sat", nepali: "शनि" },
];

export const NEPALI_NUMERALS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

export function toNepaliNumerals(num: number | string): string {
  return String(num).replace(/[0-9]/g, (digit) => NEPALI_NUMERALS[parseInt(digit, 10)]);
}

/**
 * Converts AD Date to Bikram Sambat (BS) date
 */
export function adToBs(dateInput: Date | string) {
  try {
    const jsDate = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    if (isNaN(jsDate.getTime())) {
      throw new Error("Invalid date");
    }

    const nepaliDate = new NepaliDate(jsDate);
    const year = nepaliDate.getYear();
    const month = nepaliDate.getMonth();
    const date = nepaliDate.getDate();
    const day = nepaliDate.getDay();

    const monthObj = NEPALI_MONTHS[month] || NEPALI_MONTHS[0];
    const dayObj = NEPALI_DAYS[day] || NEPALI_DAYS[0];

    const formatted = `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
    const formattedLong = `${year} ${monthObj.name} ${String(date).padStart(2, "0")}`;
    const formattedNepali = `${toNepaliNumerals(year)} ${monthObj.nameNepali} ${toNepaliNumerals(date)}, ${dayObj.nepali}बार`;

    return {
      year,
      month,
      date,
      day,
      formatted,
      formattedLong,
      formattedNepali,
      monthName: monthObj.name,
      monthNameNepali: monthObj.nameNepali,
    };
  } catch {
    const today = new NepaliDate();
    return {
      year: today.getYear(),
      month: today.getMonth(),
      date: today.getDate(),
      day: today.getDay(),
      formatted: today.format("YYYY-MM-DD"),
      formattedLong: `${today.getYear()} Baisakh 01`,
      formattedNepali: `${toNepaliNumerals(today.getYear())} बैशाख ०१`,
      monthName: "Baisakh",
      monthNameNepali: "बैशाख",
    };
  }
}

/**
 * Converts Bikram Sambat (BS) date to standard Gregorian AD Date string (YYYY-MM-DD)
 */
export function bsToAd(year: number, month: number, date: number): { jsDate: Date; formatted: string } {
  try {
    const nepaliDate = new NepaliDate(year, month, date);
    const jsDate = nepaliDate.toJsDate();
    const y = jsDate.getFullYear();
    const m = String(jsDate.getMonth() + 1).padStart(2, "0");
    const d = String(jsDate.getDate()).padStart(2, "0");
    return {
      jsDate,
      formatted: `${y}-${m}-${d}`,
    };
  } catch {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return {
      jsDate: now,
      formatted: `${y}-${m}-${d}`,
    };
  }
}

/**
 * Returns number of days in a given Nepali month
 */
export function getDaysInNepaliMonth(year: number, month: number): number {
  try {
    const d = new NepaliDate(year, month + 1, 0);
    return d.getDate();
  } catch {
    return 30;
  }
}

/**
 * Returns weekday index of first day of a Nepali month (0=Sun, 6=Sat)
 */
export function getFirstWeekdayOfNepaliMonth(year: number, month: number): number {
  try {
    const d = new NepaliDate(year, month, 1);
    return d.getDay();
  } catch {
    return 0;
  }
}
