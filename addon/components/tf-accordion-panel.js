import Component from 'ember-component';
import layout from '../templates/components/tf-accordion-panel';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import { guidFor } from 'ember-metal/utils';
import { once } from 'ember-runloop';


/**
 * @module tf-accordion
 */

/**
 * @class TFAccordionPanelComponent
 * @namespace TFAccordion
 * @extends Ember.Component
 * 
 * This component wraps a
 *  `tf-accordion-panel-toggle` and `tf-accordion-panel-body` component
 */
export default Component.extend({
  layout,
  hook: 'tf-accordion-panel',
  classNames: ['tf-accordion-panel'],

  tabID: '',
  tabTitle: '',
  panelContent: '',
  isExpanded: false,
  
  /**
   * The `tf-accordion` component.
   *
   * @property accordion
   * @type TFAccordion.TFAccordionComponent
   * @default null
   */
  accordion: null,

  /**
   * The `tf-accordion-panel-toggle` component.
   *
   * @property toggleHeader
   * @type TFAccordion.TFAccordionPanelToggleComponent
   * @default null
   */
  toggleHeader: null,

  /**
   * The `tf-accordion-panel-body` component.
   *
   * @property panelBody
   * @type TFAccordion.TFAccordionPanelBodyComponent
   * @default null
   */
  panelBody: null,

  /* ---------- LIFECYCLE ---------- */

  init() {
    this._super(...arguments);

    this.tabID = this._initTabID(); 
    once(this, this._registerWithAccordion);
  },

  willDestroyElement() {
    this._super(...arguments);

    once(this, this._unRegisterWithAccordion);
  },

  /* ---------- ACTIONS ---------- */

  actions: {
    togglePanel() {

    }
  },

  /* ---------- PUBLIC METHODS ---------- */

  /**
   * Registers this panel's toggle header
   * 
   * @method registerToggleHeader
   * @param {TFAccordion.TFAccordionPanelToggle Component} toggleHeader
   * @public
   */
  registerToggleHeader(toggleHeader) {
    set(this, 'toggleHeader', toggleHeader);
  },

  /**
   * Un-registers this panel's toggle header
   * 
   * @method unRegisterToggleHeader
   * @public
   */
  unRegisterToggleHeader() {
    set(this, 'toggleHeader', null);
  },

  /**
   * registers this panel's body
   * 
   * @method registerPanelBody
   * @param {TFAccordion.TFAccordionPanelBody Component} panelBody
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
    return `tf-accordion-panel-toggle--${guidFor(this)}`;
  },

  _registerWithAccordion() {
    get(this, 'accordion').registerPanel(this);
  },

  _unRegisterWithAccordion() {
    get(this, 'accordion').unRegisterPanel(this);
  }
});
