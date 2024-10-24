import {Request, Response} from 'express';
import {CycleRuleDoc} from '../types/cycleRule';
import {Model} from 'mongoose';
import {GetQuestionBody, QuestionDoc} from '../types/question';
import {GetCurrentCycleT, SendJSONResponse} from '../helpers/utils';
export function GetQuestion(deps: {
  CycleRuleModel: Model<CycleRuleDoc>;
  QuestionModel: Model<QuestionDoc>;
  GetCurrentCycle: GetCurrentCycleT;
}) {
  const {CycleRuleModel, QuestionModel, GetCurrentCycle} = deps;
  return async function (req: Request, res: Response): Promise<void> {
    //get the user locale from the request body
    try {
      const {region} = req.query as GetQuestionBody;
      //get the cycle rule based on the region
      const cycleRule = await CycleRuleModel.findOne({region}).lean();

      if (!cycleRule) {
        return SendJSONResponse(res, 404, {message: `Cycle rule not found`});
      }

      //then get the current cycle number based on the cycle rule
      const cycleNumber = GetCurrentCycle(
        cycleRule.startDate,
        cycleRule.cycleDurationInSeconds,
      );

      //if cycle numbwe is lesser than zero return 404
      if (cycleNumber < 0) {
        return SendJSONResponse(res, 404, {message: `Question not found`});
      }

      //then get the question based on the cycle number
      const questions = await QuestionModel.find({
        cycle: cycleNumber,
        cycleRuleId: cycleRule._id,
      }).lean();

      if (!questions || questions.length === 0) {
        return SendJSONResponse(res, 404, {message: `Question not found`});
      }

      //then return the question
      return SendJSONResponse(res, 200, {data: questions});
    } catch (error) {
      console.error(`Get Question`, error);
      return SendJSONResponse(res, 500, {message: `Internal Server Error`});
    }
  };
}

//seed multiple questions for different regions
