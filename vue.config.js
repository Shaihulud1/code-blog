module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/styles/color.scss";`
      }
    }
  },
  // chainWebpack: config => {
  //   config.module
  //     .rule("fonts")
  //     .test(/(RobotoCondensed-Regular)$/)
  //     .use("file-loader")
  //     .loader("file-loader")
  //     .tap(options => {
  //       options = {
  //         // limit: 10000,
  //         name: '/assets/fonts/[name].[ext]',
  //       }
  //       return options
  //     })
  //     .end()
  // }
}
