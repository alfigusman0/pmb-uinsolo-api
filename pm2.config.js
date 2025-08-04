module.exports = {
    apps: [{
        name: "backend-damba-uinsgd",
        watch: true,
        watch_delay: 1000,
        script: "./server.js",
        //watch: ["config", "controllers", "helpers", "middleware", "routes", "validation"],
        ignore_watch: ["node_modules", "uploads", ".git", "package-lock.json"],
        instances: "2",
        exec_mode: "cluster",
        node_args: "--max-old-space-size=4096",
        max_memory_restart: '2G',
        autorestart: true,
    }]
}
