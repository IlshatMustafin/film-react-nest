# FILM!

**Ссылка на задеплоенное приложение:** https://film-afisha-dev.duckdns.org/

## О проекте

Веб-сервис киноафиши и онлайн-бронирования билетов (NestJS + React/Vite + PostgreSQL).

## Стек технологий

* **Frontend:** React, TypeScript, Vite, Nginx
* **Backend:** NestJS, TypeORM, PostgreSQL
* **Инфраструктура и CI/CD:** Docker, Docker Compose, GitHub Actions, GitHub Container Registry (`ghcr.io`), Yandex Cloud, Let's Encrypt

## Запуск проекта локально

1. Создайте файл `.env` в корне проекта на основе `.env.example`:
   ```bash
   cp .env.example .env
   ```
2. Запустите сборку и контейнеры:
   ```bash
   docker compose up -d --build
   ```
3. Приложение будет доступно по адресу `http://localhost`, pgAdmin — по адресу `http://localhost:5050`.
