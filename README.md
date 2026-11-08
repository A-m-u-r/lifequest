# LifeQuest

Монорепозиторий на pnpm и Turborepo. Требуется Node.js 20.19+ (ветка 20) или 22.12+. Менеджер пакетов — pnpm 10.34.9.

## Структура

- `apps/frontend` — Vite + React + TypeScript.
- `packages/ui` — общий UI-пакет с компонентом Button.
- `packages/eslint-config` — общие ESLint-конфиги из e-soft-final.
- `packages/typescript-config` — общие TypeScript-конфиги из e-soft-final.

Frontend: `src/app` (включая `layouts` и `providers`), `pages`, `widgets`,
`features`, `entities`, `shared`, `assets`; статические файлы — `public`.

## Запуск

```sh
pnpm install
pnpm dev
```

Frontend доступен на http://localhost:3001.

```sh
pnpm lint
pnpm check-types
pnpm build
```

Исходные общие конфиги: https://github.com/kyzne4ik/e-soft-final.
