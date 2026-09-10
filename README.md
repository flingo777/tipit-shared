# @tipit/shared

Client modules shared by the two tipit frontends:

- **`creatorsite`** (`github:flingo777/fanapp-creator`) → `creator-fanapp.vercel.app`
- **`fansite`** (`github:flingo777/fanapp-fan`) → `fan-fanapp.vercel.app`

These files were copy-pasted between the two repos through Phase 0. This package
is their single source of truth (ENGINEERING.md §7.6).

## What's in it

| Import | Purpose |
| ------ | ------- |
| `@tipit/shared/supabaseClient` | Supabase browser client + fee math (`platformFee`, `netAmount`, `PLATFORM_FEE_PCT`, `isSupabaseConfigured`). Reads `import.meta.env.VITE_SUPABASE_*` from the **consuming app**. |
| `@tipit/shared/format` | `inr`, `shortDate`, `relativeTime`, `initials` |
| `@tipit/shared/handles` | Handle validation + reserved-word list (`validateHandle`, `normalizeHandle`, `isPlausibleHandle`, `HANDLE_RE`, `RESERVED_HANDLES`) |
| `@tipit/shared/useGoogleFonts` | Injects the tipit font stack once |
| `@tipit/shared/AuthContext` | `AuthProvider` + `useAuth` — Supabase session, `signUp` / `signIn` / `signOut` |
| `@tipit/shared/ProtectedRoute` | Route guard — redirects to `/login` without a session |
| `@tipit/shared/styles/tipit.css` | Design tokens + primitives |
| `@tipit/shared/styles/dashboard.css` | Dashboard layout styles |

`fansite` also has `src/styles/fan.css` — that's fan-surface only and stays in
that repo (it isn't duplicated, so there's nothing to extract).

Ships **source**, not a build. The consuming Vite app transpiles the `.jsx` and
handles the CSS. React / react-dom / react-router-dom / supabase-js are
`peerDependencies`, resolved from the app so there's no duplicate React.

## Consuming it

```jsonc
// package.json in creatorsite / fansite
"dependencies": {
  "@tipit/shared": "github:flingo777/tipit-shared#v0.1.0"
}
```

Pin to a tag. To ship a change:

1. commit + push here
2. `git tag v0.1.x && git push --tags`
3. bump the ref in both consumers' `package.json`, `npm install`, commit the
   lockfile change

Branch refs (`#main`) also work but won't re-resolve without `npm update`.

## Local development against an unreleased change

```sh
# in tipit-shared
npm link
# in creatorsite (and fansite)
npm link @tipit/shared
```

Undo with `npm unlink @tipit/shared && npm install`.
