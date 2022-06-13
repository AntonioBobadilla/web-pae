/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  styledComponents: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
  }
};

module.exports = {
  async redirects() {
    return [
      {
        source: '/student',
        destination: '/student/home',
        permanent: true
      },
      {
        source: '/tutor',
        destination: '/tutor/home',
        permanent: true
      },
      {
        source: '/admin',
        destination: '/admin/home',
        permanent: true
      }
    ];
  }
};

module.exports = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching
  },
  i18n,
  otherLanguages: ['es', 'tr'],
  defaultLanguage: 'es',
  fallbackLng: ['es']
});
