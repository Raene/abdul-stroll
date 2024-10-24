import {GetCurrentCycle} from '../helpers/utils';
import {CycleRuleModel} from '../models/cycleRule.model';
import {QuestionModel} from '../models/question.model';
import * as QuestionHandler from './question.handler';

export const GetQuestion = QuestionHandler.GetQuestion({
  CycleRuleModel,
  GetCurrentCycle,
  QuestionModel,
});
