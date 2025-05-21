/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config) => {
    config.externals = [ ...config.externals, 'knex', 'sqlite3' ]
    return config;
  },
   reactStrictMode: true,
  env: {
    NEXTAUTH_SECRET:"say_carol_love_me_carol_love_me_hey",
  },
}

module.exports = nextConfig
