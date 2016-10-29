import Component from 'ember-component';
import layout from '../templates/components/tf-accordion-panel-body';
import get from 'ember-metal/get';
import { default as computed, not } from 'ember-computed';
import { scheduleOnce } from 'ember-runloop';

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

  attributeBindings: [
    'tabID:aria-labelledby',
    'aria-hidden'
  ],

  classNames: ['tf-accordion-panel-body'],

  tabID: '',
  content: '',
  isPanelExpanded: false,

  ariaRole: 'tabpanel',
  isHidden: not('isPanelExpanded'),

  /**
   * @see {@link https://github.com/BrianSipple/why-am-i-doing-this/blob/master/ember/aria-attribute-binding-in-components.md}
   */
  'aria-hidden': computed('isHidden', {
    get() {
      return get(this, 'isHidden') ? 'true' : 'false';
    }
  }).readOnly(),

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

    scheduleOnce('actions', this, this._registerWithPanel);
  },

  willDestroyElement() {
    this._super(...arguments);

    scheduleOnce('actions', this, this._unRegisterWithPanel);
  },

  /* ---------- PRIVATE METHODS ---------- */

  _registerWithPanel() {
    get(this, 'panel').registerPanelBody(this);
  },

  _unRegisterWithPanel() {
    get(this, 'panel').unRegisterPanelBody(this);
  }
});
