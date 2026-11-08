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

## Storybook

Из корня проекта:

```sh
pnpm storybook
```

Открыть http://localhost:6006. Истории компонентов хранятся рядом с ними
в файлах `*.stories.tsx` (lowercase/kebab-case). Документация и controls
генерируются автоматически.

```sh
pnpm build-storybook
```

Статическая сборка: `packages/ui/storybook-static`.
