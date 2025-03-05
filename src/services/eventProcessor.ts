import { WebhookPayload, Todo } from '../models/todo';

export class EventProcessor {
  private todos: Map<string, Map<string, Todo>> = new Map();

  processWebHookEvent(payload: WebhookPayload) {
    const userId = payload.metadata.userId;
    const todoId = payload.metadata.id;
    const eventType = payload.event;

    this.updateTodoState(payload);
  }

  private updateTodoState(event: WebhookPayload) {
    const { userId, id } = event.metadata;
    const eventType = event.event;
    const userTodos = this.todos.get(userId) || new Map();

    console.log('Performing ', eventType, ' for userId: ', userId, ' id: ', id);

    switch (eventType) {
      case 'created':
        userTodos.set(id, {
          id: id,
          content: event.metadata.content,
          userId,
          createdAt: event.timestamp,
          updatedAt: event.timestamp,
          isCompleted: false,
          isDeleted: false,
        });
        break;
      case 'updated': {
        const existingTodo = userTodos.get(id);
        if (existingTodo) {
          userTodos.set(id, {
            ...existingTodo,
            content: event.metadata.content,
            isCompleted: event.metadata.isCompleted,
            updatedAt: event.timestamp,
            isDeleted: false,
          });
        }
        break;
      }
      case 'deleted': {
        const existingTodo = userTodos.get(id);
        userTodos.set(id, {
          ...existingTodo,
          isDeleted: true,
        });
        break;
      }
    }
    this.todos.set(userId, userTodos);
  }
}
