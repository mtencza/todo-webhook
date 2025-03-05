import express from 'express';
import { EventProcessor } from './services/eventProcessor';
import { ReportGenerator } from './services/reportGenerator';
import { createRoutes } from './routes/routes';
import * as schedule from 'node-schedule';
import { defaultConfig, getScheduleFromInterval } from './config/appConfig';
import fs from 'node:fs/promises';

export function createApp(
  eventProcessor: EventProcessor,
  reportGenerator: ReportGenerator
) {
  const app = express();
  app.use(express.json());
  app.use('/', createRoutes(eventProcessor));

  // Generate reports at interval & Clean up memory
  schedule.scheduleJob(
    getScheduleFromInterval(defaultConfig.reportInterval),
    async () => {
      console.log('Generating reports');
      const reports = await reportGenerator.generateReports();

      const now = new Date();
      // Write to local txt file
      fs.writeFile(
        './report' + now.toISOString() + '.txt',
        JSON.stringify(reports, null, 2)
      );

      // get rid of previously deleted events
      //eventProcessor.cleanupOldDeletedTasks(defaultConfig.eventRetention);
    }
  );

  return app;
}
