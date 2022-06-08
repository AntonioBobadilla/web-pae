/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  styledComponents: true
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
  },
  nextConfig
};
