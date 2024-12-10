# Part 12

Exercises 12.21 and 12.22 are [here](https://github.com/olsandy/phonebook-part12)

### Run in Docker

#### Build images

In `todo-app/`:

```bash
docker compose -f todo-frontend/docker-compose.dev.yml up
docker compose -f todo-backend/docker-compose.dev.yml up
docker compose -f todo-frontend/docker-compose.yml up
docker compose -f todo-backend/docker-compose.yml up
```

#### Development

In `todo-app/`:

```bash
docker compose -f docker-compose.dev.yml up
```

#### Production

In `todo-app/`:

```bash
docker compose -f docker-compose.yml up
```
