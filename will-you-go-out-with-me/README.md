# For You 💕

A mobile-first, single-flow "will you go out with me" mini-site. Five screens,
each unlocking the next: an envelope to open, a handwritten letter, a swipeable
carousel of reasons/memories, a short anticipation beat, and finally the
question itself with a runaway "No" button and a confetti-filled "Yes".

Plain HTML, CSS, and vanilla JavaScript — no build step, no framework, no
backend. Open `index.html` in a browser, or serve the folder statically.

## Project structure

```
index.html        Markup for all 5 screens
css/main.css       Palette, fonts, layout, and all animations
js/app.js          Screen state machine + all interactivity
public/assets/     Photos used in the memories carousel
public/manifest.json
public/favicon.svg
```

## Customize before sending

Everything you'd want to personalize is marked `EDIT ME` in `js/app.js`:

- `MESSAGE_LINES` — the letter text on screen 2
- `MEMORIES` — the reasons/memories carousel (text + photo per card)
- `DATE_TEXT` — the day mentioned in the question
- `YES_MESSAGE` — shown after she taps Yes
- `DECLINE_MESSAGE` — auto-copied to the clipboard if she taps/gives up on No

## Run locally

Just open `index.html`, or serve it so relative paths behave the same as
in production:

```bash
npx serve .
```

## Deploy

Static site — deploy the repo root as-is to Netlify, GitHub Pages, Vercel, or
any static host. No build command or output directory needed.
