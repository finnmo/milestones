// utils/milestones.ts

import { add, differenceInMonths, format, Duration } from "date-fns";

/**
 * Calculates a set of numeric time-based milestones:
 * e.g. 1,000 seconds alive, 10,000 minutes alive, 1,000 days alive, etc.
 * Returns a Map whose keys are "months since birth" 
 * and whose values are arrays of milestone strings.
 */
export const calculateMilestones = (birthDate: Date): Map<number, string[]> => {
  const milestones = new Map<number, string[]>();

  // Some fun intervals in seconds, minutes, hours, days, weeks, etc.
  // Feel free to adjust or add more as you like.
  addTimeBasedMilestone(milestones, birthDate, { seconds: 1000 }, "1,000 seconds alive");
  addTimeBasedMilestone(milestones, birthDate, { seconds: 10000 }, "10,000 seconds alive");
  addTimeBasedMilestone(milestones, birthDate, { seconds: 100000 }, "100,000 seconds alive");
  addTimeBasedMilestone(milestones, birthDate, { seconds: 1000000 }, "1,000,000 seconds alive");
  addTimeBasedMilestone(milestones, birthDate, { seconds: 10000000 }, "10,000,000 seconds alive");
  
  // Minutes
  addTimeBasedMilestone(milestones, birthDate, { minutes: 1000 }, "1,000 minutes alive");
  addTimeBasedMilestone(milestones, birthDate, { minutes: 10000 }, "10,000 minutes alive");
  addTimeBasedMilestone(milestones, birthDate, { minutes: 100000 }, "100,000 minutes alive");
  addTimeBasedMilestone(milestones, birthDate, { minutes: 1000000 }, "1,000,000 minutes alive");

  // Hours
  addTimeBasedMilestone(milestones, birthDate, { hours: 1000 }, "1,000 hours alive");
  addTimeBasedMilestone(milestones, birthDate, { hours: 10000 }, "10,000 hours alive");

  // Days
  addTimeBasedMilestone(milestones, birthDate, { days: 1000 }, "1,000 days alive");
  addTimeBasedMilestone(milestones, birthDate, { days: 5000 }, "5,000 days alive");
  addTimeBasedMilestone(milestones, birthDate, { days: 10000 }, "10,000 days alive");
  addTimeBasedMilestone(milestones, birthDate, { days: 20000 }, "20,000 days alive");

  // Weeks
  addTimeBasedMilestone(milestones, birthDate, { weeks: 100 }, "100 weeks alive");
  addTimeBasedMilestone(milestones, birthDate, { weeks: 500 }, "500 weeks alive");
  addTimeBasedMilestone(milestones, birthDate, { weeks: 1000 }, "1,000 weeks alive");

  addTimeBasedMilestone(milestones, birthDate, { seconds: 1337 }, "1,337 seconds alive");
  addTimeBasedMilestone(milestones, birthDate, { minutes: 12345 }, "12,345 minutes alive");
  addTimeBasedMilestone(milestones, birthDate, { seconds: 99999 }, "99,999 seconds alive");
  addTimeBasedMilestone(milestones, birthDate, { minutes: 123456 }, "123,456 minutes alive");
  addTimeBasedMilestone(milestones, birthDate, { seconds: 1234567 }, "1,234,567 seconds alive");
  addTimeBasedMilestone(milestones, birthDate, { seconds: 3141592 }, "3,141,592 (π) seconds alive");


  // Big seconds
addTimeBasedMilestone(milestones, birthDate, { seconds: 1_000_000 }, "1,000,000 seconds alive");
addTimeBasedMilestone(milestones, birthDate, { seconds: 10_000_000 }, "10,000,000 seconds alive");
addTimeBasedMilestone(milestones, birthDate, { seconds: 1_000_000_000 }, "1,000,000,000 seconds alive");

// Big minutes
addTimeBasedMilestone(milestones, birthDate, { minutes: 1_000_000 }, "1,000,000 minutes alive");

// Big hours
addTimeBasedMilestone(milestones, birthDate, { hours: 1_000_000 }, "1,000,000 hours alive");


  return milestones;
};

/**
 * Adds a time-based milestone. E.g.:
 *   addTimeBasedMilestone(m, birthDate, { seconds: 10000 }, "10,000 seconds alive")
 */
function addTimeBasedMilestone(
  map: Map<number, string[]>,
  birthDate: Date,
  duration: Duration,
  label: string
) {
  const targetDate = add(birthDate, duration);
  const indexMonths = differenceInMonths(targetDate, birthDate);

  // Ignore if the target date is before birth (edge case)
  if (indexMonths < 0) return;

  const dateStr = format(targetDate, "MMM d, yyyy");
  const existing = map.get(indexMonths) || [];
  map.set(indexMonths, [...existing, `${label} (${dateStr})`]);
}
