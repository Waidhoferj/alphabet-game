module.exports = {
  pwa: {
    name: "Alphabet Game",
    themeColor: "#F0F0F0",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "default",
    manifestOptions: {
      icons: [
        {
          src: "/assets/favicon-192.png",
          type: "image/png",
          sizes: "192x192"
        },
        {
          src: "/assets/favicon-512.png",
          type: "image/png",
          sizes: "512x512"
        }
      ]
    }
  }
};
