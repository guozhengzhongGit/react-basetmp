module.exports = (api) => {
  api.cache(true);
  const presets = [['@babel/preset-env'], ['@babel/preset-react']];
  const plugins = [
    [
      '@babel/plugin-proposal-decorators',
      {
        decoratorsBeforeExport: true,
      },
    ],
    ['@babel/plugin-syntax-dynamic-import'],
  ];
  return {
    presets,
    plugins,
  };
};
