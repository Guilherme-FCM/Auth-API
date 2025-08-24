#!/bin/sh

# Start and Migrate Database
npm run db:create;
npm run db:migrate;

# Start Server
npm start;