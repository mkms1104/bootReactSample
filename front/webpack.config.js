const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const chalk = require('chalk');

function webpackConfig(mode) {
    const isProd = mode === 'production';
    const plugins = [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.BannerPlugin({
            banner: 'make by mskim',
        }),
        new HtmlWebpackPlugin({
            template: path.resolve('public/index.html'),
            //favicon: 'public/favicon.ico',
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[hash:8].css',
        }),
    ];

    if (isProd) {
        plugins.push(new CleanWebpackPlugin());
    }

    return {
        target: 'web',

        entry: {
            main: './src/index.tsx',
        },
        output: {
            filename: 'static/js/[name].[hash:8].js',
            path: path.resolve('build'), // 빌드 결과가 저장될 경로
            publicPath: '/',
        },

        devtool: isProd ? false : 'inline-source-map', // 번들링된 파일 내의 코드와 원본 코드를 연결

        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'], // 파일 확장자 자동 처리
            alias: {
                'react-dom': '@hot-loader/react-dom',
            },
        },

        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                    ],
                },
                /*{
                    test: /\.(png|jpg)$/,
                    loader: 'url-loader', // limit 크기 이하의 파일들은 base64 코드로 변환한다.
                    options: {
                        // publicPath: '/',
                        // name: '[name].[hash:8].[ext]',
                        limit: 10 * 1024,
                    },
                },*/
                {
                    test: /\.(png|jpe?g|gif|bmp|svg|eot|otf|woff)$/,
                    loader: 'file-loader', // url-loader 에서 처리되지 못한 파일들을 처리한다.
                    options: {
                        publicPath: '/',
                        name: 'static/media/[name].[hash:8].[ext]',
                    },
                },
                {
                    test: /\.(js|mjs|jsx|ts|tsx)$/,
                    loader: 'babel-loader',
                    exclude: [/node_modules/],
                },
            ],
        },

        plugins,

        optimization: {
            // webpack 5v 부터 지원하는 오버라이딩 문법
            // production 모드에서 자동으로 추가되는 minimizer 옵션들을 끼워넣는다.
            minimizer: [`...`, new OptimizeCSSAssetsPlugin({})],
        },

        devServer: {
            contentBase: './build', // 정적파일을 제공할 경로 (기본 값은 webpack output 설정)
            publicPath: '/', // 브라우저를 통해 접근하는 경로 (기본 값은 '/')
            host: 'localhost', // 개발환경에서 도메인을 맞추어야 하는 상황에서 사용한다.
            //overlay: true, // 빌드시 에러나 경고를 브라우저 화면에 표시한다.
            port: 3000, // 개발 서버 포트를 설정한다. (기본 8080)
            //stats: 'errors-only', // 메시지 수준을 지정한다.
            historyApiFallback: true,
            open: true,
            clientLogLevel: 'silent',
            //writeToDisk: true,
            hot: true,
        },
    };
}

module.exports = (env, argv) => {
    if (argv.mode === 'production') {
        console.log(chalk.green('운영 환경으로 빌드합니다.'));
    } else {
        console.log(chalk.green('개발 환경으로 빌드합니다.'));
    }
    return webpackConfig(argv.mode);
};
