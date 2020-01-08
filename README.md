# Definitions API

> An API for developer terms, topics, and questions

[dev-terms-api.herokuapp.com](https://dev-terms-api.herokuapp.com)

# API Endpoints

## Authentication

Authentication is only required for write actions.

`POST` requests require `Authorization: Bearer github_access_token`

`GET /auth/login`

`POST /auth/token`  requires `code` in body

`GET /auth/validate` Requires `Authorization: Bearer github_access_token`

## Terms

`GET /terms`
```
[
  {
    "id": 1,
    "name": "Abstraction"
  },
  ...
]
```

`GET /terms/1`
```
{
  "id": 1,
  "name": "Abstraction"
}
```

`GET /terms/1/topics`
```
[
  {
    "id": 13,
    "name": "Design Patterns"
  },
  ...
]
```

## Topics

`GET /topics`
```
[
  {
    "id": 1,
    "name": "AJAX"
  },
  ...
]
```

`GET /topics/1`
```
{
  "id": 1,
  "name": "AJAX"
}
```

`GET /topics/1/terms`
```
[
  {
    "id": 1,
    "name": "Abstraction"
  },
  ...
]
```

## Questions

`GET /questions`
```
[
  {
    "id": 1,
    "title": "What is the difference between Git and Github?",
    "answer": "Git is a Source Control system while Github is a hosting platform for Git repositories. Github has features like Forks, Pull Requests, and Issues."
  },
  ...
]
```

`GET /questions/1`
```
{
  "id": 1,
  "title": "What is the difference between Git and Github?",
  "answer": "Git is a Source Control system while Github is a hosting platform for Git repositories. Github has features like Forks, Pull Requests, and Issues."
}
```

`GET /questions/1/terms`
```
[
  {
    "id": 10,
    "name": "Github"
  },
  ...
]
```

`GET /questions/1/topics`
```
[
  {
    "id": 10,
    "name": "Git & Github"
  },
  ...
]
```

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

## Hosting: Heroku

Deployed URLs:
- [dev-terms-api.herokuapp.com](https://dev-terms-api.herokuapp.com)
- [music-terms-api.herokuapp.com](https://music-terms-api.herokuapp.com)

```
npm run deploy:dev-terms
npm run deploy:music-terms
```

Aliased to heroku remotes (e.g. `git push heroku master`)


# Backup

A backup will save all tables from the `production` environment

```
npm run backup
```

Files output to `backups/*.json`
