const isProd = process.env.NODE_ENV === "production"

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
    assetPrefix: isProd ? "https://nima.sh/hparch-lab-webpage" : "",
}
