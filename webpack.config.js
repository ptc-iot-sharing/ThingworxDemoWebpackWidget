var path = require("path");
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        // the entry point when viewing the index.html page
        htmlDemo: "./src/index.ts",
        // the entry point for the runtime widget
        windgetRuntime: './src/demoWebpack.runtime.ts',
        // the entry point for the ide widget
        widgetIde: './src/demoWebpack.ide.ts'
    },
    output: {
        path: path.join(__dirname, "ui", "demoWebpack"),
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js",
        // ths is the path when viewing the widget in thingworx
        publicPath: "../Common/extensions/demoWebpack_ExtensionPackage/ui/demoWebpack/",
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "windgetRuntime",
            async: true, 
            children: true
        }),
        // in case we just want to copy some resources directly to the widget package, then do it here
        new CopyWebpackPlugin([
            { from: 'src/static', to: 'static' }
        ]),
    ],

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.(png|jp(e*)g|svg|xml)$/,
                loader: 'url-loader?limit=30000&name=images/[name].[ext]'
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]               
            },

        ]
    },
};