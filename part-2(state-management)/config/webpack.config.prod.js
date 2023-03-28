process.env.NODE_ENV = 'production';

const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const BaseConfig = require('./webpack.config');

const prodWebpackConfig = merge(BaseConfig, {
  mode: 'production',
  bail: true,
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: `assets/css/[name].[fullhash:8].css`,
      chunkFilename: `assets/css/[name]-chunk.[fullhash:8].css`,
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015',
        minify: true,
        sourcemap: true,
      }),
      new CssMinimizerPlugin({
        parallel: true,
        minify: CssMinimizerPlugin.cssnanoMinify,
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
          processorOptions: {
            parser: 'postcss-scss',
          },
          options: {
            sourceMap: true,
          },
        },
      }),
      new ImageMinimizerPlugin({
        deleteOriginalAssets: false,
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 7 }],
              [
                'svgo',
                {
                  plugins: [
                    'preset-default',
                    {
                      name: 'removeViewBox',
                      active: false,
                    },
                    {
                      name: 'addAttributesToSVGElement',
                      params: {
                        attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
        generator: [
          {
            preset: 'webp',
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: {
              plugins: ['imagemin-webp'],
            },
          },
          {
            preset: 'avif',
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: {
              plugins: ['imagemin-avif'],
            },
          },
        ],
      }),
    ],
  },
});

module.exports = new Promise((resolve) => {
  resolve(prodWebpackConfig);
});
