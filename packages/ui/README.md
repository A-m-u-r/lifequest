# UI-кит

Базовая структура соответствует `packages/ui/src` в e-soft-final:

```text
src/
  atoms/
    button/
      button.tsx
      index.ts
  molecules/
  organisms/
  layouts/
  hooks/
  hocs/
  libs/
  tokens.css
```

- `atoms`, `molecules`, `organisms` — компоненты по Atomic Design.
- `layouts` — переиспользуемые компоненты раскладки.
- `hooks` — общие React-хуки.
- `hocs` — компоненты высшего порядка.
- `libs` — вспомогательные функции.
- `tokens.css` — место для общих дизайн-токенов.

Имена файлов и папок — в нижнем регистре, kebab-case. Каждый компонент
или модуль хранится в отдельной папке с `index.ts` для экспорта.
Публичные импорты соответствуют категориям:

```tsx
import { Button } from "@repo/ui/atoms/button";
```

Бизнес-логика и страницы приложения находятся в `apps/frontend`.

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
