const path = require('path');
const fs = require('fs');
const resolve = require('resolve');
const { DefinePlugin } = require('webpack');
// const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const tsConfigRaw = require('../tsconfig.json');
const localIdent = require('./css.modules.config');
const {
  src,
  dist,
  webpackCache,
  jsConfig,
  tsConfig,
  publicUrlOrPath,
  moduleFileExtensions,
  nodeModules,
  appPath,
  entry,
  svgo,
} = require('./constants');
const modules = require('./webpack.config.modules');
const styleLoaders = require('./webpack.config.styles');
const createEnvironmentHash = require('./webpack.config.cache');
const getClientEnvironment = require('./webpack.config.env');

const env = getClientEnvironment(publicUrlOrPath.slice(0, -1));

// style files regexes
// const cssRegex = /\.css$/;
// const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const svgSpriteRegex = /(icon-).*(.svg)(\?.*)?$/;

const isProduction = env.raw.NODE_ENV === 'production';
const isDev = env.raw.NODE_ENV === 'development';
const isTest = env.raw.NODE_ENV === 'test';

module.exports = {
  target: ['browserslist'],
  entry: {
    app: entry,
  },
  output: {
    path: dist,
    filename: 'assets/js/[name].[fullhash:8].js',
    chunkFilename: 'assets/js/[name].[fullhash:8].chunk.js',
    publicPath: publicUrlOrPath,
    clean: true,
    assetModuleFilename: (module) => {
      let { filename } = module;
      if (module.filename.includes('src/')) {
        filename = module.filename.replace('src/', '');
      }
      return filename;
    },
  },
  cache: {
    type: 'filesystem',
    version: createEnvironmentHash(env.raw),
    cacheDirectory: webpackCache,
    store: 'pack',
    buildDependencies: {
      defaultWebpack: ['webpack/lib/'],
      config: [__filename],
      tsconfig: [tsConfig, jsConfig].filter((f) => fs.existsSync(f)),
    },
  },
  infrastructureLogging: {
    level: 'verbose',
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: moduleFileExtensions.map((ext) => `.${ext}`),
    modules: ['node_modules', nodeModules].concat(modules.additionalModulePaths || []),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2017',
          tsconfigRaw: tsConfigRaw,
        },
      },
      {
        test: /\.jsx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'jsx',
          target: 'es2017',
        },
      },
      {
        test: /\.(gif|png|jpe?g|webp)$/i,
        type: 'asset',
      },
      {
        test: svgSpriteRegex,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              publicPath: `./assets/icons/`,
            },
          },
          'svg-transform-loader',
          {
            loader: 'svgo-loader',
            options: {
              configFile: svgo,
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: styleLoaders(
          {
            importLoaders: 3,
            sourceMap: true,
            modules: {
              mode: 'icss',
            },
          },
          'sass-loader'
        ),
        sideEffects: true,
      },
      {
        test: sassModuleRegex,
        use: styleLoaders(
          {
            importLoaders: 3,
            sourceMap: true,
            modules: {
              mode: 'local',
              getLocalIdent: localIdent,
            },
          },
          'sass-loader'
        ),
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      DEVELOPMENT: isDev,
      PRODUCTION: isProduction,
      TEST: isTest,
      ...env.stringified,
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: `${src}/index.html`,
      ...(isProduction
        ? {
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
          }
        : undefined),
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      typescript: {
        typescriptPath: resolve.sync('typescript', {
          basedir: nodeModules,
        }),
        context: appPath,
        configFile: 'tsconfig.json',
        diagnosticOptions: {
          syntactic: true,
        },
        mode: 'write-references',
        profile: true,
      },
    }),
    new ESLintPlugin({
      extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
      formatter: require.resolve('react-dev-utils/eslintFormatter'),
      eslintPath: require.resolve('eslint'),
      failOnError: true,
      context: src,
      cache: true,
      fix: true,
      threads: true,
      cacheLocation: path.resolve(nodeModules, '.cache/.eslintcache'),
      cwd: appPath,
      resolvePluginsRelativeTo: __dirname,
    }),
    // new StylelintPlugin({
    //   extensions: ['ts', 'tsx', 'js', 'jsx'],
    //   eslintPath: require.resolve('stylelint'),
    //   failOnError: true,
    //   context: src,
    //   configFile: `./.stylelintrc.js`,
    //   cache: true,
    //   fix: true,
    //   threads: true,
    //   cacheLocation: path.resolve(nodeModules, '.cache/.stylelintcache'),
    //   cwd: appPath,
    //   resolvePluginsRelativeTo: __dirname,
    // }),
    new SpriteLoaderPlugin({
      plainSprite: true,
    }),
    // use it if you need to handle files without webpack
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: 'src/assets/**/*',
    //       to({ context, absoluteFilename }) {
    //         const folderName = absoluteFilename
    //           .substring(absoluteFilename.indexOf('src/'), absoluteFilename.lastIndexOf('/'))
    //           .replace('src/', '');
    //         return `${folderName}/[name][ext]`;
    //       },
    //     },
    //   ],
    //   options: { concurrency: 1000 },
    // }),
  ],
};
