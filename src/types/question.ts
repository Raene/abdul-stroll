import {regionT} from './cycleRule';
import {DBTimeLogs} from './generic';

export type Question = {
  text: string;
  cycle: number; // Cycle number this question belongs to
  cycleRuleId: string; // Rule for this cycle
};

export type QuestionDoc = Question &
  DBTimeLogs & {
    _id: string;
  };

export type GetQuestionBody = {
  region: regionT;
};
