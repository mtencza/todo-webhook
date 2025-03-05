import { Request, Response } from 'express';
import { EventProcessor } from '../services/eventProcessor';
import { WebhookPayload } from '../models/todo';

function isWebhookPayload(payload: any): payload is WebhookPayload {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    typeof payload.event === 'string' &&
    ['created', 'updated', 'deleted'].includes(payload.event) &&
    typeof payload.timestamp === 'string' &&
    typeof payload.metadata === 'object' &&
    payload.metadata !== null &&
    typeof payload.metadata.userId === 'string' &&
    typeof payload.metadata.id === 'string' &&
    typeof payload.metadata.content === 'string' &&
    typeof payload.metadata.isCompleted === 'boolean'
  );
}
export function webhookController(eventProcessor: EventProcessor) {
  return {
    webhookPost: async (req: Request, res: Response) => {
      try {
        if (!isWebhookPayload(req.body)) {
          res.status(400).json({ error: 'Invalid payload' });
          return;
        }
        const payload: WebhookPayload = req.body;

        eventProcessor.processWebHookEvent(payload);
        res.status(200).json({ status: 'success' });
        return;
      } catch (error) {
        if (error.message === 'Todo does not exist') {
          res.status(400).json({ error: 'Todo does not exist' });
        } else {
          res.status(500).json({ error: 'Internal server error' });
        }
        console.error(error);
        return;
      }
    },
  };
}
