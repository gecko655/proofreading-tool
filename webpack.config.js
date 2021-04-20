const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const glob = require('glob');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = (env) => {
  const isProduction = env && env.production;

  const config = {
    mode: isProduction ? 'production' : 'development',

    context: path.join(__dirname, 'assets'),

    entry: {}, // 後で設定する

    target: 'electron-renderer', // これをするとrendererでfsが使えるようになる

    output: {
      path: path.join(__dirname, '/assets/dist'),
      filename: ({ chunk }) => {
        if (chunk.name === 'vendor') return '[name].bundle.js';
        return '[name]';
      },
    },
    resolve: {
      extensions: ['.js', '.vue'],
      modules: ['node_modules'],
      alias: {
        // vue.js のビルドを指定する
        vue: 'vue/dist/vue.common.js',
      },
    },

    // cssはjsと別ファイルで吐き出す
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
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
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: ({ chunk }) => {
          if (chunk.name === 'vendor') return '[name].bundle.css';
          return '[name]';
        },
      }),
    ],

    optimization: {
      splitChunks: {
        name: 'vendor',
        chunks: 'all',
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
