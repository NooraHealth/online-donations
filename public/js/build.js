({
    baseUrl: "js",
    appDir: "../",
    dir: "../../dist",
    paths: {
      Stripe: "empty",
    },
    modules: [
      {
        name: 'main', 
        exclude: ['Stripe'], 
      },
    ]
    //name: "main",
    //out: "main-built.js"
})
