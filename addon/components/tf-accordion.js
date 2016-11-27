import Ember from 'ember';
import Component from 'ember-component';
import layout from '../templates/components/tf-accordion';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import computed, { notEmpty, bool } from 'ember-computed';
import { A } from 'ember-array/utils';
import { scheduleOnce } from 'ember-runloop';
import { log, warn } from 'ember-debug';
import { animatePanelOpen, animatePanelClosed } from 'ember-ticketfly-accordion/utils/accordion-panel-animation';
import unsetPanelComponentMotion from 'ember-ticketfly-accordion/utils/unset-panel-component-motion';

/**
 * @module tf-accordion
 */

const { K: noop } = Ember;

/**
 * @class TFAccordionComponent
 * @namespace TFAccordion
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  classNames: ['tfa-accordion'],
  attributeBindings: ['aria-multiselectable'],

  /**
   * Bound to the `role` attribute of the `tf-accordion` component's element.
   *
   * See http://www.w3.org/TR/wai-aria/roles#tablist
   *
   * @property ariaRole
   * @type String
   * @default 'tablist'
   */
  ariaRole: 'tablist',

  /**
   * Bound to the `aria-multiselectable` attribute on the `tf-accordion` component's element.
   * The current WAI-ARIA spec states that this should be "true" for accordions
   *
   * @see {@link https://www.w3.org/TR/wai-aria-practices-1.1/#accordion}
   * @see {@link https://github.com/BrianSipple/why-am-i-doing-this/blob/master/ember/aria-attribute-binding-in-components.md}
   * @property aria-multiselectable
   * @type String
   * @default 'true'
   */
  'aria-multiselectable': 'true',

  // TODO: Remove from component (possibly make a util)
  KEYCODE_LEFT: 37,
  KEYCODE_UP: 38,
  KEYCODE_RIGHT: 39,
  KEYCODE_DOWN: 40,

  /**
   * The index within the array of this accordion's panels
   * corresponding to which panel -- if any -- has focus in
   * the DOM.
   *
   * @property focusedIndex
   * @type Integer
   * @default -1
   */
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
   *
   * @property cycleFocus
   * @type boolean
   * @default true
   */
  cycleFocus: true,

  /**
   * Whether or not animation is enabled for expanding/collapsing a panel
   *
   * @property animatable
   * @type boolean
   * @default true
   */
  animatable: true,

  /**
   * Function to execute when animating the panel closed.
   *
   * Defaults to our `animatePanelOpen` utility.
   *
   * @property animatePanelOpen
   * @type Function
   */
  animatePanelOpen,

  /**
   * Function to execute when animating the panel closed.
   * Defaults to our `animatePanelClosed` utility.
   *
   * @property animatePanelClosed
   * @type Function
   */
  animatePanelClosed,

  /**
   * If the default opening animation is used, this callback
   * will be called when it completes -- passing in the component
   * object of the panel that was animated.
   *
   * @property onPanelAnimatedOpen
   * @type Function
   */
  onPanelAnimatedOpen: unsetPanelComponentMotion,

  /**
   * If the default closing animation is used, this callback
   * will be executed when it completes -- passing in the component
   * object of the panel that was animated.
   *
   * @property onPanelAnimatedClosed
   * @type Function
   */
  onPanelAnimatedClosed: unsetPanelComponentMotion,

  /**
   * Function for the `onPanelTabFocusIn` action
   *
   * @property onPanelTabFocusIn
   * @type Function
   */
  onPanelTabFocusIn: noop,

  /**
   * Function for the `onPanelTabFocusOut` action
   *
   * @property onPanelTabFocusOut
   * @type Function
   */
  onPanelTabFocusOut: noop,

  /**
   * Function for the `onPanelExpandChanged` action
   *
   * @property onPanelExpandChanged
   * @type Function
   */
  onPanelExpandChanged: noop,

  /**
   * The array of all `tf-accordion-panel` instances within the `tf-accordion` component.
   *
   * @property tabs
   * @type Array | TFAccordion.TFAccordionPanelComponent
   */
  panels: computed(function() {
    return A();
  }),

  /* ---------- COMPUTEDS ---------- */

  isAnimatable: bool('animatable'),
  hasPanels: notEmpty('panels'),

  /* ---------- LIFECYCLE ---------- */

  /**
   * @override
   */
  willDestroyElement() {
    this._super(...arguments);

    scheduleOnce('actions', this, function () {
      set(this, 'panels', null);
    });
  },

  /* ---------- COMPONENT ELEMENT EVENT LISTENERS ---------- */

  keyDown(event) {
    const keyCode = event.keyCode || event.which;

    if (keyCode === this.KEYCODE_LEFT || keyCode === this.KEYCODE_UP) {
      event.preventDefault();
      this.incrementPanelFocus(-1);
    }

    if (keyCode === this.KEYCODE_RIGHT || keyCode === this.KEYCODE_DOWN) {
      event.preventDefault();
      this.incrementPanelFocus(1);
    }
  },

  /* ---------- PUBLIC METHODS ---------- */

  /**
   * @method incrementPanelFocus
   * @type Function
   * @param {Integer} increment - a numeric value to indicate the "direction"
   *        of the increment (based upon whether it's positive or negative)
   */
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

  /**
   * Sets the document's focus on the tab element of a panel component,
   * while updating this component's `focusedIndex` accordingly.
   *
   * @method setFocusOnPanel
   * @param {TFAccordion.TFAccordionPanelTabComponent} panel - the panel
   *        component containing the tab element to focus
   * @param {Integer} index - the index within this component's
   *        array of panels corresponding to the new focus position
   */
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
   * @param {TFAccordion.TFAccordionPanelComponent} panel
   * @public
   */
  registerPanel(panel) {
    get(this, 'panels').addObject(panel);
  },

  /**
   * Removes a panel from the `panels` array
   *
   * @method unRegisterPanel
   * @param {TFAccordion.TFAccordionPanelComponent} panel
   * @public
   */
  unRegisterPanel(panel) {
    get(this, 'panels').removeObject(panel);
  },

  /**
   * Calls an action corresponding to a panel event that we
   * exposed callbacks to -- passing in the corresponding
   * `panel` and `event` properties as arguments.
   *
   * @method handlePanelEvent
   * @param {String} eventName - the name of the event that `tf-accordion`
   *        expects an action to be bound to.
   * @param {TFAccordion.TFAccordionPanelComponent} panel
   * @param {Object} event - jQuery event from the current action
   * @public
   */
  handlePanelEvent(eventName, panel, event) {
    const actionFn = get(this, eventName);

    if (typeof actionFn === 'string') {
      warn(`tf-accordion: You must use the action helper for all actions. The try: ${actionFn}=(action "${actionFn}") in your template`, false, {id: 'tf-accordion-string-action'});
    }

    log(`tf-accordion: firing action function to handle the ${eventName} event`);
    actionFn(panel, event);
  },

  /* ---------- ACTIONS ---------- */

  actions: {

    /**
     * When a panel is selected, this function handles further
     * animation and expansion operations
     *
     * @param {TFAccordion.TFAccordionPanelComponent} panel
     * @private
     */
    _onPanelSelection(panel) {
      const panels = get(this, 'panels');
      const indexOfSelected = panels.indexOf(panel);
      const shouldExpand = !get(panel, 'isExpanded');
      const isAnimatable = get(this, 'isAnimatable');

      this._handleMultiExpandOnPanelSelect(indexOfSelected, panels, isAnimatable);

      scheduleOnce('afterRender', this, 'setFocusOnPanel', panel, indexOfSelected);

      if (isAnimatable && !get(panel, 'isInMotion')) {
        const animationFunc = shouldExpand ? 'animatePanelOpen' : 'animatePanelClosed';
        const animationCompleteCallback = shouldExpand ? 'onPanelAnimatedOpen' : 'onPanelAnimatedClosed';

        set(panel, 'isInMotion', true);
        get(this, animationFunc)(panel, get(this, animationCompleteCallback));

      } else {
        set(panel, 'isExpanded', shouldExpand);
      }
    },

    /**
     * Private handler for panel body components to send an action to when
     * their expansion state changes
     *
     * @method _panelBodyExpansionWasChanged
     * @param {TFAccordion.TFAccordionPanelComponent} panel - the instance object
     *        of the component for which the body expansion was changed
     * @param {boolean} isExpanded - the new value of the expansion state.
     * @private
     */
    _panelBodyExpansionWasChanged(/* panelComponent, isExpanded */) {
      get(this, 'onPanelExpandChanged')(...arguments);
    }
  },

  /* ---------- PRIVATE HELPER METHODS ---------- */

  /**
   * If we're not in multi-expand mode, and a different panel was
   * selected than the one currently open, we need to close it
   *
   * @method
   * @private
   * @param {Integer} indexOfSelected
   * @param {Array} panels - An array containing this component's
   *        child panel components
   * @param {boolean} useAnimation
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

      if (useAnimation) {
        get(this, 'animatePanelClosed')(currentlyExpandedPanel);

      } else {
        set(currentlyExpandedPanel, 'isExpanded', false);
      }
    }
  }
});
