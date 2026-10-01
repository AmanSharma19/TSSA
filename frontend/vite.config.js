import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "frame-src https://www.google.com",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https://res.cloudinary.com https://images.unsplash.com",
  "connect-src 'self'",
  "form-action 'self'"
].join('; ')

const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
}

const previewSecurityHeaders = {
  ...securityHeaders,
  'Content-Security-Policy': contentSecurityPolicy,
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'production-security-policy',
      transformIndexHtml: {
        order: 'post',
        handler(html, context) {
          if (context.server) return

          return [{
            tag: 'meta',
            attrs: {
              'http-equiv': 'Content-Security-Policy',
              content: contentSecurityPolicy
            },
            injectTo: 'head-prepend'
          }]
        }
      }
    }
  ],
  server: {
    headers: securityHeaders,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
  preview: {
    headers: previewSecurityHeaders,
  },
})
