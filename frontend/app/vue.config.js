module.exports = 
{ css: 
  { loaderOptions: 
    { scss: 
      { prependData: `@import '@/common/css/_config.scss';`,
      },
    },
  },

  devServer: 
  { proxy: 
    { "^/api/": 
      { target: "http://localhost:3000",
        pathRewrite: { "/api/": "/v1/" },
        changeOrigin: true,
      //logLevel: "debug"
      }
    }
  },
};