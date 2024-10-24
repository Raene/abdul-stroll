import './models/conn';
import express, {Express} from 'express';
import Routes from './routes';
import Config from './helpers/config';
import cluster from 'cluster';
import os from 'os';

const cors = require(`cors`);
const numCPUs = os.cpus().length;
const port = Config.PORT;

if (cluster.isPrimary) {
  console.log(`Primary process running with PID: ${process.pid}`);

  console.log(`Number of CPUs: ${numCPUs}`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Restart a worker if it crashes
  cluster.on(`exit`, (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  // Workers create their own instance of the Express app
  const app: Express = express();

  app.use(
    cors({
      origin: `*`,
    }),
  );
  app.use(express.json());

  app.use(`/question`, Routes.QuestionRouter);

  app.listen(port, () => {
    console.log(
      `[Worker ${process.pid}]: Server is running at http://localhost:${port}`,
    );
  });
}
