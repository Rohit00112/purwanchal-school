"use client";

import * as React from "react";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Check, 
  Clock, 
  ArrowRightLeft 
} from "lucide-react";
import { 
  NEPALI_MONTHS, 
  NEPALI_DAYS, 
  toNepaliNumerals, 
  adToBs, 
  bsToAd, 
  getDaysInNepaliMonth, 
  getFirstWeekdayOfNepaliMonth 
} from "@/lib/utils/nepaliDate";
import { cn } from "@/lib/utils";

interface DualDatePickerProps {
  value?: string; // Standard AD date string: YYYY-MM-DD
  onChange: (adDate: string, bsDate?: string) => void;
  label?: string;
  required?: boolean;
  align?: "left" | "right";
  className?: string;
}

export function DualDatePicker({
  value,
  onChange,
  label = "Select Date (BS & AD)",
  required = false,
  align = "left",
  className,
}: DualDatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"BS" | "AD">("BS");
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Parse initial or current value (AD YYYY-MM-DD)
  const initialAd = React.useMemo(() => {
    if (value && !isNaN(new Date(value).getTime())) {
      const d = new Date(value);
      return {
        year: d.getFullYear(),
        month: d.getMonth(),
        date: d.getDate(),
      };
    }
    const today = new Date();
    return {
      year: today.getFullYear(),
      month: today.getMonth(),
      date: today.getDate(),
    };
  }, [value]);

  // Current view state for BS
  const initialBs = React.useMemo(() => {
    return adToBs(value || new Date());
  }, [value]);

  const [bsYear, setBsYear] = React.useState<number>(initialBs.year);
  const [bsMonth, setBsMonth] = React.useState<number>(initialBs.month);
  const [bsDate, setBsDate] = React.useState<number>(initialBs.date);

  // Current view state for AD
  const [adYear, setAdYear] = React.useState<number>(initialAd.year);
  const [adMonth, setAdMonth] = React.useState<number>(initialAd.month);
  const [adDate, setAdDate] = React.useState<number>(initialAd.date);

  // Sync internal state when external value changes
  React.useEffect(() => {
    if (value) {
      const bsInfo = adToBs(value);
      setBsYear(bsInfo.year);
      setBsMonth(bsInfo.month);
      setBsDate(bsInfo.date);

      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        setAdYear(d.getFullYear());
        setAdMonth(d.getMonth());
        setAdDate(d.getDate());
      }
    }
  }, [value]);

  // Close calendar popover on outside click
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Computed summary for display
  const currentBsInfo = React.useMemo(() => {
    return adToBs(value || new Date());
  }, [value]);

  // Generate Year Options
  const bsYearOptions = Array.from({ length: 25 }, (_, i) => 2070 + i);
  const adYearOptions = Array.from({ length: 25 }, (_, i) => 2015 + i);

  // Days calculations for BS Calendar
  const daysInCurrentBsMonth = getDaysInNepaliMonth(bsYear, bsMonth);
  const firstWeekdayBs = getFirstWeekdayOfNepaliMonth(bsYear, bsMonth);

  // Days calculations for AD Calendar
  const daysInCurrentAdMonth = new Date(adYear, adMonth + 1, 0).getDate();
  const firstWeekdayAd = new Date(adYear, adMonth, 1).getDay();

  // Handlers for BS Navigation
  const prevBsMonth = () => {
    if (bsMonth === 0) {
      setBsYear((prev) => prev - 1);
      setBsMonth(11);
    } else {
      setBsMonth((prev) => prev - 1);
    }
  };

  const nextBsMonth = () => {
    if (bsMonth === 11) {
      setBsYear((prev) => prev + 1);
      setBsMonth(0);
    } else {
      setBsMonth((prev) => prev + 1);
    }
  };

  const handleSelectBsDay = (dayNum: number) => {
    setBsDate(dayNum);
    const result = bsToAd(bsYear, bsMonth, dayNum);
    onChange(result.formatted, `${bsYear}-${String(bsMonth + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`);
    setIsOpen(false);
  };

  // Handlers for AD Navigation
  const prevAdMonth = () => {
    if (adMonth === 0) {
      setAdYear((prev) => prev - 1);
      setAdMonth(11);
    } else {
      setAdMonth((prev) => prev - 1);
    }
  };

  const nextAdMonth = () => {
    if (adMonth === 11) {
      setAdYear((prev) => prev + 1);
      setAdMonth(0);
    } else {
      setAdMonth((prev) => prev + 1);
    }
  };

  const handleSelectAdDay = (dayNum: number) => {
    setAdDate(dayNum);
    const m = String(adMonth + 1).padStart(2, "0");
    const d = String(dayNum).padStart(2, "0");
    const adStr = `${adYear}-${m}-${d}`;
    const bsInfo = adToBs(adStr);
    onChange(adStr, bsInfo.formatted);
    setIsOpen(false);
  };

  const handleSetToday = () => {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    const adStr = `${y}-${m}-${d}`;
    const bsInfo = adToBs(today);
    onChange(adStr, bsInfo.formatted);
    setBsYear(bsInfo.year);
    setBsMonth(bsInfo.month);
    setBsDate(bsInfo.date);
    setAdYear(y);
    setAdMonth(today.getMonth());
    setAdDate(today.getDate());
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={cn("relative space-y-1.5", className)}>
      {label && (
        <label className="font-bold text-slate-700 block text-xs">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Interactive Display Button Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between rounded-lg border border-line bg-white p-2.5 text-xs text-left shadow-2xs hover:border-brand-500 focus:outline-hidden focus:ring-2 focus:ring-brand-700 transition-all"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand-700">
            <CalendarIcon className="size-4" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 truncate">
                {currentBsInfo.formattedNepali}
              </span>
              <span className="rounded bg-sun-50 border border-sun-200 px-1.5 py-0.2 text-[10px] font-bold text-sun-700 shrink-0">
                BS
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mt-0.5">
              <span>AD:</span>
              <span className="font-mono text-slate-700">{value || "Not selected"}</span>
              <span className="text-slate-300">·</span>
              <span className="truncate">{currentBsInfo.formattedLong}</span>
            </div>
          </div>
        </div>

        <div className="shrink-0 text-slate-400 pl-2">
          <ArrowRightLeft className="size-3.5" />
        </div>
      </button>

      {/* Popover Calendar Dropdown */}
      {isOpen && (
        <div
          className={cn(
            "absolute z-[70] mt-1.5 w-[320px] max-w-[calc(100vw-36px)] rounded-2xl border border-line bg-white p-3.5 shadow-2xl transition-all",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          {/* Header Controls: Tab Switcher & Today button */}
          <div className="flex items-center justify-between border-b border-line pb-2.5 mb-2.5 gap-2">
            <div className="inline-flex rounded-lg bg-slate-100 p-0.5 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab("BS")}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-bold transition-all",
                  activeTab === "BS"
                    ? "bg-brand-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-ink"
                )}
              >
                नेपाली पात्रो (BS)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("AD")}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-bold transition-all",
                  activeTab === "AD"
                    ? "bg-brand-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-ink"
                )}
              >
                English (AD)
              </button>
            </div>

            <button
              type="button"
              onClick={handleSetToday}
              className="text-[11px] font-bold text-brand-700 hover:underline shrink-0 whitespace-nowrap px-1"
            >
              आज / Today
            </button>
          </div>

          {/* BS Calendar Body */}
          {activeTab === "BS" ? (
            <div className="space-y-2.5">
              {/* Year & Month Selection Controls */}
              <div className="flex items-center justify-between gap-1">
                <button
                  type="button"
                  onClick={prevBsMonth}
                  className="rounded p-1 text-slate-500 hover:bg-slate-100 shrink-0"
                  title="Previous Nepali Month"
                >
                  <ChevronLeft className="size-4" />
                </button>

                <div className="flex items-center gap-1.5 min-w-0">
                  <select
                    value={bsMonth}
                    onChange={(e) => setBsMonth(parseInt(e.target.value, 10))}
                    className="rounded border border-line bg-white px-2 py-1 text-xs font-bold text-ink focus:ring-1 focus:ring-brand-700 max-w-[130px] truncate"
                  >
                    {NEPALI_MONTHS.map((m) => (
                      <option key={m.index} value={m.index}>
                        {m.nameNepali} ({m.name})
                      </option>
                    ))}
                  </select>

                  <select
                    value={bsYear}
                    onChange={(e) => setBsYear(parseInt(e.target.value, 10))}
                    className="rounded border border-line bg-white px-1.5 py-1 text-xs font-bold text-ink focus:ring-1 focus:ring-brand-700 shrink-0"
                  >
                    {bsYearOptions.map((yr) => (
                      <option key={yr} value={yr}>
                        {toNepaliNumerals(yr)} ({yr})
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={nextBsMonth}
                  className="rounded p-1 text-slate-500 hover:bg-slate-100 shrink-0"
                  title="Next Nepali Month"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>

              {/* Day of Week Headers */}
              <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-500 border-b border-line pb-1">
                {NEPALI_DAYS.map((d, idx) => (
                  <div key={d.short} className={idx === 6 ? "text-red-600" : ""}>
                    <span>{d.nepali}</span>
                    <span className="block text-[8px] text-slate-400 font-normal">{d.short}</span>
                  </div>
                ))}
              </div>

              {/* Day Grid */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {/* Empty cells for leading days */}
                {Array.from({ length: firstWeekdayBs }).map((_, i) => (
                  <div key={`empty-bs-${i}`} className="h-8" />
                ))}

                {/* Real Days of BS Month */}
                {Array.from({ length: daysInCurrentBsMonth }, (_, i) => i + 1).map((dayNum) => {
                  const isSelected =
                    bsYear === currentBsInfo.year &&
                    bsMonth === currentBsInfo.month &&
                    dayNum === currentBsInfo.date;

                  const isSaturday = (firstWeekdayBs + dayNum - 1) % 7 === 6;

                  return (
                    <button
                      key={`bs-day-${dayNum}`}
                      type="button"
                      onClick={() => handleSelectBsDay(dayNum)}
                      className={cn(
                        "flex flex-col items-center justify-center rounded-lg p-0.5 transition-all h-8",
                        isSelected
                          ? "bg-brand-700 text-white font-bold shadow-xs scale-105"
                          : isSaturday
                          ? "text-red-600 hover:bg-red-50 font-semibold"
                          : "text-slate-800 hover:bg-slate-100"
                      )}
                    >
                      <span className="text-[11px] font-bold leading-none">{toNepaliNumerals(dayNum)}</span>
                      <span className={cn("text-[8px] leading-none mt-0.5", isSelected ? "text-white/80" : "text-slate-400")}>
                        {dayNum}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* AD Calendar Body */
            <div className="space-y-2.5">
              {/* Year & Month Selection Controls */}
              <div className="flex items-center justify-between gap-1">
                <button
                  type="button"
                  onClick={prevAdMonth}
                  className="rounded p-1 text-slate-500 hover:bg-slate-100 shrink-0"
                  title="Previous AD Month"
                >
                  <ChevronLeft className="size-4" />
                </button>

                <div className="flex items-center gap-1.5 min-w-0">
                  <select
                    value={adMonth}
                    onChange={(e) => setAdMonth(parseInt(e.target.value, 10))}
                    className="rounded border border-line bg-white px-2 py-1 text-xs font-bold text-ink focus:ring-1 focus:ring-brand-700 max-w-[130px] truncate"
                  >
                    {[
                      "January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"
                    ].map((monthName, idx) => (
                      <option key={monthName} value={idx}>{monthName}</option>
                    ))}
                  </select>

                  <select
                    value={adYear}
                    onChange={(e) => setAdYear(parseInt(e.target.value, 10))}
                    className="rounded border border-line bg-white px-1.5 py-1 text-xs font-bold text-ink focus:ring-1 focus:ring-brand-700 shrink-0"
                  >
                    {adYearOptions.map((yr) => (
                      <option key={yr} value={yr}>{yr}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={nextAdMonth}
                  className="rounded p-1 text-slate-500 hover:bg-slate-100 shrink-0"
                  title="Next AD Month"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>

              {/* Day of Week Headers */}
              <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-500 border-b border-line pb-1">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, idx) => (
                  <div key={d} className={idx === 6 ? "text-red-600" : ""}>
                    <span>{d}</span>
                  </div>
                ))}
              </div>

              {/* AD Day Grid */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {Array.from({ length: firstWeekdayAd }).map((_, i) => (
                  <div key={`empty-ad-${i}`} className="h-8" />
                ))}

                {Array.from({ length: daysInCurrentAdMonth }, (_, i) => i + 1).map((dayNum) => {
                  const isSelected =
                    adYear === initialAd.year &&
                    adMonth === initialAd.month &&
                    dayNum === initialAd.date;

                  const isSaturday = (firstWeekdayAd + dayNum - 1) % 7 === 6;

                  return (
                    <button
                      key={`ad-day-${dayNum}`}
                      type="button"
                      onClick={() => handleSelectAdDay(dayNum)}
                      className={cn(
                        "flex items-center justify-center rounded-lg p-0.5 transition-all h-8 text-xs font-semibold",
                        isSelected
                          ? "bg-brand-700 text-white font-bold shadow-xs scale-105"
                          : isSaturday
                          ? "text-red-600 hover:bg-red-50 font-bold"
                          : "text-slate-800 hover:bg-slate-100"
                      )}
                    >
                      {dayNum}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Footer Conversion Helper Badge */}
          <div className="mt-3 pt-2.5 border-t border-line flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-[11px] text-slate-500">
            <div className="flex items-center gap-1 min-w-0">
              <span className="text-slate-400 font-medium shrink-0">BS:</span>
              <span className="font-semibold text-brand-700 truncate">{currentBsInfo.formattedNepali}</span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[10px] text-slate-600 shrink-0">
              <span className="text-slate-400 font-sans">AD:</span>
              <span>{value || "N/A"}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
