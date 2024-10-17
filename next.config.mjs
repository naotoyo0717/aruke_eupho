/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        domains: ['lh3.googleusercontent.com', 'res.cloudinary.com'],
    },
};

export default nextConfig;
