module.exports = function (api) {
    api.cache(true);

    const presets = [['@babel/preset-react'], ['@babel/preset-typescript'], ['@babel/preset-env']];
    const plugins = [
        'react-hot-loader/babel',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-runtime',
        [
            'module-resolver',
            {
                root: ['./'],
                alias: {
                    '@src': './src',
                },
            },
        ],
    ];

    return {
        presets,
        plugins,
    };
};
