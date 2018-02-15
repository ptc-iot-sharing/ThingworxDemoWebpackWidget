'use strict';
var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
// enable cleaning of the build and zip directories
var CleanWebpackPlugin = require('clean-webpack-plugin');
// enable building of the widget
var ZipPlugin = require('zip-webpack-plugin');
// enable reading master data from the package.json file
let packageJson = require('./package.json');
// look if we are in production or not based on the -p argument
const isProduction = process.argv.indexOf('-p') !== -1;
// look if we are in initialization mode based on the --init argument
const isInitialization = process.argv.indexOf('--env.init') !== -1;
// look if we are in initialization mode based on the --init argument
const uploadEnabled = process.argv.indexOf('--env.upload') !== -1;

// first, increment the version in package.json
let packageVersion = packageJson.version.split('.');
packageJson.version = `${packageVersion[0]}.${packageVersion[1]}.${parseInt(packageVersion[2]) + 1}`;
console.log(`Incremented package version to ${packageJson.version}`);
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 4));
module.exports = {
    entry: {
        // the entry point when viewing the index.html page
        htmlDemo: './src/index.ts',
        // the entry point for the runtime widget
        widgetRuntime: `./src/${packageJson.name}.runtime.ts`,
        // the entry point for the ide widget
        widgetIde: `./src/${packageJson.name}.ide.ts`
    },
    output: {
        path: path.join(__dirname, 'build', 'ui', packageJson.name),
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js',
        // this is the path when viewing the widget in thingworx
        publicPath: `../Common/extensions/${packageJson.name}_ExtensionPackage/ui/${packageJson.name}/`
    },
    plugins: [
        // delete build and zip folders
        new CleanWebpackPlugin(['build', 'zip']),
        // we are optimizing the chunks based on the widget runtime file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'widgetRuntime',
            async: true,
            children: true
        }),
        // in case we just want to copy some resources directly to the widget package, then do it here
        new CopyWebpackPlugin([{ from: 'src/static', to: 'static' }]),
        // generates the metadata xml file and adds it to the archive
        new WidgetMetadataGenerator(),
        // create the extension zip
        new ZipPlugin({
            path: path.join(__dirname, 'zip'), // a top level directory called zip
            pathPrefix: `ui/${packageJson.name}/`, // path to the extension source code
            filename: `${packageJson.name}-${isProduction ? 'min' : 'dev'}-${packageJson.version}.zip`,
            pathMapper: function (assetPath) {
                // handles renaming of the budles
                if (assetPath == 'widgetRuntime.bundle.js') {
                    return packageJson.name + '.runtime.bundle.js';
                } else if (assetPath == 'widgetIde.bundle.js') {
                    return packageJson.name + '.ide.bundle.js';
                } else {
                    return assetPath;
                }
            },
            exclude: [/htmlDemo/, isProduction ? /(.*)\.map$/ : /a^/]
        })
    ],

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.json']
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
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            },
            {
                test: /\.(png|jp(e*)g|svg|xml)$/,
                loader: 'url-loader?limit=30000&name=images/[name].[ext]'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};

// if we are in the initialization phase, do the renames
if (isInitialization) {
    module.exports.plugins.unshift(new InitializeProject());
}

function InitializeProject(options) { }

InitializeProject.prototype.apply = function (compiler) {
    compiler.plugin('run', function () {
        console.log(`Generating widget with name: ${packageJson.name}`);
        // rename the ide.ts and runtime.ts files
        fs.renameSync('src/demoWebpack.ide.ts', `src/${packageJson.name}.ide.ts`);
        fs.renameSync('src/demoWebpack.runtime.ts', `src/${packageJson.name}.runtime.ts`);
    });
};

function WidgetMetadataGenerator(options) { }

WidgetMetadataGenerator.prototype.apply = function (compiler) {
    compiler.plugin('emit', function (compilation, callback) {
        // read the metadata xml file using xml2js
        let xml2js = require('xml2js');
        fs.readFile('metadata.xml', 'utf-8', function (err, data) {
            if (err) console.log('Error reading metadata file' + err);
            // transform the metadata to json
            xml2js.parseString(data, function (err, result) {
                if (err) console.log('Error parsing metadata file' + err);
                // set the name of the extension package
                result.Entities.ExtensionPackages[0].ExtensionPackage[0].$.name = packageJson.name + '_ExtensionPackage';
                // set the description from the package.json
                result.Entities.ExtensionPackages[0].ExtensionPackage[0].$.description = packageJson.description;
                // set the vendor using the author field in package json
                result.Entities.ExtensionPackages[0].ExtensionPackage[0].$.vendor = packageJson.author;
                // set the minimum thingworx version
                result.Entities.ExtensionPackages[0].ExtensionPackage[0].$.minimumThingWorxVersion =
                    packageJson.minimumThingWorxVersion;
                // set the version of the package
                result.Entities.ExtensionPackages[0].ExtensionPackage[0].$.packageVersion = packageJson.version;
                // set the name of the widget itself
                result.Entities.Widgets[0].Widget[0].$.name = packageJson.name;
                // if there is no file resourse set, then we must add a node in the xml
                if (!result.Entities.Widgets[0].Widget[0].UIResources[0].FileResource) {
                    result.Entities.Widgets[0].Widget[0].UIResources[0] = {};
                    result.Entities.Widgets[0].Widget[0].UIResources[0].FileResource = [];
                }
                // add the ide file
                result.Entities.Widgets[0].Widget[0].UIResources[0].FileResource.push({
                    $: {
                        type: 'JS',
                        file: `${packageJson.name}.ide.bundle.js`,
                        description: '',
                        isDevelopment: 'true',
                        isRuntime: 'false'
                    }
                });
                // add the runtime file
                result.Entities.Widgets[0].Widget[0].UIResources[0].FileResource.push({
                    $: {
                        type: 'JS',
                        file: `${packageJson.name}.runtime.bundle.js`,
                        description: '',
                        isDevelopment: 'false',
                        isRuntime: 'true'
                    }
                });
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

// if the upload is inabled, then add the uploadToThingworxPlugin with the credentials from package.json
if (uploadEnabled) {
    module.exports.plugins.push(
        new UploadToThingworxPlugin({
            thingworxServer: packageJson.thingworxServer,
            thingworxUser: packageJson.thingworxUser,
            thingworxPassword: packageJson.thingworxPassword
        })
    );
}

function UploadToThingworxPlugin(options) {
    this.options = options;
}

UploadToThingworxPlugin.prototype.apply = function (compiler) {
    let options = this.options;
    // this happens in the 'done' phase of the compilation so it will happen at the end
    compiler.plugin('done', function () {
        console.log('Starting widget upload');
        let request = require('request');
        // load the file from the zip folder
        let formData = {
            file: fs.createReadStream(
                path.join(__dirname, 'zip', `${packageJson.name}-${isProduction ? 'min' : 'dev'}-${packageJson.version}.zip`)
            )
        };
        // POST request to the ExtensionPackageUploader servlet
        request
            .post(
                {
                    url: `${options.thingworxServer}/Thingworx/ExtensionPackageUploader?purpose=import`,
                    headers: {
                        'X-XSRF-TOKEN': 'TWX-XSRF-TOKEN-VALUE'
                    },
                    formData: formData
                },
                function (err, httpResponse, body) {
                    if (err) {
                        console.error("Failed to upload widget to thingworx");
                        throw err;
                    }
                    if (httpResponse.statusCode != 200) {
                        throw `Failed to upload widget to thingworx. We got status code ${httpResponse.statusCode} (${httpResponse.statusMessage})`;
                    } else {
                        console.log(`Uploaded widget version ${packageJson.version} to Thingworx!`); 
                    }
                }
            )
            .auth(options.thingworxUser, options.thingworxPassword);
    });
};