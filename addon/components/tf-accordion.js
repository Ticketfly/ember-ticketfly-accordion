import Component from 'ember-component';
import layout from '../templates/components/tf-accordion';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import computed, { notEmpty, bool } from 'ember-computed';
import { A } from 'ember-array/utils';
import { scheduleOnce } from 'ember-runloop';
import { log } from 'ember-debug';
import { animatePanelOpen, animatePanelClosed } from 'ember-ticketfly-accordion/utils/accordion-panel-animation';

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
  classNameBindings: ['isAnimatable:is-animatable'],
  attributeBindings: ['aria-multiselectable'],
  ariaRole: 'tablist',
  'aria-multiselectable': 'true', // @see {@link https://github.com/BrianSipple/why-am-i-doing-this/blob/master/ember/aria-attribute-binding-in-components.md}

  handleKeydown: null, // TOOD: Rename to 'on-keydown'

  animatePanelClosed: null,
  animatePanelOpen: null,

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

  /**
   * Whether or not animation is enabled for expanding/collapsing a panel
   */
  animatable: true,
  isAnimatable: bool('animatable'),

  panels: computed(function() {
    return A();
  }),

  /* ---------- COMPUTEDS ---------- */

  hasPanels: notEmpty('panels'),

  headerHeight: computed('panels.[]', {
    get() {
      return get(this, 'panels.firstObject.tab').element.offsetHeight;
    }
  }).readOnly(),

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
  }).readOnly(),

  indexOfExpanded: computed('panels.[]', {
    get() {
      return get(this, 'panels').findIndex(panel => get(panel, 'isExpanded'));
    }
  }).readOnly(),

  numPanelsExpanded: computed('panels.[]', {
    get() {
      return get(this, 'panels').filter(panel => get(panel, 'isExpanded')).length;
    }
  }).readOnly(),

  /* ---------- LIFECYCLE ---------- */

  init() {
    this._super(...arguments);

    this._setAnimationFunctionsOnInit();
  },

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

  /**
   * If we're not in multi-expand mode, and a different panel was
   * selected than the one currently open, we need to close it
   */
  _handleMultiExpandOnPanelSelect(indexOfSelected, panels, useAnimation) {
    const currentlyFocusedIndex = get(this, 'focusedIndex');
    const multiExpand = get(this, 'multiExpand');

    if (
      !multiExpand &&
      (
        currentlyFocusedIndex >= 0 &&
        indexOfSelected !== currentlyFocusedIndex
      )
    ) {
      const currentlyExpandedPanel = panels.objectAt(currentlyFocusedIndex);

      set(currentlyExpandedPanel, 'isExpanded', false);

      if (useAnimation) {
        scheduleOnce('afterRender', this, 'animatePanelClosed', get(currentlyExpandedPanel, 'panelBody'));
      }
    }
  },

  /* ---------- ACTIONS ---------- */

  actions: {
    onPanelSelection(panel) {
      const panels = get(this, 'panels');
      const indexOfSelected = panels.indexOf(panel);
      const isExpandedNow = !get(panel, 'isExpanded');
      const isAnimatable = get(this, 'isAnimatable');

      this._handleMultiExpandOnPanelSelect(indexOfSelected, panels, isAnimatable);

      set(panel, 'isExpanded', isExpandedNow);
      scheduleOnce('afterRender', this, 'setFocusOnPanel', panel, indexOfSelected);

      if (isAnimatable) {
        const animationFunc = isExpandedNow ? 'animatePanelOpen' : 'animatePanelClosed';

        scheduleOnce('afterRender', this, animationFunc, get(panel, 'panelBody'), indexOfSelected);
      }
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
  },

  /**
   * If no animation function is provided for opening/closing panel body elements,
   * we default to our utility
   */
  _setAnimationFunctionsOnInit() {
    this.animatePanelOpen = (typeof this.animatePanelOpen === 'function') ? this.animatePanelOpen : animatePanelOpen;
    this.animatePanelClosed = (typeof this.animatePanelClosed === 'function') ? this.animatePanelClosed : animatePanelClosed;
  }
});
