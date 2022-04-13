const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './app/main.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            Scripts: path.resolve(__dirname, 'app/')
        }
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'js/'),
    }
};