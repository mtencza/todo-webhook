import { Router } from 'express';
import { EventProcessor } from '../services/eventProcessor';
import { webhookController } from '../controllers/webhookController';

export function createRoutes(eventProcessor: EventProcessor) {
  const router = Router();

  // Webhook route
  router.post('/webhook', webhookController(eventProcessor).webhookPost);

  return router;
}
