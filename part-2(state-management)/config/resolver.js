// jest не может зарезолвить @hookform/resolvers, по причине описанной здесь:
// https://github.com/microsoft/accessibility-insights-web/pull/5421#issuecomment-1109168149
// код решения взят отсюда:
// https://github.com/react-hook-form/resolvers/issues/396#issuecomment-1114248072
module.exports = (path, options) => {
  return options.defaultResolver(path, {
    ...options,
    packageFilter: pkg => {
      if (pkg.name === '@hookform/resolvers') {
        delete pkg.exports;
        delete pkg.module;
      }
      return pkg;
    },
  });
};
