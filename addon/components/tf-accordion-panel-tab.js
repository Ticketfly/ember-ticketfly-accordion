import Component from 'ember-component';
import layout from '../templates/components/tf-accordion-panel-tab';
import get from 'ember-metal/get';
import { default as computed, readOnly } from 'ember-computed';
import { once } from 'ember-runloop';

/**
 * @module tf-accordion
 */

/**
 * @class TFAccordionPanelTabComponent
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
  classNameBindings: ['_panelExpandedClassNames'],

  /**
   * Bound to the `role` attribute of the `tf-accordion-panel-tab` component's element.
   *
   * See http://www.w3.org/TR/wai-aria/roles#tab
   *
   * @property ariaRole
   * @type String
   * @default 'tab'
   */
  ariaRole: 'tab',

  /**
   * Tracks whether or not the panel that this tab belongs to is expanded.
   * This is bound to the computed function for determining
   * the value of this component's element's `aria-expanded` property
   *
   * @property isPanelExpanded
   * @type Boolean
   * @default false
   */
  isPanelExpanded: false,

  /**
   * The id of the element for this tab's sibling panel body component
   *
   * @property panelBodyID
   * @type String
   */
  panelBodyID: '',

  /**
   * The id of the element for this tab's sibling panel body component
   *
   * @property panelBodyID
   * @type String
   */
  title: '',

  /**
   * The instance object of the `tf-accordion` component that
   * this tab's panel belongs to.
   *
   * @property accordion
   * @type TFAccordion.TFAccordionComponent
   */
  accordion: null,

  /**
   * The instance object of the `tf-accordion-panel` component to
   * which this panel tab belongs.
   *
   * @property panel
   * @type TFAccordion.TFAccordionPanelComponent
   */
  panel: null,

  /**
   * A custom class to apply to the panel tab element when
   * its containing panel is expanded.
   *
   * @property expandedClassName
   * @type String
   */
  expandedClassName: '',

  /* ---------- COMPUTEDS ---------- */

  /**
   * Bound to the `aria-expanded` attribute on this component's element.
   *
   * @see {@link https://www.w3.org/TR/wai-aria-practices-1.1/#accordion}
   * @see {@link https://github.com/BrianSipple/why-am-i-doing-this/blob/master/ember/aria-attribute-binding-in-components.md}
   * @property aria-expanded
   * @type String
   * @default 'false'
   * @readOnly
   */
  'aria-expanded': computed('isPanelExpanded', {
    get() {
      return get(this, 'isPanelExpanded') ? 'true' : 'false';
    }
  }).readOnly(),

  /**
   * Class names to apply to the panel tab element when
   * its containing panel is expanded.
   *
   * @property _panelExpandedClassNames
   * @type String
   * @private
   */
  _panelExpandedClassNames: computed('isPanelExpanded', 'expandedClassName', {
    get() {
      if (get(this, 'isPanelExpanded')) {
        return `tfa-panel-tab--expanded ${get(this, 'expandedClassName') || ''}`;
      }
    }
  }).readOnly(),

  /**
   * Bound to the `aria-controls` attribute on this component's element.
   * This identifies the element -- in this case, our sibling panel body --
   * whose contents or presence are controlled by the current element.
   *
   * (There's a bit of skepticism as to what purpose this property serves, but
   * we'll follow the spec for the time being.)
   *
   * @see {@link https://www.w3.org/TR/wai-aria/states_and_properties#aria-controls}
   * @property aria-controls
   * @type String
   * @readOnly
   */
  'aria-controls': readOnly('panelBodyID'),

  /* ---------- LIFECYCLE ---------- */

  /**
   * @override
   */
  init() {
    this._super(...arguments);

    once(this, this._registerWithPanel);
  },

  /**
   * @override
   */
  willDestroyElement() {
    this._super(...arguments);

    once(this, this._unRegisterWithPanel);
  },

  /* ---------- EVENT HANDLERS ---------- */

  /**
   * When the `click` DOM event fires on the element, trigger the
   * root `tf-accordion` component's action with the panel component
   */
  click(/* event */) {
    get(this, 'accordion').send('_onPanelSelection', get(this, 'panel'));
  },

  /**
   * When the `touchEnd` DOM event fires on the element, trigger the
   * root `tf-accordion` component's action with the panel component
   */
  touchEnd(/* event */) {
    get(this, 'accordion').send('_onPanelSelection', get(this, 'panel'));
  },

  /**
   * When the `focusIn` DOM event fires on the element, trigger the
   * root `tf-accordion` component's action with the panel component
   * and the jQuery event.
   */
  focusIn(event) {
    get(this, 'accordion').handlePanelEvent('onPanelTabFocusIn', get(this, 'panel'), event);
  },

  /**
   * When the `focusOut` DOM event fires on the element, trigger the
   * root `tf-accordion` component's action with the panel component
   * and the jQuery event.
   */
  focusOut(event) {
    get(this, 'accordion').handlePanelEvent('onPanelTabFocusOut', get(this, 'panel'), event);
  },

  /* ---------- PRIVATE METHODS ---------- */

  _registerWithPanel() {
    get(this, 'panel').registerTab(this);
  },

  _unRegisterWithPanel() {
    get(this, 'panel').unRegisterTab(this);
  }
});
