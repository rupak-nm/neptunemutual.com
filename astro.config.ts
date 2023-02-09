import { defineConfig } from 'astro/config'
import dotenv from 'dotenv'

import react from '@astrojs/react'

import builder from './service/builder'
import { env } from './util/env'

dotenv.config()
const production = env('BUILD_ENV') === 'production'

const common = [react()]
const integrations = production ? [builder, ...common] : [...common]

/** @type {import('astro').AstroUserConfig} */
export default defineConfig({
  integrations,
  server: {
    port: 3001,
    host: true,
    headers: {
      'content-security-policy': "worker-src 'none'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com/ https://www.clarity.ms/ https://www.google.com/recaptcha/api.js https://www.gstatic.com/recaptcha/ https://platform.twitter.com/ https://gist.github.com/; connect-src 'self' https://api.neptunemutual.net https://cms.neptunemutual.net/api/hacks https://*.clarity.ms https://www.google-analytics.com https://youtube.com/; style-src 'self' 'unsafe-inline' https://github.githubassets.com/; upgrade-insecure-requests; frame-src 'self' https://platform.twitter.com/ https://www.youtube.com/ https://www.google.com/; frame-ancestors 'self'; default-src 'none'; prefetch-src 'self'; manifest-src 'self'; base-uri 'none'; form-action 'none'; object-src 'self'; img-src 'self' data: https://*.clarity.ms https://*.bing.com; font-src 'self'"
    }
  },
  vite: {
    build: {
      minify: 'esbuild'
    }
  }
})
