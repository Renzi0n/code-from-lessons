const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { publicUrlOrPath, src, postCSS } = require('./constants');

// eslint-disable-next-line func-names
module.exports = function (cssOptions, preProcessor) {
  const isProduction = process.env.NODE_ENV === 'production';

  // eslint-disable-next-line no-shadow
  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      !isProduction
        ? 'style-loader'
        : {
            loader: MiniCssExtractPlugin.loader,
            options: publicUrlOrPath.startsWith('.')
              ? {
                  publicPath: (resourcePath, context) => {
                    return `${path.relative(path.dirname(resourcePath), context)}/`;
                  },
                }
              : {},
          },
      {
        loader: 'css-loader',
        options: cssOptions,
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          postcssOptions: {
            config: postCSS,
          },
        },
      },
    ];
    if (preProcessor) {
      loaders.push(
        {
          loader: require.resolve('resolve-url-loader'),
          options: {
            sourceMap: true,
            root: src,
          },
        },
        {
          loader: require.resolve(preProcessor),
          options: {
            sourceMap: true,
          },
        }
      );
    }

    return loaders;
  };

  return getStyleLoaders(cssOptions, preProcessor);
};
