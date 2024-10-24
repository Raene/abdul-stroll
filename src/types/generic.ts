export type DBTimeLogs = {
  createdAt?: Date;
  updatedAt?: Date;
};

export type ConfigT = {
  DB_URL: string;
  PORT: string;
};

export type Envs = `production` | `development` | `staging` | `testing`;

export type EnvConfig = {
  [key in Envs]: ConfigT;
};
