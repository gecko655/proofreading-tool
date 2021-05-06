const path = require('path');
const glob = require('glob');

module.exports = (env) => {
  const isProduction = env && env.production;

  const config = {
    mode: isProduction ? 'production' : 'development',

    context: path.join(__dirname, 'assets'),

    entry: {}, // 後で設定する

    target: 'web',

    output: {
      path: path.join(__dirname, '/assets/dist'),
      filename: '[name]',
    },
    resolve: {
      extensions: ['.js'],
      modules: ['node_modules'],
      alias: {
        // vue.js のビルドを指定する
        vue: 'vue/dist/vue.common.js',
      },
    },
    performance: isProduction
      ? {
          maxEntrypointSize: 800000,
          maxAssetSize: 800000,
        }
      : {},
  };
  glob
    .sync('**/*.js', {
      cwd: 'assets/js/entries',
    })
    .forEach((jsName) => {
      config.entry[jsName] = path.resolve('assets/js/entries', jsName);
    });

  return config;
};
