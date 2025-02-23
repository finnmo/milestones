// utils/milestones.ts

import { add, differenceInMonths, format, Duration } from "date-fns";

/**
 * Calculates a set of numeric time-based milestones:
 * e.g. 1,000 seconds alive, 10,000 minutes alive, 1,000 days alive, etc.
 * Returns a Map whose keys are "months since birth" 
 * and whose values are arrays of milestone strings (label + date).
 */
export const calculateMilestones = (birthDate: Date): Map<number, string[]> => {
  const milestones = new Map<number, string[]>();

  //
  // SECONDS
  //
  addTimeBasedMilestone(milestones, birthDate, { seconds: 1000 },           "1,000 seconds alive");
  addTimeBasedMilestone(milestones, birthDate, { seconds: 1337 },           "1,337 seconds alive");
  addTimeBasedMilestone(milestones, birthDate, { seconds: 10000 },          "10,000 seconds alive");
  addTimeBasedMilestone(milestones, birthDate, { seconds: 99999 },          "99,999 seconds alive");
  addTimeBasedMilestone(milestones, birthDate, { seconds: 100000 },         "100,000 seconds alive");
  // A fun "mini-pi" number
  addTimeBasedMilestone(milestones, birthDate, { seconds: 314159 },         "314,159 seconds alive (~π × 100,000)");
  addTimeBasedMilestone(milestones, birthDate, { seconds: 1000000 },        "1,000,000 seconds alive");
  addTimeBasedMilestone(milestones, birthDate, { seconds: 1234567 },        "1,234,567 seconds alive");
  // Approx. e × 1,000,000
  addTimeBasedMilestone(milestones, birthDate, { seconds: 2718281 },        "2,718,281 seconds alive (~e × 1,000,000)");
  addTimeBasedMilestone(milestones, birthDate, { seconds: 3141592 },        "3,141,592 seconds alive (π × 1,000,000)");
  addTimeBasedMilestone(milestones, birthDate, { seconds: 10000000 },       "10,000,000 seconds alive");
  addTimeBasedMilestone(milestones, birthDate, { seconds: 1000000000 },     "1,000,000,000 seconds alive");
  addTimeBasedMilestone(milestones, birthDate, { seconds: 2000000000 },     "2,000,000,000 seconds alive (~63.4 years)");
  // 2^31 = 2,147,483,647
  addTimeBasedMilestone(milestones, birthDate, { seconds: 2147483647 },     "2,147,483,647 seconds alive (2^31, ~68 years)");

  //
  // MINUTES
  //
  addTimeBasedMilestone(milestones, birthDate, { minutes: 1000 },           "1,000 minutes alive");
  addTimeBasedMilestone(milestones, birthDate, { minutes: 10000 },          "10,000 minutes alive");
  addTimeBasedMilestone(milestones, birthDate, { minutes: 12345 },          "12,345 minutes alive");
  addTimeBasedMilestone(milestones, birthDate, { minutes: 100000 },         "100,000 minutes alive");
  addTimeBasedMilestone(milestones, birthDate, { minutes: 123456 },         "123,456 minutes alive");
  addTimeBasedMilestone(milestones, birthDate, { minutes: 1000000 },        "1,000,000 minutes alive");

  //
  // HOURS
  //
  addTimeBasedMilestone(milestones, birthDate, { hours: 1000 },             "1,000 hours alive");
  addTimeBasedMilestone(milestones, birthDate, { hours: 10000 },            "10,000 hours alive");
  // ~11.4 years
  addTimeBasedMilestone(milestones, birthDate, { hours: 100000 },           "100,000 hours alive (~11.4 years)");
  addTimeBasedMilestone(milestones, birthDate, { hours: 1000000 },          "1,000,000 hours alive");

  //
  // DAYS
  //
  // 42 is the "Answer to the Ultimate Question of Life, the Universe, and Everything"
  addTimeBasedMilestone(milestones, birthDate, { days: 42 },                "42 days alive (the answer!)");
  
  addTimeBasedMilestone(milestones, birthDate, { days: 365 },               "1 year alive (365 days)");
  addTimeBasedMilestone(milestones, birthDate, { days: 365 * 2 },           "2 years alive (730 days)");
  addTimeBasedMilestone(milestones, birthDate, { days: 1000 },              "1,000 days alive");
  addTimeBasedMilestone(milestones, birthDate, { days: 365 * 3 },           "3 years alive (1,095 days)");
  addTimeBasedMilestone(milestones, birthDate, { days: 1111 },              "1,111 days alive (a unique number!)");
  addTimeBasedMilestone(milestones, birthDate, { days: 365 * 4 },           "4 years alive (1,460 days)");
  // Including an extra day for leap-year references
  addTimeBasedMilestone(milestones, birthDate, { days: 1461 },              "4 years alive (including leap year)");
  addTimeBasedMilestone(milestones, birthDate, { days: 365 * 5 },           "5 years alive (1,825 days)");
  addTimeBasedMilestone(milestones, birthDate, { days: 1826 },              "5 years alive (1,826 days)");
  
  addTimeBasedMilestone(milestones, birthDate, { days: 2222 },              "2,222 days alive");
  addTimeBasedMilestone(milestones, birthDate, { days: 3333 },              "3,333 days alive");
  addTimeBasedMilestone(milestones, birthDate, { days: 4444 },              "4,444 days alive");
  addTimeBasedMilestone(milestones, birthDate, { days: 5000 },              "5,000 days alive");
  addTimeBasedMilestone(milestones, birthDate, { days: 3650 },              "10 years alive (3,650 days)");
  addTimeBasedMilestone(milestones, birthDate, { days: 7300 },              "20 years alive (7,300 days)");
  addTimeBasedMilestone(milestones, birthDate, { days: 10000 },             "10,000 days alive");
  addTimeBasedMilestone(milestones, birthDate, { days: 10950 },             "30 years alive (10,950 days)");
  addTimeBasedMilestone(milestones, birthDate, { days: 12345 },             "12,345 days alive");
  addTimeBasedMilestone(milestones, birthDate, { days: 20000 },             "20,000 days alive");
  // Newly added bigger day counts
  addTimeBasedMilestone(milestones, birthDate, { days: 30000 },             "30,000 days alive (~82.19 years)");
  addTimeBasedMilestone(milestones, birthDate, { days: 50000 },             "50,000 days alive (~136.98 years)");
  addTimeBasedMilestone(milestones, birthDate, { days: 100000 },            "100,000 days alive (~273.9 years)");
  addTimeBasedMilestone(milestones, birthDate, { days: 123456 },            "123,456 days alive (~338.7 years)");

  //
  // WEEKS
  //
  addTimeBasedMilestone(milestones, birthDate, { weeks: 100 },              "100 weeks alive");
  addTimeBasedMilestone(milestones, birthDate, { weeks: 500 },              "500 weeks alive");
  addTimeBasedMilestone(milestones, birthDate, { weeks: 1000 },             "1,000 weeks alive");

  //
  // YEARS
  //
  addTimeBasedMilestone(milestones, birthDate, { years: 1 },                "1 year alive");
  addTimeBasedMilestone(milestones, birthDate, { years: 5 },                "5 years alive");
  addTimeBasedMilestone(milestones, birthDate, { years: 10 },               "10 years alive");
  addTimeBasedMilestone(milestones, birthDate, { years: 18 },               "18 years alive (legal age in many places)");
  addTimeBasedMilestone(milestones, birthDate, { years: 21 },               "21 years alive (US drinking age)");
  addTimeBasedMilestone(milestones, birthDate, { years: 30 },               "30 years alive");
  // Another nod to 42
  addTimeBasedMilestone(milestones, birthDate, { years: 42 },               "42 years alive (the answer!)");
  addTimeBasedMilestone(milestones, birthDate, { years: 50 },               "50 years alive (half a century)");
  // Newly added year-based milestones
  addTimeBasedMilestone(milestones, birthDate, { years: 65 },               "65 years alive (common retirement age)");
  addTimeBasedMilestone(milestones, birthDate, { years: 75 },               "75 years alive (three-quarters of a century)");
  addTimeBasedMilestone(milestones, birthDate, { years: 90 },               "90 years alive (nonagenarian milestone)");
  
  addTimeBasedMilestone(milestones, birthDate, { years: 100 },              "100 years alive (centenarian)");
  addTimeBasedMilestone(milestones, birthDate, { years: 150 },              "150 years alive (a century and a half)");
  addTimeBasedMilestone(milestones, birthDate, { years: 200 },              "200 years alive (two centuries)");

  return milestones;
};

/**
 * Helper to add a single time-based milestone to the map, keyed by
 * the difference in months from the birth date. If the milestone date
 * is before the birth date (edge case), it is ignored.
 */
function addTimeBasedMilestone(
  map: Map<number, string[]>,
  birthDate: Date,
  duration: Duration,
  label: string
) {
  const targetDate = add(birthDate, duration);
  const indexMonths = differenceInMonths(targetDate, birthDate);

  // Ignore if the target date is somehow before birth (edge case)
  if (indexMonths < 0) return;

  const dateStr = format(targetDate, "MMM d, yyyy");
  const existing = map.get(indexMonths) || [];
  map.set(indexMonths, [...existing, `${label} (${dateStr})`]);
}
