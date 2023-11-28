/** @type {import('next').NextConfig} */


const nextConfig = {
    env: {
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
        APP_API_URL: process.env.APP_API_URL,
        APP_URL: process.env.APP_URL
    },
    images: {
        domains: ['app.randyclee.com'],
    }
    
}


module.exports = nextConfig
