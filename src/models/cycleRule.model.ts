import {Schema, model} from 'mongoose';
import {CycleRuleDoc} from '../types/cycleRule';
import {options} from './options';

const CycleRuleSchema = new Schema(
  {
    region: {
      type: String,
      required: true,
    },
    cycleDurationInSeconds: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
  },
  options,
);

export const CycleRuleModel = model<CycleRuleDoc>(`CycleRule`, CycleRuleSchema);
