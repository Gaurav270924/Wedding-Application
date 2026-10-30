import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import { hydrateRoot, createRoot } from 'react-dom/client';

createInertiaApp({
  title: (title) =>
    title ? `${title} · K&A Forever` : 'K&A Forever · Kritagaya × Anuradha · 27 Feb 2027',
  resolve: (name) => {
    const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
    const page = pages[`./Pages/${name}.jsx`];
    if (!page) {
      throw new Error(`Page ${name} not found in ./Pages/${name}.jsx`);
    }
    return page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
});
