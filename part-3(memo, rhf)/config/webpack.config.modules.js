const fs = require('fs');
const path = require('path');
const chalk = require('react-dev-utils/chalk');
const resolve = require('resolve');

const { src, jsConfig, tsConfig, nodeModules, appPath } = require('./constants');

/**
 * Get additional module paths based on the baseUrl of a compilerOptions object.
 *
 * @param {Object} options
 */
function getAdditionalModulePaths(options = {}) {
  const { baseUrl } = options;

  if (!baseUrl) {
    return '';
  }

  const baseUrlResolved = path.resolve(appPath, baseUrl);

  // We don't need to do anything if `baseUrl` is set to `node_modules`. This is
  // the default behavior.
  if (path.relative(nodeModules, baseUrlResolved) === '') {
    return null;
  }

  // Allow the user set the `baseUrl` to `appSrc`.
  if (path.relative(src, baseUrlResolved) === '') {
    return [src];
  }

  // If the path is equal to the root directory we ignore it here.
  // We don't want to allow importing from the root directly as source files are
  // not transpiled outside of `src`. We do allow importing them with the
  // absolute path (e.g. `src/Components/Button.js`) but we set that up with
  // an alias.
  if (path.relative(appPath, baseUrlResolved) === '') {
    return null;
  }

  // Otherwise, throw an error.
  throw new Error(
    chalk.red.bold(
      "Your project's `baseUrl` can only be set to `src` or `node_modules`." +
        ' Create React App does not support other values at this time.'
    )
  );
}

/**
 * Get webpack aliases based on the baseUrl of a compilerOptions object.
 *
 * @param {*} options
 */
function getWebpackAliases(options = {}) {
  const { baseUrl } = options;

  if (!baseUrl) {
    return {};
  }

  const baseUrlResolved = path.resolve(appPath, baseUrl);

  if (path.relative(appPath, baseUrlResolved) === '') {
    return {
      src,
    };
  }

  return null;
}

/**
 * Get jest aliases based on the baseUrl of a compilerOptions object.
 *
 * @param {*} options
 */
function getJestAliases(options = {}) {
  const { baseUrl } = options;

  if (!baseUrl) {
    return {};
  }

  const baseUrlResolved = path.resolve(appPath, baseUrl);

  if (path.relative(appPath, baseUrlResolved) === '') {
    return {
      '^src/(.*)$': '<rootDir>/src/$1',
    };
  }

  return null;
}

function getModules() {
  // Check if TypeScript is setup
  const hasTsConfig = fs.existsSync(tsConfig);
  const hasJsConfig = fs.existsSync(jsConfig);

  if (hasTsConfig && hasJsConfig) {
    throw new Error(
      'You have both a tsconfig.json and a jsconfig.json. If you are using TypeScript please remove your jsconfig.json file.'
    );
  }

  let config;

  // If there's a tsconfig.json we assume it's a
  // TypeScript project and set up the config
  // based on tsconfig.json
  if (hasTsConfig) {
    // eslint-disable-next-line import/no-dynamic-require,global-require
    const ts = require(resolve.sync('typescript', {
      basedir: nodeModules,
    }));
    config = ts.readConfigFile(tsConfig, ts.sys.readFile).config;
    // Otherwise we'll check if there is jsconfig.json
    // for non TS projects.
  } else if (hasJsConfig) {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    config = require(jsConfig);
  }

  config = config || {};
  const options = config.compilerOptions || {};

  const additionalModulePaths = getAdditionalModulePaths(options);

  return {
    additionalModulePaths,
    webpackAliases: getWebpackAliases(options),
    jestAliases: getJestAliases(options),
    hasTsConfig,
  };
}

module.exports = getModules();
