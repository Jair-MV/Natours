# Natours

A rebuild of the Natours adventure travel landing page using HTML, Sass, and vanilla JavaScript. It preserves the original design while supporting keyboard navigation, touch screens, and reduced-motion preferences.

## Run locally

You’ll need Node.js and npm.

```bash
git clone https://github.com/Jair-MV/Natours.git
cd Natours
npm ci
npm run build
```

Open `index.html` in your browser. The compiled CSS is not checked into the repository; `npm run build` generates `css/main.css`.

Run `npm run dev` to rebuild the CSS automatically as you edit Sass files. This command does not start a web server.

## Design and structure

- [`scss/`](scss/) — Styles organized using the 7-1 Sass architecture and BEM naming.
- [`js/`](js/) — Navigation menu, booking dialog, and testimonial video controls.
- [`style-guide/`](style-guide/) — Visual guide to the color palette, typography, and components. Reference screenshots are kept locally and are not included in the repository.

The booking form is a demo. It validates inputs in the browser but does not send data or create reservations.

## Credits

The original design was created by [Jonas Schmedtmann](https://github.com/jonasschmedtmann) for his [Advanced CSS and Sass](https://www.udemy.com/course/advanced-css-and-sass/) course. This rebuild is an educational project by Jair-MV, developed with AI assistance.
