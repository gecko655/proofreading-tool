const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  const isProduction = env && env.production;

  const config = {
    mode: isProduction ? 'production' : 'development',

    context: path.join(__dirname, 'assets'),

    entry: {
      vendor: ['bootstrap', 'bootstrap/dist/css/bootstrap.css'],
    }, // appは後で設定する

    target: 'web',

    output: {
      path: path.join(__dirname, '/assets/dist'),
      filename: ({ chunk }) => {
        if (chunk.name === 'vendor') return '[name].bundle.js';
        return '[name]';
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: ({ chunk }) => {
          if (chunk.name === 'vendor') return '[name].bundle.css';
          return '[name]';
        },
      }),
    ],
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
