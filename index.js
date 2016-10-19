/* global module, require */
'use strict';

var path = require('path');

module.exports = {
  name: 'ember-ticketfly-accordion',

  // 📋 TODO: Remember to remove
  isDevelopingAddon: function() {
    return true;
  },

  _isOwnDummyApp: function(app) {
    return app.name === 'dummy' && app.project.name() === this.name;
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
    this._consumingTarget = target; 

    // if (!this._isAddon()) {
    //   target.import('vendor/ember-ticketfly-accordion-core.css');
    // }
    if (!this._isOwnDummyApp(target)) {
      target.import('vendor/ember-ticketfly-accordion-core.css');
    }
  },

  treeForVendor: function(node) {
    // return this._isAddon() ? node : path.join(this.project.nodeModulesPath, this.name, 'app', 'styles');
    // return path.join(this.project.nodeModulesPath, this.name, 'app', 'styles');
    return this._isOwnDummyApp(this._consumingTarget) ? 
      node 
      : 
      path.join(this.project.nodeModulesPath, this.name, 'app', 'styles');
  }
};
