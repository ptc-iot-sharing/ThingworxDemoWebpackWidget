var path = require("path");
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
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
        widgetRuntime: './src/' + packageJson.name + '.runtime.ts',
        // the entry point for the ide widget
        widgetIde: './src/' + packageJson.name + '.ide.ts'
    },
    output: {
        path: path.join(__dirname, 'build', "ui", packageJson.name),
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js",
        // ths is the path when viewing the widget in thingworx
        publicPath: "../Common/extensions/" + packageJson.name + "_ExtensionPackage/ui/" + packageJson.name + "/",
    },
    plugins: [
        new CleanWebpackPlugin(['build', 'zip']),
        new webpack.optimize.CommonsChunkPlugin({
            name: "widgetRuntime",
            async: true,
            children: true
        }),
        // in case we just want to copy some resources directly to the widget package, then do it here
        new CopyWebpackPlugin([
            { from: 'src/static', to: 'static' }
        ]),
        new WidgetMetadataGenerator(),
        new ZipPlugin({
            path: '../../../zip',
            pathPrefix: 'ui/' + packageJson.name + "/",
            filename: packageJson.name + '-' + (isProduction ? 'min' : 'dev') + '-' + packageJson.version + '.zip',
            pathMapper: function (assetPath) {
                if (assetPath == 'widgetRuntime.bundle.js') {
                    return packageJson.name + ".runtime.bundle.js"
                } else if (assetPath == 'widgetIde.bundle.js') {
                    return packageJson.name + ".ide.bundle.js"
                } else {
                    return assetPath;
                }
            },
            include: /.*/,
            exclude: [/htmlDemo/, isProduction ? /(.*)\.map$/ : /a^/],
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

function WidgetMetadataGenerator(options) { }

WidgetMetadataGenerator.prototype.apply = function (compiler) {
    compiler.plugin('emit', function (compilation, callback) {
        // read the metadata xml file
        var fs = require('fs'),
            parseString = require('xml2js').parseString,
            xml2js = require('xml2js')
        fs.readFile('metadata.xml', 'utf-8', function (err, data) {
            if (err) console.log("Error reading metadata file" + err);
            // transform the metadata to json
            parseString(data, function (err, result) {
                console.log(JSON.stringify(result.Entities));

                if (err) console.log("Error parsing metadata file" + err);
                result.Entities.ExtensionPackages[0].ExtensionPackage[0].$.name = packageJson.name + "_ExtensionPackage";
                result.Entities.ExtensionPackages[0].ExtensionPackage[0].$.packageVersion = packageJson.version;
                result.Entities.Widgets[0].Widget[0].$.name = packageJson.name;
                if (!result.Entities.Widgets[0].Widget[0].UIResources[0].FileResource) {
                    result.Entities.Widgets[0].Widget[0].UIResources[0] = {};
                    result.Entities.Widgets[0].Widget[0].UIResources[0].FileResource = [];
                }
                result.Entities.Widgets[0].Widget[0].UIResources[0].FileResource.push(
                    { "$": { "type": "JS", "file": packageJson.name + ".ide.bundle.js", "description": "", "isDevelopment": "true", "isRuntime": "false" } }
                );
                result.Entities.Widgets[0].Widget[0].UIResources[0].FileResource.push(
                    { "$": { "type": "JS", "file": packageJson.name + ".runtime.bundle.js", "description": "", "isDevelopment": "false", "isRuntime": "true" } }
                );
                // tranform the metadata back into xml
                var builder = new xml2js.Builder();
                var xml = builder.buildObject(result);

                // Insert the metadata xml as a file asset
                compilation.assets['../../metadata.xml'] = {
                    source: function () {
                        return xml;
                    },
                    size: function () {
                        return xml.length;
                    }
                };
                callback();

            });
        });
    });
};