export type CountdownUnitType = "days" | "hours" | "minutes";

export interface CountdownTranslations {
  heading: string;
  daysLabel: string;
  hoursLabel: string;
  minutesLabel: string;
}

export interface CountdownTimeLeft {
  days: number;
  hours: number;
  minutes: number;
}
