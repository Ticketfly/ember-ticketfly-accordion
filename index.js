/* global module, require, process */
'use strict';

var path = require('path');

var STYLESHEETS = {
  core: 'ember-ticketfly-accordion-core',
  spiffy: 'ember-ticketfly-accordion-spiffy',
  animations: 'ember-ticketfly-accordion-animation',
};

module.exports = {
  name: 'ember-ticketfly-accordion',

  // 📋 TODO: Remember to remove
  isDevelopingAddon: function() {
    return true;
  },

  _isDummyApp: function(app) {
    return app.name === 'dummy';
  },

  _isOwnProject: function(app) {
    return app.project.name() === this.name;
  },

  _isOwnDummyApp: function(app) {
    return this._isDummyApp(app) && this._isOwnProject(app);
  },

  _shouldImportStyles: function(target) {
    return (
      !process.env.EMBER_CLI_FASTBOOT &&
      (!this._isOwnDummyApp(target) || target.env !== 'test') &&
      target.env !== 'test'
    );
  },

  _isAddon: function() {
    var keywords = this.project.pkg.keywords;

    return Array.isArray(keywords) && keywords.indexOf('ember-addon') !== -1;
  },

  /**
   * TODO: Add stylesheets with different concerns (for example,
   * "ember-ticketfly-accordion-animation"), and make their inclusion
   * configurable
   */
  included: function(app, parentAddon) {
    this._super.included.apply(this, arguments);
    
    // Ensures that imports work for nested addons and engines
    // @see: https://github.com/ember-cli/ember-cli/issues/3718
    var parentApp = (typeof app.import !== 'function' && app.app) ? app.app : app;
    var target = parentAddon || parentApp;
    
    this._target = target; 
    this._targetConfig = this.project.config(this.app.env)['ember-ticketfly-accordion'] || {};

    if (this._shouldImportStyles(target)) {
      var stylesToImport = this._targetConfig.importedStyles || {};
      
      var filesToImport = Object.keys(STYLESHEETS)
        .filter(function(key) {
          return key === 'core' || stylesToImport[key];
        })
        .map(function (key) {
          return STYLESHEETS[key]; // ES6... ��
        });

      filesToImport.forEach(function (fileName) {
        target.import('vendor/' + fileName + '.css');
      });
    }
  },

  treeForVendor: function(node) {
    // return this._isAddon() ? node : path.join(this.project.nodeModulesPath, this.name, 'app', 'styles');
    // return path.join(this.project.nodeModulesPath, this.name, 'app', 'styles');
    return this._isOwnDummyApp(this._target) ? 
      path.join(process.cwd(), 'app', 'styles') 
      : 
      path.join(this.project.nodeModulesPath, this.name, 'app', 'styles');
  }
};
