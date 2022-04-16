module.exports = {
  css: {
    loaderOptions: {
      sass: {
        implementation: require("sass"),
        additionalData: `
          @import "@/scss/_variables.scss";
          @import "@/scss/_global.scss";
        `,
      },
    },
  },
};
