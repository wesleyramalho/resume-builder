# @mypdfcv/ui

Design system for MyPDFCV — reusable primitives built on [@base-ui/react](https://base-ui.com/) with Tailwind v4 styling, documented with Storybook.

## Scripts

```bash
npm run storybook        # dev server at :6006
npm run build-storybook  # static build to ./storybook-static
npm run build            # build the package with tsup
```

## Phase 1 components

- `Button` — 6 variants × 8 sizes
- `Badge` — 6 variants
- `Separator` — horizontal or vertical

## Adding a component

1. `packages/ui/src/components/<Name>/<Name>.tsx` — component + JSDoc.
2. `packages/ui/src/components/<Name>/<Name>.stories.tsx` — stories for each variant.
3. `packages/ui/src/components/<Name>/index.ts` — barrel.
4. Re-export from `packages/ui/src/index.ts`.
