import { AppConfig } from '../config/appConfig';
import { EventProcessor } from './eventProcessor';

export class ReportGenerator {
  private eventProcessor: EventProcessor;
  private config: AppConfig;

  constructor(eventProcessor: EventProcessor, config: AppConfig) {
    this.eventProcessor = eventProcessor;
    this.config = config;
  }

  async generateReports(): Promise<Report[]> {
    // for every user - generateReport(userId)
  }

  async generateReport(userId: string): Promise<Report> {}
}
