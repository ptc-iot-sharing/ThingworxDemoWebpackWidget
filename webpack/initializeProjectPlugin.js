class InitializeProject {
    apply(compiler) {
        compiler.hooks.run.tap('InitializeProjectPlugin', function () {
            console.log(`Generating widget with name: ${packageName}`);
            // rename the ide.ts and runtime.ts files
            fs.renameSync('src/demoWebpack.ide.ts', `src/${packageName}.ide.ts`);
            fs.renameSync('src/demoWebpack.runtime.ts', `src/${packageName}.runtime.ts`);
        });
    }
}

module.exports = InitializeProject;
