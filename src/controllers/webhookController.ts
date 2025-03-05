import { Request, Response } from 'express';
import { EventProcessor } from '../services/eventProcessor';
import { WebhookPayload } from '../models/todo';

export function webhookController(eventProcessor: EventProcessor) {
  return {
    webhookPost: async (req: Request, res: Response) => {
      try {
        //validate input payload
        // if(payload invalid ) {res.status(400)}
        const payload: WebhookPayload = req.body;

        eventProcessor.processWebhookEvent(payload);
        res.status(200).json({ status: 'success' });
        return;
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.error(error);
        return;
      }
    },
  };
}
