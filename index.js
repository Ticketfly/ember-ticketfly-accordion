/* global module, process */
'use strict';

var STYLESHEET_NAME = 'ember-ticketfly-accordion';

module.exports = {
  name: 'ember-ticketfly-accordion',

  isDevelopingAddon: function() {
    // ⚠️ Only set this to `true` when you're testing local NPM linking.
    return false;
  },

  _isDummyApp: function(app) {
    return app.name === 'dummy';
  },

  _isOurProject: function(app) {
    return app.project.name() === this.name;
  },

  _isOurDummyApp: function(app) {
    return this._isDummyApp(app) && this._isOurProject(app);
  },

  _shouldImportStyles: function(target) {
    return (
      !process.env.EMBER_CLI_FASTBOOT &&
      (
        (!this._isOurDummyApp(target) || target.env !== 'test') ||
        (this._isOurDummyApp(target) && target.env === 'test')
      )
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
      target.import('vendor/styles/' + STYLESHEET_NAME + '.css');
    }
  }
};
