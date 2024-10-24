import {Schema, model} from 'mongoose';
import {QuestionDoc} from '../types/question';

const QuestionSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  cycle: {
    type: Number,
    required: true,
  },
  cycleRuleId: {
    type: Schema.Types.ObjectId,
    ref: `CycleRule`,
    required: true,
  },
});

export const QuestionModel = model<QuestionDoc>(`Question`, QuestionSchema);
