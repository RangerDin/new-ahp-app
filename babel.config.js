module.exports = process.env.NODE_ENV === 'test' ? {
    presets: [
        ['@babel/preset-env', {targets: {node: 'current'}}],
    ],
} : {
    'presets': [
        '@babel/preset-env',
        '@babel/preset-react',
    ],
    'plugins': [
        '@babel/plugin-proposal-object-rest-spread',
        ['@babel/plugin-transform-react-jsx', {'pragma': 'h'}],
    ],
};
