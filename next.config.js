module.exports = {
    future: {
        webpack5: true,
        strictPostcssConfiguration: true
    },
    trailingSlash: true,
    async redirects() {
        return [
            {
                source: '/:version(\\d\\.\\d\\d)',
                destination: '/',
                permanent: true,
            },
            {
                source: '/:version(\\d\\.\\d\\d)/:lang(\\w\\w)/',
                destination: '/:version/:lang/index/',
                permanent: true,
            },
        ]
    }
}