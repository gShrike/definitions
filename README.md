# Definitions API

> An API for developer terms, topics, and questions

[terms-api.galvanize.network](https://terms-api.galvanize.network)

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

## Database: Heroku

Setup your local `.env` file with the `DATABASE_URL` from Heroku, then run:

```
npm run migrate:production
npm run seed:production
```

## Hosting: Now

Deployed URL: [terms-api.galvanize.network](https://terms-api.galvanize.network)

```
now
now -e DATABASE_URL=@definitions-database-url GITHUB_CLIENT_ID=@definitions-github-client GITHUB_CLIENT_SECRET=@definitions-github-secret
now alias domain terms-api.galvanize.network
```
