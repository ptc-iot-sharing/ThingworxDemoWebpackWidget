import { mergeWithCustomize, customizeObject } from 'webpack-merge';
import { createConfig } from './webpack/webpack.common';

module.exports = (env, argv) =>
    mergeWithCustomize({
        customizeObject: customizeObject({
            entry: 'replace',
            externals: 'replace',
        }),
    })(createConfig(env, argv), {
        entry: {
            // the entry point when viewing the index.html page
            htmlDemo: './src/browser/index.ts',
            // the entry point for the runtime widget
            widgetRuntime: `./src/runtime/index.ts`,
            // the entry point for the ide widget
            widgetIde: `./src/ide/index.ts`,
        },
        // moment is available directly on window inside the thingworx runtime and mashup builder
        externals: { moment: 'moment' },
    });
