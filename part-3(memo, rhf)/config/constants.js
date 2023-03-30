const path = require('path');
const fs = require('fs');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL ?? '.'
);

const moduleFileExtensions = ['js', 'ts', 'tsx', 'json', 'jsx'];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  // eslint-disable-next-line no-shadow
  const extension = moduleFileExtensions.find((extension) => fs.existsSync(resolveFn(`${filePath}.${extension}`)));

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

module.exports = {
  appPath: resolveApp('.'),
  src: resolveApp('src'),
  dist: resolveApp('dist'),
  entry: resolveModule(resolveApp, 'src/index'),
  assets: resolveApp('assets'),
  dotenv: resolveApp('.env'),
  package: resolveApp('package.json'),
  nodeModules: resolveApp('node_modules'),
  tsConfig: resolveApp('tsconfig.json'),
  webpackCache: resolveApp('node_modules/.cache'),
  publicUrlOrPath,
};

module.exports.moduleFileExtensions = moduleFileExtensions;
