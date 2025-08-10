/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'randomuser.me', 
            'images.unsplash.com',
            // Amazon image domains
            'images-na.ssl-images-amazon.com',
            'm.media-amazon.com',
            'images.amazon.com',
            'ecx.images-amazon.com'
        ],
    },
};

export default nextConfig;
