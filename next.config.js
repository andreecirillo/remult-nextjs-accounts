/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config) => {
    config.externals = [ ...config.externals, 'knex', 'sqlite3' ]
    return config;
  }
}

module.exports = nextConfig
