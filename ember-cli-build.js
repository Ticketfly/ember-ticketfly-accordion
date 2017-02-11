/* global require, module */
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
var cssNext = require('postcss-cssnext');
var cssImport = require('postcss-import');

module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    // Add options here
    postcssOptions: {
      compile: {
        enabled: true,
        plugins: [
          { module: cssImport },
          { module: cssNext }
        ]
      }
    },
    svg: {
      paths: [
        'tests/dummy/public/assets/inline-svg'
      ]
    },
    svgstore: {
      excludeSourceFiles: true, // exclude all processed source files
      files: {
        sourceDirs: [ 'tests/dummy/public/assets/icons' ],
        outputFile: '/assets/icons.svg',
        excludeSourceFiles: true // exclude source files only for this master SVG
      }
    },
    snippetPaths: [
      'tests/dummy/app/snippets',
      'tests/dummy/app/styles/ui-components',
      'vendor/styles'
    ]
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree();
};
