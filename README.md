# Crone Frontend
Сайт строительной компании.
Next.js (App Router) проект для переноса существующей HTML/SCSS-верстки и Wordpress на современный стек. Данные берутся из WordPress (GraphQL/REST).

[Ссылка](https://crone-group.ru/)


## Стек

- Next.js 16+ (App Router), React 19+, TypeScript (strict)
- Tailwind CSS 4 + SCSS Modules
- Zustand, TanStack Query (React Query), nuqs
- React Hook Form + Zod
- Axios (инстанс с базовым URL и интерцепторами)

## Запуск локально

```bash
npm run dev
```

Открыть: http://localhost:3000

## Скрипты

- `npm run dev` — dev сервер
- `npm run build` — production build
- `npm run start` — запуск production сервера
- `npm run lint` — ESLint
- `npm run codegen` — генерация типов GraphQL

## GraphQL Codegen

Команда:

```bash
npm run codegen
```

Что делает:

- Берёт GraphQL schema из `NEXT_PUBLIC_API_URL` (см. [codegen.ts](./codegen.ts)).
- Читает документы из `src/graphql/**/*.graphql`.
- Генерирует типы и React Query хелперы в `src/graphql/generated.ts`.

Важно:

- Перед запуском убедиться, что `NEXT_PUBLIC_API_URL` указывает на GraphQL endpoint.

## Переменные окружения

### Публичные (попадают в клиент, начинаются с NEXT_PUBLIC_)

- `NEXT_PUBLIC_SITE_URL` — базовый URL сайта (нужен для canonical/OG/JSON-LD, sitemap/robots)
- `NEXT_PUBLIC_GRAPHQL_API_URL` — endpoint GraphQL
- `NEXT_PUBLIC_API_URL` — WP REST base
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` — ключ Google Maps (обязательно ограничить по HTTP referrer)
- `NEXT_PUBLIC_GOOGLE_MAPS_ID` — Map ID
- `NEXT_PUBLIC_LIGHT_GALLERY_LICENSE_KEY` — license key LightGallery (если используется)
- `NEXT_PUBLIC_YM_ID` — ID Яндекс.Метрики

Значения `NEXT_PUBLIC_*` вшиваются в клиентский бандл на этапе `next build`. При сборке
образа в CI они берутся из GitHub Secrets, а env приложения в Dokploy на них уже не влияет.

### Рантайм-переменные (читаются на сервере при каждом запросе)

- `YANDEX_SMARTCAPTCHA_SITE_KEY` — site key SmartCaptcha (`ysc1_...`), отдаётся клиенту через
  `GET /api/public-config`. Задаётся в env приложения, а не при сборке, поэтому один образ
  работает в любом окружении. Legacy-фолбэк на `NEXT_PUBLIC_YANDEX_SMARTCAPTCHA_SITE_KEY`
  сохранён для совместимости.

### Серверные (не должны попадать в клиент)

- `CONTACT_FORM_7_ID` — ID формы CF7 (используется на сервере/route handler)
- `YANDEX_SMARTCAPTCHA_SERVER_KEY` — серверный ключ SmartCaptcha (`ysc2_...`), парный к
  `YANDEX_SMARTCAPTCHA_SITE_KEY`; используется для валидации токена в `/api/contact`
- `YANDEX_SMARTCAPTCHA_SKIP_IP` — диагностический флаг. `1` перестаёт передавать IP клиента
  в `/validate`. Нужен, когда за обратным прокси IP не совпадает с тем, что решал капчу

### Диагностика капчи

`/api/contact` пишет в stdout/stderr строки с префиксом `[contact]`: `validate_ok`,
`validate_rejected` (с сырым ответом Яндекса), `validate_unreachable`, `server_key_missing`,
`token_missing`, `cf7_rejected`, `cf7_bad_response`, `cf7_redirect`. Персональные данные из
формы в логи не попадают.

`NEXT_PUBLIC_API_URL` должна указывать на домен WordPress **без редиректа** (сейчас это
`https://api.crone-group.ru/wp-json/wp/v2`). При обращении к `crone-group.ru/wp-json` отдаётся
`308` на api-домен, а undici не умеет переотправлять `FormData` после редиректа — запрос
уходит с пустым телом, и CF7 отвечает `wpcf7_unit_tag_not_found`. Такой случай теперь
явно виден в логах как `cf7_redirect`.

## SEO

- `GET /sitemap.xml` — генерируется автоматически (App Router `sitemap.ts`)
- `GET /robots.txt` — генерируется автоматически (App Router `robots.ts`)
- Проекты `/project/[slug]` включают canonical, OpenGraph/Twitter и JSON-LD (WebPage + BreadcrumbList)

## Деплой (Docker Hub → Dokploy)

Репозиторий содержит workflow GitHub Actions, который:
1) собирает Docker image и пушит в Docker Hub
2) триггерит деплой в Dokploy через webhook (или через API при наличии ключа)

Нужные GitHub Secrets:

- Docker Hub:
  - `DOCKERHUB_USERNAME`
  - `DOCKERHUB_TOKEN`
  - `DOCKERHUB_REPOSITORY` (опционально)
- Build args (NEXT_PUBLIC_*):
  - `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GRAPHQL_API_URL`, `NEXT_PUBLIC_API_URL`, и т.д.
- Dokploy:
  - `DOKPLOY_WEBHOOK_URL` (предпочтительно)
  - или `DOKPLOY_URL`, `DOKPLOY_API_KEY`, `DOKPLOY_APPLICATION_ID`
