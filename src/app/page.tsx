"use client";

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/datepicker-overrides.css"; // your custom styles

import { Header } from "@/components/Header";
import { calculateMilestones } from "@/utils/milestones";
import { getYear, getMonth, add, format } from "date-fns";

// Ten decade-blocks for 100 years: [1,10], [11,20]... [91,100]
const decadeBlocks = [
  [1, 10],
  [11, 20],
  [21, 30],
  [31, 40],
  [41, 50],
  [51, 60],
  [61, 70],
  [71, 80],
  [81, 90],
  [91, 100],
];

export default function Home() {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [milestones, setMilestones] = useState<Map<number, string[]>>(new Map());

  useEffect(() => {
    if (birthDate) {
      setMilestones(calculateMilestones(birthDate));
    }
  }, [birthDate]);

  /**
   * Custom year->month header. We hide the default heading via CSS
   * (.react-datepicker__current-month { display: none; }).
   */
  const renderCustomHeader = ({
    date,
    changeYear,
    changeMonth,
  }: {
    date: Date;
    changeYear: (year: number) => void;
    changeMonth: (month: number) => void;
  }) => {
    const currentYear = getYear(date);
    const currentMonth = getMonth(date);

    const years = Array.from({ length: 151 }, (_, i) => i + 1900); // 1900–2050
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];

    return (
      <div className="flex items-center justify-center gap-2 pb-2">
        {/* Year select */}
        <select
          className="py-1 px-2 border rounded text-gray-700"
          value={currentYear}
          onChange={(e) => changeYear(parseInt(e.target.value))}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        {/* Month select */}
        <select
          className="py-1 px-2 border rounded text-gray-700"
          value={currentMonth}
          onChange={(e) => changeMonth(parseInt(e.target.value))}
        >
          {months.map((m, i) => (
            <option key={m} value={i}>
              {m}
            </option>
          ))}
        </select>
      </div>
    );
  };

  /**
   * Renders one "decade block", e.g. years 1–10, 11–20, etc.
   * - A 2-column grid:
   *   1) Grey label (e.g. "10 years")
   *   2) 10×12 month grid (no row gap, small col gap).
   */
  const renderDecadeBlock = (decadeStart: number) => {
    if (!birthDate) return null;

    return (
      <div className="break-inside-avoid overflow-visible">
        {/* 2-column grid: label on left, 10×12 grid on the right */}
        <div className="grid grid-cols-[auto,1fr] items-start gap-2 overflow-visible">
          {/* Grey label (e.g. "10 years") */}
          <div className="text-gray-500 text-right w-13 pr-4">
            {decadeStart-1} years
          </div>

          {/* The 10-row × 12-col grid */}
          <div className="grid grid-rows-10 grid-cols-12 gap-x-1 gap-y-0 overflow-visible">
            {Array.from({ length: 10 }).map((_, yearIdx) => {
              const yearNumber = decadeStart + yearIdx;
              return Array.from({ length: 12 }).map((_, monthIdx) => {
                const indexMonths = (yearNumber - 1) * 12 + monthIdx;
                const cellDate = add(birthDate, { months: indexMonths });
                const dateLabel = format(cellDate, "MMM d, yyyy");
                const milestoneList = milestones.get(indexMonths) || [];
                const hasMilestone = milestoneList.length > 0;

                return (
                  <div
                    key={`${yearNumber}-${monthIdx}`}
                    className="relative group aspect-square overflow-visible"
                  >
                    <button
                      className={`
                        w-full h-full rounded-sm transition-colors
                        ${
                          hasMilestone
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-gray-100 hover:bg-gray-200"
                        }
                      `}
                      style={{ overflow: "visible" }}
                    >
                      {/* Tooltip */}
                      <div
                        className="
                          absolute hidden group-hover:block z-50
                          bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap
                          bottom-full mb-2 left-1/2 -translate-x-1/2
                        "
                        style={{ overflow: "visible" }}
                      >
                        <p className="font-semibold">{dateLabel}</p>
                        {hasMilestone && (
                          <ul className="mt-1">
                            {milestoneList.map((m, i) => (
                              <li key={i}>• {m}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </button>
                  </div>
                );
              });
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <main className="relative bg-white min-h-screen">
        {/* Background pattern */}
        <div
          className="fixed inset-0"
          style={{
            backgroundImage: "url('/assets/Clocks-Money-BG.png')",
            backgroundRepeat: "repeat",
            backgroundPosition: "left top",
            backgroundSize: "auto",
            zIndex: 0,
          }}
        />
        <div className="relative z-10 pt-28 pb-8 px-4 overflow-visible">
          <div className="w-full max-w-[1400px] mx-auto text-center overflow-visible">
            <h1 className="text-6xl mb-6 text-black font-light">
              Milestones
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Enter your birth date to see a timeline of interesting life events.
            </p>

            {/* Date picker (custom header, centered text) */}
            <div className="mb-16 inline-block">
              <DatePicker
                selected={birthDate}
                onChange={(date) => setBirthDate(date)}
                renderCustomHeader={renderCustomHeader}
                showMonthDropdown={false}
                showYearDropdown={false}
                dropdownMode="select"
                dateFormat="MMM d, yyyy"
                placeholderText="Select Year, Month, Day"
                maxDate={new Date()}
                className="
                  border-2 border-gray-300 rounded-md px-4 py-2
                  shadow-sm focus:outline-none focus:border-blue-500
                  focus:ring-1 focus:ring-blue-500 text-lg text-gray-700
                  text-center
                "
                popperClassName="border border-gray-200 rounded-md shadow-lg"
                popperPlacement="bottom-start"
              />
            </div>

            {birthDate && (
              <div className="mx-auto text-left overflow-visible">
                {/* Multi-column layout for decade blocks */}
                <div className="columns-1 md:columns-2 xl:columns-3 gap-8 overflow-visible">
                  {decadeBlocks.map(([decadeStart]) => (
                    <React.Fragment key={decadeStart}>
                      {renderDecadeBlock(decadeStart)}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
