import Component from 'ember-component';
import layout from '../templates/components/tf-accordion';
import get from 'ember-metal/get';
import { default as computed, notEmpty } from 'ember-computed';
import { A } from 'ember-array/utils';

// TODO: Enable this for retrieving animation settings
// import TFAccordionConfig from 'ember-ticketfly-accordion/configuration'; 

/**
 * @module tf-accordion
 */

/**
 * @class TFAccordionComponent
 * @namespace TFAccordion
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  hook: 'tf-accordion',
  classNames: ['tf-accordion'],
  attributeBindings: ['aria-multiselectable'],

  ariaRole: 'tablist',
  'aria-multiselectable': 'true',

  panels: computed(function() {
    return A();
  }),

  hasPanels: notEmpty('panels'),

  /* ---------- LIFECYCLE ---------- */
  didInsertElement() {
    this._super(...arguments);

    this._calculateGeometries();
  },

  willDestroyElement() {
    this._super(...arguments);

    set(this, 'panels', null);
  },

  /* ---------- PUBLIC METHODS ---------- */

  /**
   * Adds a panel from the `panels` array 
   * 
   * @method registerPanel
   * @param {TFAccordion.TFAccordionPanel Component} panel
   * @public
   */
  registerPanel(panel) {
    get(this, 'panels').addObject(panel);
  },

  /**
   * Removes a panel from the `panels` array 
   * 
   * @method unRegisterPanel
   * @param {TFAccordion.TFAccordionPanel Component} panel
   * @public
   */
  unRegisterPanel(panel) {
    get(this, 'panels').removeObject(panel);
  },


  /* ---------- PRIVATE METHODS ---------- */
  
  /**
   * 
   * @method _calculateGeometries
   * @private
   */
  _calculateGeometries() {
    if (!get(this, 'hasPanels')) {
      return;
    }

    get(this, 'panels').forEach(panel => {
      if (get(panel, 'isExpanded')) {

      }
    });
  }
});
