import Component from 'ember-component';
import layout from '../templates/components/tf-accordion-panel';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import computed from 'ember-computed';
import { guidFor } from 'ember-metal/utils';

/**
 * @module tf-accordion
 */

/**
 * @class TFAccordionPanelComponent
 * @namespace TFAccordion
 * @extends Ember.Component
 *
 * This component wraps a
 * `tf-accordion-panel-tab` and `tf-accordion-panel-body` component
 */
export default Component.extend({
  layout,
  classNames: ['tfa-panel'],
  classNameBindings: ['expandedClassNames'],

  /* ---------- API ---------- */

  /**
   * a unique ID for this panel's child tab, which will
   * be generated on init
   *
   * @property tabID
   * @type String
   */
  tabID: '',

  /**
   * a unique ID for this panel's child body, which will
   * be generated on init
   *
   * @property panelBodyID
   * @type String
   */
  panelBodyID: '',

  /**
   * An optional title that can be used as the content for
   * this panel's child tab text
   *
   * @property tabTitle
   * @type String
   */
  tabTitle: '',

  /**
   * An optional text content that can be used as the content for
   * this panel's child panel text
   *
   * @property bodyContent
   * @type String
   */
  bodyContent: '',

  /**
   * A custom class to apply to the panel tab element when
   * the containing panel is expanded. This will be passed to
   * this component's child panel when if supplied during non-block usage
   *
   * @property panelExpandedClass
   * @type String
   */
  panelExpandedTabClass: '',

  /**
   * An optional className that can used in addition to the
   * built-in className for this panel's child tab
   *
   * @property tabClassName
   * @type String
   */
  tabClassName: '',

  /**
   * An optional className that can used in addition to the
   * built-in className for this panel's child body
   *
   * @property bodyClassName
   * @type String
   */
  bodyClassName: '',

  /**
   * The instance object of the `tf-accordion` component that
   * this panel belongs to.
   *
   * @property accordion
   * @type TFAccordion.TFAccordionComponent
   */
  accordion: null,

  /**
   * The instance object of the `tf-accordion-panel-tab` component
   * that this panel belongs to.
   *
   * @property tab
   * @type TFAccordion.TFAccordionPanelTabComponent
   */
  tab: null,

  /**
   * The instance object of the `tf-accordion-panel-body` component
   * that this panel belongs to.
   *
   * @property panelBody
   * @type TFAccordion.TFAccordionPanelBodyComponent
   */
  panelBody: null,

  /**
   * Tracks whether or not the body for this panel is expanded
   *
   * @property isExpanded
   * @type Boolean
   * @default false
   */
  isExpanded: false,

  /**
   * Tracks whether or not the body for this panel is "in motion",
   * i.e: whether or not its animating from an expanded state to
   * a collapsed state
   *
   * @property isInMotion
   * @type Boolean
   * @default false
   */
  isInMotion: false,

  /* ---------- COMPUTEDS ---------- */

  /**
   * A custom class to apply to the panel element when
   * it is expanded.
   *
   * @property panelExpandedClass
   * @type String
   */
  expandedClassNames: computed('isExpanded', {
    get() {
      if (get(this, 'isExpanded')) {
        return `tfa-panel--expanded ${get(this, 'expandedClassName') || ''}`;
      }
    }
  }).readOnly(),

  /* ---------- LIFECYCLE ---------- */

  /**
   * @override
   */
  init() {
    this._super(...arguments);

    this._initTabID();
    this._initPanelBodyID();
    this._registerWithAccordion();
  },

  /**
   * @override
   */
  willDestroyElement() {
    this._super(...arguments);

    this._unRegisterWithAccordion();
  },

  /* ---------- PUBLIC METHODS ---------- */

  /**
   * Registers this panel's tab component
   *
   * @method registerTab
   * @param {TFAccordion.TFAccordionPanelTabComponent} tab
   * @public
   */
  registerTab(tab) {
    set(this, 'tab', tab);
  },

  /**
   * Un-registers this panel's tab component
   *
   * @method unRegisterTab
   * @public
   */
  unRegisterTab() {
    set(this, 'tab', null);
  },

  /**
   * registers this panel's body
   *
   * @method registerPanelBody
   * @param {TFAccordion.TFAccordionPanelBodyComponent} panelBody
   * @public
   */
  registerPanelBody(panelBody) {
    set(this, 'panelBody', panelBody);
  },

  /**
   * Un-registers this panel's body
   *
   * @method unRegisterPanelBody
   * @public
   */
  unRegisterPanelBody() {
    set(this, 'panelBody', null);
  },

  /* ---------- PRIVATE METHODS ---------- */

  _initTabID() {
    this.tabID = `tf-accordion-panel-tab--${guidFor(this)}`;
  },

  _initPanelBodyID() {
    this.panelBodyID = `tf-accordion-panel-body--${guidFor(this)}`;
  },

  _registerWithAccordion() {
    get(this, 'accordion').registerPanel(this);
  },

  _unRegisterWithAccordion() {
    get(this, 'accordion').unRegisterPanel(this);
  }
});
