# Instructions

## Installation

_**Pre-requisites**: [Node.js](https://nodejs.org) (preferably current LTS version, v12.16.3), [NPM](https://npmjs.com)
(typically comes with [Node.js](https://nodejs.org), Development has been done with v6.14.4)_

```bash
npm i                    # Install dependencies
cp .env.example .env     # Copy and edit environment variables
```

Compile and run

```bash
npm run build
npm start
```

## Commands

```bash
npm i                    # Install dependencies
npm start                # Start application
npm run build            # Build application
npm run test             # Run Unit tests
npm run lint             # Lint code
cp .env.example .env     # Copy and edit environment variables
```

## Env Vars

-MIN_DISTANCE_TRIP: distance in M that a vehicle has to move in order to be considered a trip
-SLEEP_TIME: time between API calls
-MONGO_URI: database url (if using docker-compose remove this, since its pased over the docker compose)
-DATA_PROVIDER: url to search vehicle info
-DATA_PROVIDER_ACCESS_TOKEN: authentication to required by data provider (dont put the word bearer)
