import { AppConfig } from '../config/appConfig';
import { EventProcessor } from './eventProcessor';
import { Report } from '../models/report';
import { Todo } from '../models/todo';

export class ReportGenerator {
  private eventProcessor: EventProcessor;
  private config: AppConfig;

  constructor(eventProcessor: EventProcessor, config: AppConfig) {
    this.eventProcessor = eventProcessor;
    this.config = config;
  }

  async generateReports(): Promise<Report[]> {
    const userIds = this.eventProcessor.getAllUsers();
    const reportPromises = userIds.map((userId) => this.generateReport(userId));
    return Promise.all(reportPromises);
  }

  async generateReport(userId: string): Promise<Report> {
    try {
      const todos = this.eventProcessor.getTodosForUser(userId);
      const now = new Date();
      const periodStart = this.calculatePeriodStart(now);

      console.log(
        `Generating report for user ${userId} in period ${periodStart.toISOString()} ${now.toISOString()}`
      );

      const report = {
        userId,
        period: {
          start: periodStart.toISOString(),
          end: now.toISOString(),
        },
        newIncompleteTasks: this.getNewIncompleteTasks(todos, periodStart),
        completedTasks: this.getCompletedTasks(todos, periodStart),
        oldIncompleteTasks: this.getOldIncompleteTasks(todos, periodStart),
      };

      console.log('Successfully generated report');

      return report;
    } catch (e) {
      console.error('Error generating report:', e);
      throw e;
    }
  }

  private calculatePeriodStart(now: Date): Date {
    const periodStart = new Date(now);
    if (this.config.reportInterval === 'hourly') {
      periodStart.setHours(periodStart.getHours() - 1);
    } else {
      periodStart.setDate(periodStart.getDate() - 1);
    }
    return periodStart;
  }

  private getNewIncompleteTasks(
    todos: Todo[],
    periodStart: Date
  ): Report['newIncompleteTasks'] {
    const newIncompleteTasks = todos
      .filter(
        (todo) =>
          !todo.isDeleted &&
          !todo.isCompleted &&
          new Date(todo.createdAt) >= periodStart
      )
      .map((todo) => ({
        id: todo.id,
        content: todo.content,
        createdAt: todo.createdAt,
      }));

    return newIncompleteTasks;
  }

  private getCompletedTasks(
    todos: Todo[],
    periodStart: Date
  ): Report['completedTasks'] {
    console.log('periodStart ', periodStart);
    const completedTasks = todos
      .filter(
        (todo) => todo.isCompleted && new Date(todo.updatedAt) >= periodStart
      )
      .map((todo) => ({
        id: todo.id,
        content: todo.content,
        completedAt: todo.updatedAt,
      }));

    return completedTasks;
  }

  private getOldIncompleteTasks(
    todos: Todo[],
    periodStart: Date
  ): Report['oldIncompleteTasks'] {
    const oldIncompleteTasks = todos
      .filter(
        (todo) =>
          !todo.isDeleted &&
          !todo.isCompleted &&
          new Date(todo.createdAt) < periodStart
      )
      .map((todo) => ({
        id: todo.id,
        content: todo.content,
        createdAt: todo.createdAt,
      }));

    return oldIncompleteTasks;
  }
}
