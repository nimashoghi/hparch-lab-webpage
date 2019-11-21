const isProd = process.env.NODE_ENV === "production"
if (isProd && !process.env.URL_PREFIX) {
    throw new Error("Expected URL_PREFIX parameter!")
}

module.exports = {
    webpack: (config, {isServer}) => {
        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
            config.node = {
                fs: "empty",
            }
        }

        return config
    },
    assetPrefix: isProd ? process.env.URL_PREFIX : "",
}
