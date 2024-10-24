import {DBTimeLogs} from './generic';

export type CycleRule = {
  region: regionT;
  cycleDurationInSeconds: number; // Duration in seconds
  startDate: Date;
};

export type regionT = `en-${string}` | `zh-${string}`;

export type CycleRuleDoc = CycleRule & {
  _id: string;
} & DBTimeLogs;
