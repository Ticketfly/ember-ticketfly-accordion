import Component from 'ember-component';
import layout from '../templates/components/tf-accordion-panel-tab';
import get from 'ember-metal/get';
import { default as computed, readOnly } from 'ember-computed';
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

  attributeBindings: [
    'aria-expanded',
    'aria-selected',
    'aria-controls'
  ],

  classNames: ['tfa-panel-tab'],
  classNameBindings: ['isPanelExpanded:tfa-panel-tab--expanded:tfa-panel-tab--hidden'],

  ariaRole: 'tab',
  isPanelExpanded: false,

  id: '',
  panelBodyID: '',
  title: '',

  /**
   * The `tf-accordion-panel` component.
   *
   * @property panel
   * @type TFAccordion.TFAccordionPanelComponent
   * @default null
   */
  panel: null,

  /**
   * @see {@link https://github.com/BrianSipple/why-am-i-doing-this/blob/master/ember/aria-attribute-binding-in-components.md}
   */
  'aria-expanded': computed('isPanelExpanded', {
    get() {
      return get(this, 'isPanelExpanded') ? 'true' : 'false';
    }
  }),

  'aria-controls': readOnly('panelBodyID'),

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
    get(this, 'panel').registerTab(this);
  },

  _unRegisterWithPanel() {
    get(this, 'panel').unRegisterTab(this);
  }
});
