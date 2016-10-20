import Component from 'ember-component';
import layout from '../templates/components/tf-accordion-panel';
import get from 'ember-metal/get';
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

  init() {
    this._super(...arguments);

    this.tabID = this._initTabID(); 
    once(this, this._registerWithAccordion);
  },

  actions: {
    togglePanel() {

    }
  },

  _initTabID() {
    return `tf-accordion-panel-toggle--${guidFor(this)}`;
  },

  _registerWithAccordion() {
    get(this, 'accordion').registerPanel(this);
  },

  _unRegisterWithAccorion() {
    get(this, 'accordion').unRegisterPanel(this);
  }
});
