module.exports = {
    apps: [
      {
        name: "tourandtravel",
        script: "./bin/www",
        watch: true,
        ignore_watch: ["public/cms"],
        env: {
          NODE_ENV: "development",
        },
        env_production: {
          NODE_ENV: "production",
        },
      },
    ],
  };
  