import Component from 'ember-component';
import layout from '../templates/components/tf-accordion';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import { default as computed, notEmpty } from 'ember-computed';
import { A } from 'ember-array/utils';
import { scheduleOnce } from 'ember-runloop';
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
  classNames: ['tfa-accordion'],
  attributeBindings: ['aria-multiselectable'],
  ariaRole: 'tablist',
  'aria-multiselectable': 'true', // @see {@link https://github.com/BrianSipple/why-am-i-doing-this/blob/master/ember/aria-attribute-binding-in-components.md}

  handleKeydown: null,

  KEYCODE_LEFT: 37,
  KEYCODE_UP: 38,
  KEYCODE_RIGHT: 39,
  KEYCODE_DOWN: 40,

  focusedIndex: -1,

  /* ---------- API ---------- */

  /**
   * Whether or not all panels can be expanded at once.
   *
   * Default "accordion" behavior consists of collapsing all
   * but the most-recently expanded panel
   */
  multiExpand: false,

  /**
   * Whether or not focus should cycle around the panel during
   * arrow-key navigation.
   *
   * For example, when the last panel is focused and the down arrow
   * is pressed, cycling focus will focus the first panel. Otherwise, the
   * last panel will remain focused.
   */
  cycleFocus: true,

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

  willDestroyElement() {
    this._super(...arguments);

    scheduleOnce('actions', this, function () {
      set(this, 'panels', null);
    });
  },

  /* ---------- COMPONENT ELEMENT EVENT LISTENERS ---------- */

  keyDown(ev) {
    const keyCode = ev.keyCode || ev.which;

    if (keyCode === this.KEYCODE_LEFT || keyCode === this.KEYCODE_UP) {
      ev.preventDefault();
      this.incrementPanelFocus(-1);
    }

    if (keyCode === this.KEYCODE_RIGHT || keyCode === this.KEYCODE_DOWN) {
      ev.preventDefault();
      this.incrementPanelFocus(1);
    }
  },

  /* ---------- ACTIONS ---------- */

  actions: {
    onPanelSelection(panel) {
      const indexOfSelected = get(this, 'panels').indexOf(panel);
      const valueForExpanded = !get(panel, 'isExpanded');
      const multiExpand = get(this, 'multiExpand');

      // close the other panels if we're not in `multiExpand` mode
      if (!multiExpand) {
        get(this, 'panels').setEach('isExpanded', false);
      }

      set(panel, 'isExpanded', valueForExpanded);

      scheduleOnce('afterRender', this, 'setFocusOnPanel', panel, indexOfSelected);
    }
  },

  /* ---------- PUBLIC METHODS ---------- */

  incrementPanelFocus(increment) {
    const cycleFocus = get(this, 'cycleFocus');
    const focusedIndex = get(this, 'focusedIndex');
    const numPanels = get(this, 'panels.length');
    const { max, min } = Math;

    let nextIndex;

    if (cycleFocus) {
      nextIndex = (focusedIndex + increment + numPanels) % numPanels;

    } else {
      nextIndex = increment > 0 ?
        min(numPanels - 1, focusedIndex + 1)
        :
        max(0, focusedIndex -1);
    }

    const panelToFocus = get(this, 'panels').objectAt(nextIndex);

    scheduleOnce('afterRender', this, 'setFocusOnPanel', panelToFocus, nextIndex);
  },

  setFocusOnPanel(panel, index) {
    // const valueForExpanded = !get(panel, 'isExpanded');
    // const multiExpand = get(this, 'multiExpand');

    // // close the other panels if we're not in `multiExpand` mode
    // if (!multiExpand) {
    //   get(this, 'panels').setEach('isExpanded', false);
    // }

    // set(panel, 'isExpanded', valueForExpanded);
    set(this, 'focusedIndex', index);
    get(this, 'panels').setEach('isFocused', false);
    set(panel, 'isFocused', true);
    get(panel, 'tab.element').focus();
  },

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
