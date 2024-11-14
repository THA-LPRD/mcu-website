/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',

    // Generate consistent build ID instead of random hash
    generateBuildId: () => 'static',

    trailingSlash: false,
    pageExtensions: ['js', 'jsx', 'tsx'],
    assetPrefix: '',

    // Consolidate chunks and minimize splits
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.optimization.splitChunks = {
                cacheGroups: {
                    default: false,
                    vendors: false,
                    commons: {
                        name: 'commons',
                        chunks: 'all',
                        minChunks: 1,
                    }
                }
            };
        }
        return config;
    },

    // Minimize CSS output
    compiler: {
        removeConsole: true,
    },

    // Disable image optimization since we're serving from ESP
    images: {
        unoptimized: true,
    },

    // Minimize JavaScript
    swcMinify: true,
}

export default nextConfig;
