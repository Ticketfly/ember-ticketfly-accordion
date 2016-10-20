import Component from 'ember-component';
import layout from '../templates/components/tf-accordion';
import get from 'ember-metal/get';
import computed from 'ember-computed';
import { A } from 'ember-array/utils';

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

  didInsertElement() {
    this._super(...arguments);

    this._calculateGeometries();
  },

  /**
   * Adds a panel from the `panels` array 
   * 
   * @metod registerPanel
   * @param {TFAccordion.TFAccordionPanel Component} panel
   */
  registerPanel(panel) {
    get(this, 'panels').addObject(panel);
  },

  /**
   * Removes a panel from the `panels` array 
   * 
   * @metod unRegisterPanel
   * @param {TFAccordion.TFAccordionPanel Component} panel
   */
  unRegisterPanel(panel) {
    get(this, 'panels').removeObject(panel);
  },

  _calculateGeometries() {
    get(this, 'panels').forEach(panel => {
      
    });
  }
});
