import express from 'express';
import { EventProcessor } from './services/eventProcessor';
import { ReportGenerator } from './services/reportGenerator';
import { createRoutes } from './routes/routes';

export function createApp(
  eventProcessor: EventProcessor,
  reportGenerator: ReportGenerator
) {
  const app = express();
  app.use(express.json());
  app.use('/', createRoutes(eventProcessor));

  // scheduling for generating reports and maybe cleanup

  return app;
}
