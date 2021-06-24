const path = require('path');

function absolutePath(l_path)
{ return path.resolve(__dirname, l_path); }

module.exports = {
  css: {
    loaderOptions: {
      scss: { prependData: `@import '@/common/css/_config.scss';` },
    },
  },

  configureWebpack: {
    resolve: {
      alias: {
        "/components": absolutePath("src/components/"),
        "/router": absolutePath("src/router/"),
        "/store": absolutePath("src/store/"),
        "/views": absolutePath("src/views/"),
        "/css": absolutePath("src/common/css/"),
        "/img": absolutePath("src/common/img/"),
        "/js": absolutePath("src/common/js/"),
        "/json": absolutePath("src/common/json/"),
      },
    },
  },
};
