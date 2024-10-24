import {ConfigT, EnvConfig, Envs} from '../types/generic';
import {GetKeys} from './utils';
import * as dotenv from 'dotenv';

dotenv.config();
const configData: EnvConfig = {
  production: {
    DB_URL: process.env.PROD_DB_URL ?? ``,
    PORT: process.env.PROD_PORT ?? ``,
  },
  development: {
    DB_URL: process.env.DEV_DB_URL ?? ``,
    PORT: process.env.DEV_PORT ?? ``,
  },
  staging: {
    DB_URL: process.env.STAGING_DB_URL ?? ``,
    PORT: process.env.STAGING_PORT ?? ``,
  },
  testing: {
    DB_URL: process.env.TESTING_DB_URL ?? ``,
    PORT: process.env.TESTING_PORT ?? ``,
  },
};
function loadConfig(env: Envs): ConfigT {
  const config = configData[env];
  if (config === null || undefined) {
    throw new Error(`Config is missing`);
  }

  const configKeys = GetKeys(config);
  if (!config) {
    throw new Error(`Configuration for environment '${env}' not found`);
  }

  for (const field of configKeys) {
    if (!config[field] || config[field] === ``) {
      throw new Error(
        `Missing required field '${field}' in configuration for environment '${env}'`,
      );
    }
  }
  return config;
}

const environment: Envs = (process.env.NODE_ENV as Envs) ?? `development`; // Default to 'development' if NODE_ENV is not set
const Config = loadConfig(environment);

export default Config;
