import { defineConfig } from 'astro/config'
import dotenv from 'dotenv'

import react from '@astrojs/react'

import builder from './service/builder'
import { env } from './util/env'

dotenv.config()
const production = env('BUILD_ENV') === 'production'

const common = [react()]
const integrations = production ? [builder, ...common] : [...common]

export default defineConfig({
  integrations,
  server: { port: 3001, host: true },
  vite: {
    build: {
      minify: 'esbuild'
    }
  }
})
