/* eslint-disable n/no-process-exit */
import conn from '../models/conn';
// eslint-disable-next-line n/no-unpublished-import
import {fakerDE as faker} from '@faker-js/faker';
import {CycleRuleModel} from '../models/cycleRule.model';
import {Question} from '../types/question';
import {QuestionModel} from '../models/question.model';

async function main(cycle: number) {
  //seed questions
  await conn;

  const cycleRules = await CycleRuleModel.find().lean();
  if (cycleRules.length === 0) {
    console.log(
      `Please run the script to seed cycle rules first before running this script`,
    );
    return;
  }

  const questions: Question[] = [];

  for (let i = 0; i < cycleRules.length; i++) {
    const cycleRule = cycleRules[i];
    if (!cycleRule) {
      break;
    }

    const question: Question = {
      cycle,
      text: faker.lorem.sentence(),
      cycleRuleId: cycleRule._id,
    };
    questions.push(question);
  }

  await QuestionModel.insertMany(questions);
  console.log(`${questions.length} questions created`);
  process.exit(0);
}

main(0)
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await conn.destroy();
  });
