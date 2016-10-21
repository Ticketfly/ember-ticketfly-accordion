import Component from 'ember-component';
import layout from '../templates/components/tf-accordion-panel-toggle';
import get from 'ember-metal/get';
import { once } from 'ember-runloop';

/**
 * @module tf-accordion
 */

/**
 * @class TFAccordionPanelToggleComponent
 * @namespace TFAccordion
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: 'button',
  hook: 'tf-accordion-panel-toggle',  
  
  attributeBindings: ['isPanelExpanded:aria-expanded'],
  classNames: ['tf-accordion-panel-toggle'],

  ariaRole: 'tab',
  isPanelExpanded: false,

  id: '',
  title: '',

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
    get(this, 'panel').registerToggleHeader(this);
  },

  _unRegisterWithPanel() {
    get(this, 'panel').unRegisterToggleHeader(this);
  }
});
