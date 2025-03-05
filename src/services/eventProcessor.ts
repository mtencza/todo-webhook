import { WebhookPayload, Todo } from '../models/todo';

export class EventProcessor {
  private todos: Map<string, Map<string, Todo>> = new Map();

  processWebHookEvent(payload: WebhookPayload) {
    const userId = payload.metadata.userId;
    const todoId = payload.metadata.id;
    const eventType = payload.event;

    // if userId/todoId doesn't exist for update/delete
    if (
      (eventType === 'updated' || eventType === 'deleted') &&
      !this.containsTodoId(userId, todoId)
    ) {
      throw new Error('Todo does not exist');
    }

    // can't delete an already deletd todo
    if (this.isTodoDeleted(userId, todoId)) {
      throw new Error('Todo does not exist');
    }

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

  private isTodoDeleted(userId: string, todoId: string): boolean {
    const userTodos = this.todos.get(userId);
    if (!userTodos) {
      return false;
    }
    const todo = userTodos.get(todoId);
    return todo.isDeleted;
  }

  private containsTodoId(userId: string, todoId: string): boolean {
    const userTodos = this.todos.get(userId);
    if (!userTodos) {
      return false;
    }
    for (const id of userTodos.keys()) {
      if (id === todoId) {
        return true;
      }
    }
    return false;
  }

  cleanUpOldDeletedTasks() {
    // periodically clean up deleted tasks past some retention period
  }
}
