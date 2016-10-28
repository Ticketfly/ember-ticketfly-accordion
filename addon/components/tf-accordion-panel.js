import Component from 'ember-component';
import layout from '../templates/components/tf-accordion-panel';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import computed from 'ember-computed';
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
 *  `tf-accordion-panel-toggle` and `tf-accordion-panel-body` component
 */
export default Component.extend({
  layout,
  hook: 'tf-accordion-panel',
  classNames: ['tf-accordion-panel'],

  /* ---------- API ---------- */

  tabID: '',
  tabTitle: '',
  panelContent: '',
  headerClassName: '',
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

  isExpanded: false,

  /* ---------- LIFECYCLE ---------- */

  init() {
    this._super(...arguments);

    this._initTabID();
    scheduleOnce('actions', this, this._registerWithAccordion);
    scheduleOnce('actions', this, this._initEventListeners);
  },

  didInsertElement() {
    this._super(...arguments);

    scheduleOnce('actions', this, this._addListeners, 'add');
  },

  willDestroyElement() {
    this._super(...arguments);

    scheduleOnce('actions', this, this._unRegisterWithAccordion);
    scheduleOnce('actions', this, this._removeListeners, 'remove');
  },

  /* ---------- ACTIONS ---------- */

  // actions: {
  //   togglePanel() {

  //   }
  // },

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
    this.tabID = `tf-accordion-panel-toggle--${guidFor(this)}`;
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
    const headerButton = get(this, 'toggleHeader.element');

    if (!isEmpty(headerButton)) {
      headerButton.addEventListener('click', this.handleSelection, false);
      headerButton.addEventListener('touchEnd', this.handleSelection, false);
    }
  },

  _removeListeners() {
    const headerButton = get(this, 'toggleHeader.element');

    if (!isEmpty(headerButton)) {
      headerButton.removeEventListener('click', this.handleSelection, false);
      headerButton.removeEventListener('touchEnd', this.handleSelection, false);
    }

    this.handleSelection = null;
  },
});
