let runLoaders = require('../lib/LoaderRunner')
let fs = require('fs')
let path = require('path');
let resource = path.resolve(__dirname, 'index.js?name=wanglu&age=18');
let loaders = [path.resolve(__dirname, 'loader.js'), path.resolve(__dirname, 'loader1.js')];
debugger;
runLoaders.runLoaders({
    resource: resource,
    // String: Absolute path to the resource (optionally including query string)

    loaders: loaders,
    // String[]: Absolute paths to the loaders (optionally including query string)
    // {loader, options}[]: Absolute paths to the loaders with options object

    context: {minimize: true},
    // Additional loader context which is used as base context
    readResource: fs.readFile.bind(fs)
    // A function to read the resource
    // Must have signature function(path, function(err, buffer))

}, function (err, result) {
    // err: Error?

    // result.result: Buffer | String
    // The result

    // result.resourceBuffer: Buffer
    // The raw resource as Buffer (useful for SourceMaps)

    // result.cacheable: Bool
    // Is the result cacheable or do it require reexecution?

    // result.fileDependencies: String[]
    // An array of paths (files) on which the result depends on

    // result.contextDependencies: String[]
    // An array of paths (directories) on which the result depends on
})
