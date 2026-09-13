// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

import sentry from '@sentry/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://davdevs.dev',
  adapter: vercel(),
  integrations: [react(), sitemap(), sentry({
      project: "davdevs-astro",
      org: "gracesoft-jj",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    })],
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['.ngrok-free.app', '.ngrok-free.dev', '.ngrok.app', '.ngrok.io'],
    },
  },
  redirects: {
    '/ebook': '/ebooks',
  },
});