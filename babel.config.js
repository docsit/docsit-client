module.exports = api => {
  api.cache(() => process.env.NODE_ENV);
  api.cache.invalidate(() => process.env.NODE_ENV === 'production');

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    'minify',
  ];

  const plugins = [];

  return { presets, plugins };
};
