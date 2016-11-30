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
    'aria-hidden',
    'isHidden:hidden'
  ],

  classNames: ['tfa-panel-body'],

  tabID: '',
  content: '',

  /**
   * Tracks whether or not the panel that this body belongs to is expanded.
   * This is bound to the computed function for determining
   * the value of this component's element's `aria-hidden` property
   *
   * @property isPanelExpanded
   * @type Boolean
   * @default false
   */
  isPanelExpanded: false,

  /**
   * Bound to the `role` attribute of the `tf-accordion-panel-body` component's element.
   *
   * See http://www.w3.org/TR/wai-aria/roles#tabpanel
   *
   * @property ariaRole
   * @type String
   * @default 'tabpanel'
   */
  ariaRole: 'tabpanel',

  /* ---------- COMPUTEDS ---------- */

  /**
   * Bound to the `hidden` attribute on this component's element.
   *
   * @see {@link https://developer.mozilla.org/en/docs/Web/HTML/Global_attributes/hidden}
   * @property isHidden
   * @type String
   */
  isHidden: not('isPanelExpanded'),

  /**
   * Bound to the `aria-hidden` attribute on this component's element.
   *
   * @see {@link https://www.w3.org/TR/wai-aria-practices-1.1/#accordion}
   * @see {@link https://github.com/BrianSipple/why-am-i-doing-this/blob/master/ember/aria-attribute-binding-in-components.md}
   * @property aria-hidden
   * @type String
   * @default 'false'
   * @readOnly
   */
  'aria-hidden': computed('isHidden', {
    get() {
      return get(this, 'isHidden') ? 'true' : 'false';
    }
  }).readOnly(),

  /**
   * The instance object of the `tf-accordion-panel` component to
   * which this panel body belongs.
   *
   * @property panel
   * @type TFAccordion.TFAccordionPanelComponent
   * @default null
   */
  panel: null,

  /* ---------- LIFECYCLE ---------- */

  /**
   * @override
   */
  init() {
    this._super(...arguments);

    scheduleOnce('actions', this, this._registerWithPanel);
  },

  /**
   * @override
   */
  didReceiveAttrs({ oldAttrs }) {
    this._super(...arguments);

    if (oldAttrs && !!oldAttrs.isPanelExpanded) {
      const wasPanelExpanded = !!oldAttrs.isPanelExpanded.value;

      if (get(this, 'isPanelExpanded') !== wasPanelExpanded) {
        get(this, 'accordion').send('_panelBodyExpansionWasChanged', get(this, 'panel'), get(this, 'isPanelExpanded'));
      }
    }
  },

  /**
   * @override
   */
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
