module.exports = {
    apps: [{
        name: "credit-card-inquiries-web-console",
        script: "./server.js",
        env_dev: {
            NODE_ENV: "development",
        },
        env_prod: {
            NODE_ENV: "production",
        }
    }]
}