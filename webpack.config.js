var path = require("path");
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var WebpackAutoInject = require('webpack-auto-inject-version');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ZipPlugin = require('zip-webpack-plugin');
let packageJson = require("./package.json");
// look if we are in production or not
const isProduction = (process.argv.indexOf('-p') !== -1);
module.exports = {
    entry: {
        // the entry point when viewing the index.html page
        htmlDemo: "./src/index.ts",
        // the entry point for the runtime widget
        MY_WIDGET_RUNTIME: './src/demoWebpack.runtime.ts',
        // the entry point for the ide widget
        MY_WIDGET_IDE: './src/demoWebpack.ide.ts'
    },
    output: {
        path: path.join(__dirname, 'build', "ui", "demoWebpack"),
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js",
        // ths is the path when viewing the widget in thingworx
        publicPath: "../Common/extensions/demoWebpack_ExtensionPackage/ui/demoWebpack/",
    },
    plugins: [
        new CleanWebpackPlugin(['build', 'zip']),
        new webpack.optimize.CommonsChunkPlugin({
            name: "MY_WIDGET_RUNTIME",
            async: true,
            children: true
        }),
        // in case we just want to copy some resources directly to the widget package, then do it here
        new CopyWebpackPlugin([
            { from: 'src/static', to: 'static' }
        ]),
        new CopyWebpackPlugin([
            { from: 'metadata.xml', to: '../../' }
        ]),
        new WebpackAutoInject({
            components: {
                AutoIncreaseVersion: true,
                InjectAsComment: true,
                InjectByTag: false
            },
            componentsOptions: {
                AutoIncreaseVersion: {
                    runInWatchMode: false // it will increase version with every single build!
                },
                InjectAsComment: {
                    tag: 'Version: {version} - {date}',
                    dateFormat: 'h:MM:ss TT'
                }
            },
            LOGS_TEXT: {
                AIS_START: 'Stating AutoIncrementVersion'
            }
        }),
        new ZipPlugin({
            path: '../../../zip',
            pathPrefix: 'ui/demoWebpack/',
            filename: packageJson.name + '-' + (isProduction ? 'min' : 'dev') + '-' + packageJson.version + '.zip',
            pathMapper: function (assetPath) {
                return assetPath;
            },
            exclude: [/htmlDemo/, isProduction ? /(.*)\.map$/ : ""],
        })
    ],

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre", test: /\.js$/, loader: "source-map-loader"
            },
            {
                test: /\.(png|jp(e*)g|svg|xml)$/,
                loader: 'url-loader?limit=30000&name=images/[name].[ext]'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },

        ]
    },
};