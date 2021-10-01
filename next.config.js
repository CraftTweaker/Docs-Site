const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({
    poweredByHeader: false,
    reactStrictMode: true,
    images: {
        domains: ['blamejared.com'],
    },
    experimental: {
        esmExternals: true
    },
    eslint: {
        dirs: ['src'],
    },
    webpack: (config, {dev, isServer}) => {
        if (!dev && !isServer) {
            // Replace React with Preact only in client production build
            Object.assign(config.resolve.alias, {
                react: 'preact/compat',
                'react-dom/test-utils': 'preact/test-utils',
                'react-dom': 'preact/compat',
            })
        }

        return config
    },
})