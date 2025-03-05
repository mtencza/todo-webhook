#!/bin/bash

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

curl -X POST http://localhost:3000/webhook \
     -H "Content-Type: application/json" \
     -d '{
  "event": "created",
  "timestamp": "2025-03-05T13:20:00Z",
  "metadata": {
    "userId": "user234",
    "id": "todo567",
    "content": "Complete project proposal2",
    "isCompleted": false
  }
}'

curl -X POST http://localhost:3000/webhook \
     -H "Content-Type: application/json" \
     -d '{
  "event": "deleted",
  "timestamp": "2025-03-05T13:20:00Z",
  "metadata": {
    "userId": "user234",
    "id": "todo567",
    "content": "Complete project proposal2",
    "isCompleted": false
  }
}'

curl -X POST http://localhost:3000/webhook \
     -H "Content-Type: application/json" \
     -d '{
  "event": "updated",
  "timestamp": "2025-03-05T13:21:00Z",
  "metadata": {
    "userId": "user123",
    "id": "todo456",
    "content": "Complete project proposal (revised)",
    "isCompleted": true
  }
}'
