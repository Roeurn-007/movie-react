# Roeurn React Project

A beginner-friendly React project built with **Create React App**.

This project is mainly for learning and practicing React component basics:
- Functional components (`Greet`, `Hello`)
- Class component (`Welcome`)
- Passing props (example: `name`)
- Rendering multiple components in `App.js`

## Project Structure

```text
src/
  components/
    Greet.js
    Hello.js
    Welcome.js
  App.js
  index.js
```

## Requirements

- Node.js 18+ (recommended)
- npm (comes with Node.js)

## How to Run on Your Computer

1. Clone the repository:

```bash
git clone <your-repo-url>
```

2. Open the project folder:

```bash
cd roeurn-react
```

3. Install dependencies:

```bash
npm install
```

4. Start development server:

```bash
npm start
```

5. Open browser:

```text
http://localhost:3000
```

## Available Scripts

- `npm start` - run in development mode
- `npm run build` - create production build in `build/`
- `npm test` - run tests

## What This Project Does

When the app runs, it renders greeting messages from the `Greet` component using different names passed as props from `App.js`.

This makes it a simple React learning project focused on understanding component structure and props.

## Build for Production

```bash
npm run build
```

The optimized output will be in the `build/` folder.

## Deploy on Vercel

1. Push this project to GitHub.
2. Sign in to [Vercel](https://vercel.com).
3. Click **Add New -> Project** and import your GitHub repo.
4. Vercel auto-detects Create React App.
5. Deploy.

### Recommended Vercel settings

- Build command: `npm run build`
- Output directory: `build`

## Notes

- This project currently does not require any `.env` variables.
- You can extend it by adding routing, styling improvements, and API integration.
