import {Response} from 'express';
export function GetKeys<T extends Object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

export type GetCurrentCycleT = (
  startDate: Date,
  cycleDuration: number,
) => number;
export function GetCurrentCycle(
  startDate: Date,
  cycleDuration: number,
): number {
  const now = new Date();

  const timeElapsed = Math.floor((now.getTime() - startDate.getTime()) / 1000); // Time elapsed in seconds

  return Math.floor(timeElapsed / cycleDuration); // Current cycle number
}

export const SendJSONResponse = (
  res: Response,
  status: number,
  content: unknown,
) => {
  res.status(status);
  res.json(content);
  res.end();
};
