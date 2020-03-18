# Starter kit of a widget using webpack and typescript

This repository contains an example that can act as a starter kit for building widget using modern web development techniques like [webpack](https://webpack.js.org/) and [typescript](https://www.typescriptlang.org/) and [babel](https://babeljs.io/).

## Why use it

There are many advantages to this, and here's some of them:

### Webpack advantages

* Because of *dynamic imports and require calls*, webpack can load javascript files and other resources only they are needed. So, if you are using a very big external library, this library is only loaded if the widget is used in a mashup, rather than being always loaded in the `CombinedExtensions.js` files.
* *Better resource management*: You can load a resource (like images, xml files, css) only if it's used in the widget, and you'll no longer have to care about where to put it and how to package it. Also, the webpack loader will inline small files for better network performance.
* *Automatic dependency management*: Webpack can be very easily integrated with the `npm` repositories, so this brings automatic dependency management. You'll no longer have to manually download libraries from the web, struggle to add all the dependencies and so on. Instead, `npm`, which functions similarly to maven central, handles all of this.
* *Easily develop and test the widget outside of thingworx*: By doing the initial development and testing in a simple html page, it reduces the waiting times of publishing widget, doing reloads, etc...
* *Allows using of different loaders*: You can develop your code in multiple languages, and use transpilers to convert you code javascript code that works in older javascript version. One of this languages, is typescript.

### Typescript

* Typescript is a superscript of javascript with types.
* Optional static typing (the key here is optional)
* Type Inference, which gives some of the benefits of types, without actually using them
* Access to ES6 and ES7 features, before they become supported by major browsers
* The ability to compile down to a version of JavaScript that runs on all browsers
* Great tooling support with IntelliSense

## Using the widget template

### Required software

The following software is required:

* [NodeJS](https://nodejs.org/en/) needs to be installed and added to the `PATH`. You should use the LTS version.

The following software is recommended:

* [Visual Studio Code](https://code.visualstudio.com/): An integrated developer enviroment with great typescript support. You can also use any IDE of your liking, it just that most of the testing was done using VSCode.

### Proposed folder structure

```
demoWebpackTypescriptWidget
│   README.md         // this file
│   package.json      // here you specify project name, homepage and dependencies. This is the only file you should edit to start a new project
│   tsconfig.json     // configuration for the typescript compiler
│   webpack.config.js // configuration for webpack
│   metadata.xml      // thingworx metadata file for this widget. This is automatically generated based on your package.json
│   index.html        // when testing the widget outside of thingworx, the index file used.
└───Entities          // Thingworx XML entities that are part of the widget. This can be Things, StyleDefinitions, etc. They can be exported using the SourceControl export functionality in Thingworx.
└───src               // main folder where your developement will take place
│   │   index.ts               // source file used when testing the widget outside of twx
│   │   demoWebpack.ide.ts     // source file for the Composer section of the widget
│   │   demoWebpack.runtime.ts // source file for the Runtime section of the widget
│   └───internalLogic          // usually, put the enternal logic into a separate namespace
│   │   │   file1.ts           // typescript file with internal logic
│   │   │   file2.js           // javascript file in ES2015 with module
│   │   │   ...
│   └───styles        // folder for css styles that you can import into your app using require statements
│   └───images        // folder for image resources you are statically including using require statements
│   └───static        // folder for resources that are copied over to the development extension. Think of folder of images that you reference only dynamically
└───build         // temporary folder used during compilation
└───zip               // location of the built extension
```

### Developing a new widget

In order to start developing a new widget using this template you need to do the following:

1. Clone this repository
    ```
    git clone http://roicentersvn.ptcnet.ptc.com/placatus/DemoWebpackWidget.git
    ```
2. Open `package.json` and configure the `name`, `description`, and other fields you find relevant
3. Run `yarn install`. This will install the development dependencies for this project.
4. Run `yarn run init`. This will create sample runtime and ide typescript files using the name.
5. Start working on your widget.

### Adding dependencies

Dependencies can be added from [npm](https://www.npmjs.com/), using the `yarn install DEPENDENCY_NAME --save` command, or by adding them directly to `package.json`, under `dependencies`. After adding them to `package.json`, you should run `yarn install`.
If you are using a javascript library that also has typescript mappings you can install those using `yarn install --save @types/DEPENDENCY_NAME`.

### Building and publishing

The following commands allow you to build and compile your widget:

* `yarn run build`: builds the production version of the widget. Creates a new extension zip file under the `zip` folder. The production version is optimized for sharing and using in production environments.
* `yarn run upload`: creates a build, and uploads the extension zip to the thingworx server configured in `package.json`. The build is created for development, with source-maps enabled.
* `yarn run buidDev`: builds the development version of the widget. Creates a new extension zip file under the `zip` folder.The build is created for development, with source-maps enabled.

## Example of widgets that use this starter kit

* [SVGViewer](https://github.com/ptc-iot-sharing/SvgViewerWidgetTWX): Allows viewing, interacting and manipulating SVG files in Thingworx. Contains examples of using external libraries.
* [Calendar](https://github.com/ptc-iot-sharing/CalendarWidgetTWX): A calendar widget for Thingworx built using the fullcalendar library.  Contains examples of using external libraries as well as referencing global external libraries without including them in the built package.
