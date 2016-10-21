import Component from 'ember-component';
import layout from '../templates/components/tf-accordion-panel-body';
import get from 'ember-metal/get';
import { not } from 'ember-computed';
import { once } from 'ember-runloop';

/**
 * @module tf-accordion
 */

/**
 * @class TFAccordionPanelBodyComponent
 * @namespace TFAccordion
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  hook: 'tf-accordion-panel-body',

  attributeBindings: [
    'tabID:aria-labelledby', 
    'isHidden:aria-hidden'
  ],

  classNames: ['tf-accordion-panel-body'],

  tabID: '',
  content: '',
  isPanelExpanded: false,

  ariaRole: 'tabpanel',  
  isHidden: not('isPanelExpanded'),

  /**
   * The `tf-accordion-panel` component.
   *
   * @property panel
   * @type TFAccordion.TFAccordionPanelComponent
   * @default null
   */
  panel: null,

  /* ---------- LIFECYCLE ---------- */

  init() {
    this._super(...arguments);

    once(this, this._registerWithPanel);
  },

  willDestroyElement() {
    this._super(...arguments);

    once(this, this._unRegisterWithPanel);
  },

  /* ---------- PRIVATE METHODS ---------- */
  
  _registerWithPanel() {
    get(this, 'panel').registerPanelBody(this);
  },

  _unRegisterWithPanel() {
    get(this, 'panel').unRegisterPanelBody(this);
  }
});
