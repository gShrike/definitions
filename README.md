# Definitions API

> An API for technical terms and their definitions

# Dev Setup

- `npm install`
- `createdb definitions`
- `knex migrate:latest`
- `knex seed:run`

To support Auth, add `.env` with the keys from a Github App:

```
GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx
```

The Github App will need `read:org` scope.

# Running

- `nodemon`
- `npm start`

Runs on `http://localhost:3001`


# Deployment

Setup your local `.env` file with the `DATABASE_URL` from Heroku, then run:

```
npm run migrate:production
npm run seed:production
npm run deploy
```

`deploy` is a shorthand for `git push heroku master`, so you must have the Heroku app connected locally.
