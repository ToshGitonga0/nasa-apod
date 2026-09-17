# NASA APOD

A small, beautiful window into NASA's Astronomy Picture of the Day.

## Description

NASA APOD takes NASA's public Astronomy Picture of the Day (APOD) API and
turns it into a single, calm, image-first page: today's picture, its story,
and simple controls to step through history — or land somewhere at random.
This is a fun personal project, not a platform.

## Screenshot

_Add a screenshot here once you have one._

```
docs/screenshot.png
```

## Features

- Today's Astronomy Picture of the Day, image or video
- Previous / Next day navigation, with no travel into the future
- "Surprise Me" — jumps to a random valid date since APOD began (1995-06-16)
- Graceful loading and error states
- Responsive, image-first layout for desktop, tablet, and mobile
- Accessible: semantic HTML, keyboard navigation, visible focus states,
  reduced-motion support

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/) (strict mode)
- [Tailwind CSS](https://tailwindcss.com/)
- [Jest](https://jestjs.io/) + [ts-jest](https://kulshekhar.github.io/ts-jest/)

## NASA APOD API

This app calls NASA's official APOD endpoint server-side, from a Next.js
route handler (`app/api/apod/route.ts`), so the API key never reaches the
browser:

```
https://api.nasa.gov/planetary/apod
```

Learn more / get a free API key at <https://api.nasa.gov/>.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your own key:

```bash
cp .env.example .env.local
```

| Variable        | Description                                     | Default    |
| --------------- | ------------------------------------------------ | ---------- |
| `NASA_API_KEY`  | Your NASA API key (`DEMO_KEY` is rate-limited)    | `DEMO_KEY` |

## Local Development

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Available Commands

| Command            | Description                          |
| ------------------ | ------------------------------------- |
| `npm run dev`       | Start the local development server    |
| `npm run build`     | Create a production build             |
| `npm start`         | Run the production build              |
| `npm run lint`      | Run ESLint                            |
| `npm run typecheck` | Run the TypeScript compiler (no emit) |
| `npm test`          | Run the test suite                    |

## Project Structure

```
nasa-apod/
├── app/
│   ├── api/apod/route.ts   # Server-side NASA APOD proxy
│   ├── page.tsx            # The one page
│   ├── layout.tsx
│   ├── globals.css
│   └── home.css
├── components/
│   ├── ApodViewer.tsx / .module.css
│   ├── ApodImage.tsx / .module.css
│   ├── ApodDetails.tsx / .module.css
│   ├── ApodNavigation.tsx / .module.css
│   ├── ApodLoadingState.tsx / .module.css
│   └── ApodErrorState.tsx / .module.css
├── lib/
│   ├── nasa.ts              # Fetching + normalizing APOD responses
│   ├── dates.ts             # Calendar-date math, timezone-safe
│   └── types.ts             # ApodResponse and friends
└── __tests__/
```

## Versioning

This project follows [Semantic Versioning](https://semver.org/). The
current version is tracked in `package.json`.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

## Attribution

Imagery and content courtesy of NASA's Astronomy Picture of the Day
(<https://apod.nasa.gov/>). This project is not affiliated with or
endorsed by NASA.

## License

MIT — do whatever you like with it.
