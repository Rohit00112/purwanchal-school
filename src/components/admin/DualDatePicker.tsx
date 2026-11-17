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
  className?: string;
}

export function DualDatePicker({
  value,
  onChange,
  label = "Select Date (BS & AD)",
  required = false,
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
        <div className="absolute left-0 z-50 mt-1 w-full sm:w-[360px] rounded-2xl border border-line bg-white p-4 shadow-xl">
          {/* Header Controls: Tab Switcher & Today button */}
          <div className="flex items-center justify-between border-b border-line pb-3 mb-3">
            <div className="inline-flex rounded-lg bg-slate-100 p-0.5">
              <button
                type="button"
                onClick={() => setActiveTab("BS")}
                className={cn(
                  "rounded-md px-3 py-1 text-xs font-bold transition-all",
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
                  "rounded-md px-3 py-1 text-xs font-bold transition-all",
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
              className="text-[11px] font-bold text-brand-700 hover:underline"
            >
              आज / Today
            </button>
          </div>

          {/* BS Calendar Body */}
          {activeTab === "BS" ? (
            <div className="space-y-3">
              {/* Year & Month Selection Controls */}
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={prevBsMonth}
                  className="rounded p-1 text-slate-500 hover:bg-slate-100"
                  title="Previous Nepali Month"
                >
                  <ChevronLeft className="size-4" />
                </button>

                <div className="flex items-center gap-1.5">
                  <select
                    value={bsMonth}
                    onChange={(e) => setBsMonth(parseInt(e.target.value, 10))}
                    className="rounded border border-line bg-white px-2 py-1 text-xs font-bold text-ink focus:ring-1 focus:ring-brand-700"
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
                    className="rounded border border-line bg-white px-2 py-1 text-xs font-bold text-ink focus:ring-1 focus:ring-brand-700"
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
                  className="rounded p-1 text-slate-500 hover:bg-slate-100"
                  title="Next Nepali Month"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>

              {/* Day of Week Headers */}
              <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-500 border-b border-line pb-1.5">
                {NEPALI_DAYS.map((d, idx) => (
                  <div key={d.short} className={idx === 6 ? "text-red-600" : ""}>
                    <span>{d.nepali}</span>
                    <span className="block text-[9px] text-slate-400 font-normal">{d.short}</span>
                  </div>
                ))}
              </div>

              {/* Day Grid */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {/* Empty cells for leading days */}
                {Array.from({ length: firstWeekdayBs }).map((_, i) => (
                  <div key={`empty-bs-${i}`} className="p-1" />
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
                        "flex flex-col items-center justify-center rounded-lg p-1 transition-all h-9",
                        isSelected
                          ? "bg-brand-700 text-white font-bold shadow-xs scale-105"
                          : isSaturday
                          ? "text-red-600 hover:bg-red-50 font-semibold"
                          : "text-slate-800 hover:bg-slate-100"
                      )}
                    >
                      <span className="text-xs font-bold">{toNepaliNumerals(dayNum)}</span>
                      <span className={cn("text-[9px]", isSelected ? "text-white/80" : "text-slate-400")}>
                        {dayNum}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* AD Calendar Body */
            <div className="space-y-3">
              {/* Year & Month Selection Controls */}
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={prevAdMonth}
                  className="rounded p-1 text-slate-500 hover:bg-slate-100"
                  title="Previous AD Month"
                >
                  <ChevronLeft className="size-4" />
                </button>

                <div className="flex items-center gap-1.5">
                  <select
                    value={adMonth}
                    onChange={(e) => setAdMonth(parseInt(e.target.value, 10))}
                    className="rounded border border-line bg-white px-2 py-1 text-xs font-bold text-ink focus:ring-1 focus:ring-brand-700"
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
                    className="rounded border border-line bg-white px-2 py-1 text-xs font-bold text-ink focus:ring-1 focus:ring-brand-700"
                  >
                    {adYearOptions.map((yr) => (
                      <option key={yr} value={yr}>{yr}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={nextAdMonth}
                  className="rounded p-1 text-slate-500 hover:bg-slate-100"
                  title="Next AD Month"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>

              {/* Day of Week Headers */}
              <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-500 border-b border-line pb-1.5">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, idx) => (
                  <div key={d} className={idx === 6 ? "text-red-600" : ""}>
                    <span>{d}</span>
                  </div>
                ))}
              </div>

              {/* AD Day Grid */}
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {Array.from({ length: firstWeekdayAd }).map((_, i) => (
                  <div key={`empty-ad-${i}`} className="p-1" />
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
                        "flex items-center justify-center rounded-lg p-1 transition-all h-8 text-xs font-semibold",
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
          <div className="mt-4 pt-3 border-t border-line flex items-center justify-between text-[11px] text-slate-500">
            <span className="font-semibold text-brand-700">
              BS: {currentBsInfo.formattedNepali}
            </span>
            <span className="font-mono text-slate-600">
              AD: {value || "N/A"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
