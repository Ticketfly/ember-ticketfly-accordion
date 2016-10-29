import Component from 'ember-component';
import layout from '../templates/components/tf-accordion';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import { default as computed, notEmpty } from 'ember-computed';
import { A } from 'ember-array/utils';
// import { scheduleOnce } from 'ember-runloop';
import { log } from 'ember-debug';

// TODO: Enable this for retrieving animation settings
// import TFAccordionConfig from 'ember-ticketfly-accordion/configuration';

/**
 * @module tf-accordion
 */

/**
 * @class TFAccordionComponent
 * @namespace TFAccordion
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  classNames: ['tf-accordion'],
  attributeBindings: ['aria-multiselectable', 'foo'],
  ariaRole: 'tablist',
  'aria-multiselectable': 'true', // @see {@link https://github.com/BrianSipple/why-am-i-doing-this/blob/master/ember/aria-attribute-binding-in-components.md}

  /* ---------- API ---------- */

  /**
   * Whether or not all panels can be expanded at once.
   *
   * Default "accordion" behavior consists of collapsing all
   * but the most-recently expanded panel
   */
  multiExpand: false,

  panels: computed(function() {
    return A();
  }),

  /* ---------- COMPUTEDS ---------- */

  hasPanels: notEmpty('panels'),

  // panelHeights: mapBy('panels', 'element.offsetHeight'),
  // totalContentHeight: sum('panelHeights'),

  headerHeight: computed('panels.[]', {
    get() {
      return get(this, 'panels.firstObject.tab').element.offsetHeight;
    }
  }),

  /**
   * Calculates the available height that we'll have when
   * animating expanded panel bodies.
   *
   * We simply subtract the height of all of our headers from the
   * overall height of the accordion.
   */
  availableHeight: computed('headerHeight', 'totalContentHeight', 'useDynamicSize', {
    get() {
      const accordionHeight = this.element.offsetHeight;
      const headerHeight = get(this, 'headerHeight');

      return accordionHeight - get(this, 'panels.length') * headerHeight;
    }
  }),

  indexOfExpanded: computed('panels.[]', {
    get() {
      return get(this, 'panels').findIndex(panel => get(panel, 'isExpanded'));
    }
  }),

  /* ---------- LIFECYCLE ---------- */
  didInsertElement() {
    this._super(...arguments);

    // scheduleOnce('actions', this, this._switchOpenPanel);
  },

  willDestroyElement() {
    this._super(...arguments);

    set(this, 'panels', null);
  },

  /* ---------- ACTIONS ---------- */

  actions: {
    onPanelSelection(panel) {
      const valueForSelected = !get(panel, 'isExpanded');
      const multiExpand = get(this, 'multiExpand');

      // close the other panels if we're not in `multiExpand` mode
      if (!multiExpand) {
        get(this, 'panels').setEach('isExpanded', false);
      }

      set(panel, 'isExpanded', valueForSelected);
    }
  },

  /* ---------- PUBLIC METHODS ---------- */

  /**
   * Adds a panel from the `panels` array
   *
   * @method registerPanel
   * @param {TFAccordion.TFAccordionPanel Component} panel
   * @public
   */
  registerPanel(panel) {
    get(this, 'panels').addObject(panel);
  },

  /**
   * Removes a panel from the `panels` array
   *
   * @method unRegisterPanel
   * @param {TFAccordion.TFAccordionPanel Component} panel
   * @public
   */
  unRegisterPanel(panel) {
    get(this, 'panels').removeObject(panel);
  },


  /* ---------- PRIVATE METHODS ---------- */

  /**
   *
   * @method _switchOpenPanel
   * @private
   */
  _switchOpenPanel() {
    if (!get(this, 'hasPanels')) {  // TODO: Do we need this check?
      return;
    }

    const panels = get(this, 'panels');
    const headerHeight = get(this, 'headerHeight');
    const availableHeight = get(this, 'availableHeight');
    const indexOfExpanded = get(this, 'indexOfExpanded');
    // const totalContentHeight = get(this, 'totalContentHeight');

    panels.forEach((panel, idx) => {
      // We need to bump the panels below our expanded panel down (i.e: "out of the way")
      // so we can show the panel that is expanded
      const extraYOffset = (indexOfExpanded > -1 && idx > indexOfExpanded) ? availableHeight : 0;
      const yTranslation = extraYOffset + (headerHeight * idx);

      log(`idx ${idx}: using extraYOffset of ${extraYOffset}`);
      log(`idx ${idx}: setting translateY of ${yTranslation}px`);

      panel.element.style.transform = `translateY(${yTranslation}px)`;
      get(panel, 'panelBody').element.style.height = `${availableHeight}px`;
    });
  }
});
