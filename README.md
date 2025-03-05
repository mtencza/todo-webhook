# todo-webhook

A webhook handler service that processes todo events from an external service and generates periodic task summary reports per user.

## Prereqs
- Node
- npm
- docker

## Usage
To initialize the project locally run `npm install` in the repo directory

- `npm run start` to start the server on localhost port 3000
- `npm run docker:build` to build the docker image
- `npm run docker:run` to start the docker container and run the server from there

## Expected payload
```
interface WebhookPayload {
  event: 'created' | 'updated' | 'deleted';
  timestamp: string; // ISO 8601 timestamp of when the event occurred in the external service. 
  metadata: {
    userId: string;
    id: string;
    content: string;
    isCompleted: boolean;
  };
}
```

Ex.
```
curl -X POST http://localhost:3000/webhook \
     -H "Content-Type: application/json" \
     -d '{
  "event": "created",
  "timestamp": "2025-03-05T13:20:00Z",
  "metadata": {
    "userId": "user123",
    "id": "todo456",
    "content": "Complete project proposal",
    "isCompleted": false
  }
}'
```

## Report generation
Report generation is configured by `minute` , `hourly`, or `daily`
Modify the `reportInterval` of `defaultConfig` object in `src/config/appConfig.ts` to change the report generation frequency.

Reports are saved as text files in format `report{curDate}.txt`.

Reports generate a list of completed, new incomplete, and old incomplete tasks, based on inbound todo events in the last report interval period. 
