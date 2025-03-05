import { WebhookPayload, Todo } from '../models/todo';

export class EventProcessor {
  private todos: Map<string, Map<string, Todo>> = new Map();

  processWebHookEvent(payload: WebhookPayload) {
    // add to todos and process events
  }
}
