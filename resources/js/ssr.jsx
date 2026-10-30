import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import ReactDOMServer from 'react-dom/server';

createServer((page) =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: (title) =>
      title ? `${title} · K&A Forever` : 'K&A Forever · Kritagaya × Anuradha · 27 Feb 2027',
    resolve: (name) => {
      const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
      const targetPage = pages[`./Pages/${name}.jsx`];
      if (!targetPage) {
        throw new Error(`Page ${name} not found in ./Pages/${name}.jsx`);
      }
      return targetPage;
    },
    setup: ({ App, props }) => <App {...props} />,
  }),
);
