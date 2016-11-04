import Component from 'ember-component';
import layout from '../templates/components/tf-accordion-panel';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import { isEmpty } from 'ember-utils';
import { guidFor } from 'ember-metal/utils';
import { scheduleOnce } from 'ember-runloop';

/**
 * @module tf-accordion
 */

/**
 * @class TFAccordionPanelComponent
 * @namespace TFAccordion
 * @extends Ember.Component
 *
 * This component wraps a
 *  `tf-accordion-panel-tab` and `tf-accordion-panel-body` component
 */
export default Component.extend({
  layout,
  classNames: ['tf-accordion-panel'],

  /* ---------- API ---------- */
  tabID: '',
  panelBodyID: '',
  tabTitle: '',
  bodyContent: '',
  tabClassName: '',
  bodyClassName: '',
  handleSelection: null,

  /**
   * The `tf-accordion` component.
   *
   * @property accordion
   * @type TFAccordion.TFAccordionComponent
   * @default null
   */
  accordion: null,

  /**
   * The `tf-accordion-panel-tab` component.
   *
   * @property tab
   * @type TFAccordion.TFAccordionPaneltabComponent
   * @default null
   */
  tab: null,

  /**
   * The `tf-accordion-panel-body` component.
   *
   * @property panelBody
   * @type TFAccordion.TFAccordionPanelBodyComponent
   * @default null
   */
  panelBody: null,

  isExpanded: false,

  /* ---------- LIFECYCLE ---------- */

  init() {
    this._super(...arguments);

    this._initTabID();
    this._initPanelBodyID();

    this._registerWithAccordion();
    this._initEventListeners();
  },

  didInsertElement() {
    this._super(...arguments);

    scheduleOnce('actions', this, this._addListeners);
  },

  willDestroyElement() {
    this._super(...arguments);

    this._unRegisterWithAccordion();
    this._removeListeners();
  },


  /* ---------- PUBLIC METHODS ---------- */

  /**
   * Registers this panel's tab header
   *
   * @method registerTab
   * @param {TFAccordion.TFAccordionPaneltab Component} tab
   * @public
   */
  registerTab(tab) {
    set(this, 'tab', tab);
  },

  /**
   * Un-registers this panel's tab header
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
  },

  _initEventListeners() {
    this.handleSelection = function _handlePanelSelection(event) {
      event.preventDefault();

      get(this, 'onSelect')(this);
    }.bind(this);
  },

  _addListeners() {
    const headerButton = get(this, 'tab.element');

    if (!isEmpty(headerButton)) {
      headerButton.addEventListener('click', this.handleSelection, false);
      headerButton.addEventListener('touchEnd', this.handleSelection, false);
    }
  },

  _removeListeners() {
    const headerButton = get(this, 'tab.element');

    if (!isEmpty(headerButton)) {
      headerButton.removeEventListener('click', this.handleSelection, false);
      headerButton.removeEventListener('touchEnd', this.handleSelection, false);
    }

    this.handleSelection = null;
  },
});
