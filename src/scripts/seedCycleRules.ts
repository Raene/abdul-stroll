/* eslint-disable n/no-process-exit */
import conn from '../models/conn';
import {CycleRuleModel} from '../models/cycleRule.model';
import {CycleRule, regionT} from '../types/cycleRule';

async function main() {
  await conn;

  //loop and create 3 new rules
  const rules: CycleRule[] = [];

  const regions: regionT[] = [`en-US`, `en-UK`, `en-SG`];
  const seconds = [86400, 60, 604800];

  for (let i = 0; i < 3; i++) {
    const rule: CycleRule = {
      startDate: new Date(`2024-10-23`),
      cycleDurationInSeconds: seconds[i],
      region: regions[i],
    };
    rules.push(rule);
  }
  await CycleRuleModel.insertMany(rules);
  console.log(`Inserted ${rules.length} rules`);
  process.exit(0);
}

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await conn.destroy();
  });
