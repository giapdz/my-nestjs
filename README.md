[![pipeline status](https://gitlab.com/giapdz104/my-nestjs/badges/master/pipeline.svg)](https://gitlab.com/giapdz104/my-nestjs/-/commits/master)

[![coverage report](https://gitlab.com/giapdz104/my-nestjs/badges/master/coverage.svg)](https://gitlab.com/giapdz104/my-nestjs/-/commits/master)

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## build Docker image

```bash
$ docker build -t registry.gitlab.com/giapdz104/my-nestjs .
```

## Running the app in Docker

```bash
# development
$ docker-compose up -d

```

## Test

```bash
# unit tests
$ docker-compose exec -T app npm run test

```
