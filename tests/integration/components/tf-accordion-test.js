import Ember from 'ember';
import { moduleForComponent /* , test */ } from 'ember-qunit';
import { A } from 'ember-array/utils';
import test from 'ember-sinon-qunit/test-support/test';
import hbs from 'htmlbars-inline-precompile';
import getDOMNode from 'dummy/tests/helpers/get-dom-node';
import EmberObject from 'ember-object';
import { animatePanelOpen, animatePanelClosed } from 'ember-ticketfly-accordion/utils/accordion-panel-animation';
import unsetPanelComponentMotion from 'ember-ticketfly-accordion/utils/unset-panel-component-motion';

const { K: noop } = Ember;

const ComponentProto = EmberObject.extend({
  multiExpand: false,
  cycleFocus: true,
  animatable: true,
  animatePanelOpen,
  animatePanelClosed,
  onPanelTabFocusIn: noop,
  onPanelTabFocusOut: noop,
  onPanelExpandChanged: noop,
  onPanelAnimatedOpen: unsetPanelComponentMotion,
  onPanelAnimatedClosed: unsetPanelComponentMotion
});

const PanelProto = EmberObject.extend({
  tabTitle: 'Panel Section Tab',
  bodyContent: 'Red hair crookshanks bludger Marauder’s Map Prongs sunshine daisies butter mellow Ludo Bagman. Beaters gobbledegook',
  isExpanded: false
});

const CLASS_NAMES = {
  ACCORDION: 'test-accordion',
  ACCORDION_PANEL: 'test-accordion__panel',
  ACCORDION_PANEL_TAB: 'test-accordion__panel-tab',
  ACCORDION_PANEL_BODY: 'test-accordion__panel-body'
};

const compositeTemplate = hbs`
  {{#tf-accordion
    class=CLASS_NAMES.ACCORDION
    animatable=componentProto.animatable
    multiExpand=componentProto.multiExpand
    cycleFocus=componentProto.cycleFocus
    animatePanelOpen=componentProto.animatePanelOpen
    animatePanelClosed=componentProto.animatePanelClosed
    onPanelTabFocusIn=componentProto.onPanelTabFocusIn
    onPanelTabFocusOut=componentProto.onPanelTabFocusOut
    onPanelExpandChanged=componentProto.onPanelExpandChanged
    onPanelAnimatedOpen=componentProto.onPanelAnimatedOpen
    onPanelAnimatedClosed=componentProto.onPanelAnimatedClosed as |accordion|
  }}
    {{#each INLINE_PANELS as |inlinePanel|}}

      {{accordion.panel
        class=CLASS_NAMES.ACCORDION_PANEL
        tabClassName=CLASS_NAMES.ACCORDION_PANEL_TAB
        bodyClassName=CLASS_NAMES.ACCORDION_PANEL_BODY
        tabTitle=inlinePanel.tabTitle
        bodyContent=inlinePanel.bodyContent
        isExpanded=inlinePanel.isExpanded
      }}

    {{/each}}
  {{/tf-accordion}}
`;

let expected;
let actual;
let message;

moduleForComponent('tf-accordion', 'Integration | Component | tf accordion root', {
  integration: true,

  beforeEach() {
    this.set('componentProto', ComponentProto.create());
    this.set('INLINE_PANELS', A([
      PanelProto.create(),
      PanelProto.create()
    ]));
    this.set('CLASS_NAMES', CLASS_NAMES);
    // this.set('BLOCK_PANEL', BLOCK_PANEL);
  }
});

test('yielding an interface to render child panels', function (assert) {
  this.render(compositeTemplate);

  const accordionElem = getDOMNode(this);

  message = 'accordion renders child panel components';
  expected = 2;
  actual = accordionElem.querySelectorAll(`.${CLASS_NAMES.ACCORDION_PANEL}`).length;

  assert.equal(actual, expected, message);
});

test('panels are closed by default', function (assert) {
  this.render(compositeTemplate);

  const panelBodyElems = getDOMNode(this).querySelectorAll(`.${CLASS_NAMES.ACCORDION_PANEL_BODY}`);

  message = 'all panel-body elements should have `aria-hidden` set to `true`';
  expected = -1;
  actual = Array.from(panelBodyElems).findIndex(elem => elem.getAttribute('aria-hidden') !== 'true');

  assert.equal(actual, expected, message);
});

test('individual panel body toggling on tab clicked', function (assert) {
  this.render(compositeTemplate);

  const firstPanelTabElem = getDOMNode(this).querySelector(`.${CLASS_NAMES.ACCORDION_PANEL_TAB}`);
  const firstPanelBodyElem = getDOMNode(this).querySelector(`.${CLASS_NAMES.ACCORDION_PANEL_BODY}`);

  assert.equal('true', firstPanelBodyElem.getAttribute('aria-hidden'));

  firstPanelTabElem.click();

  assert.equal('false', firstPanelBodyElem.getAttribute('aria-hidden'));

  firstPanelTabElem.click();

  assert.equal('true', firstPanelBodyElem.getAttribute('aria-hidden'));
});

test('closing the other open panel when `multiExpand` is false', function (assert) {
  this.set('componentProto.multiExpand', false);
  this.set('componentProto.animatable', false);

  this.render(compositeTemplate);

  const panelTabElems = getDOMNode(this).querySelectorAll(`.${CLASS_NAMES.ACCORDION_PANEL_TAB}`);
  const panelBodyElems = getDOMNode(this).querySelectorAll(`.${CLASS_NAMES.ACCORDION_PANEL_BODY}`);

  const firstPanelTabElem = panelTabElems[0];
  const firstPanelBodyElem = panelBodyElems[0];

  const secondPanelTabElem = panelTabElems[1];
  const secondPanelBodyElem = panelBodyElems[1];

  assert.equal('true', firstPanelBodyElem.getAttribute('aria-hidden'), `'aria-hidden' attribute is set to 'true'`);
  assert.equal(true, firstPanelBodyElem.hidden, `'hidden' property is set to \`true\``);

  assert.equal('true', secondPanelBodyElem.getAttribute('aria-hidden'), `'aria-hidden' attribute is set to 'true'`);
  assert.equal(true, secondPanelBodyElem.hidden, `'hidden' property is set to \`true\``);

  secondPanelTabElem.click();

  assert.equal('true', firstPanelBodyElem.getAttribute('aria-hidden'), `'aria-hidden' attribute is set to 'true'`);
  assert.equal(true, firstPanelBodyElem.hidden, `'hidden' property is set to \`true\``);

  assert.equal('false', secondPanelBodyElem.getAttribute('aria-hidden'), `'aria-hidden' attribute is set to 'false'`);
  assert.equal(false, secondPanelBodyElem.hidden, `'hidden' property is set to \`false\``);

  firstPanelTabElem.click();

  assert.equal('false', firstPanelBodyElem.getAttribute('aria-hidden'), `'aria-hidden' attribute is set to 'false'`);
  assert.equal(false, firstPanelBodyElem.hidden, `'hidden' property is set to \`false\``);

  assert.equal('true', secondPanelBodyElem.getAttribute('aria-hidden'), `'aria-hidden' attribute is set to 'true'`);
  assert.equal(true, secondPanelBodyElem.hidden, `'hidden' property is set to \`true\``);
});

test('allowing multiple panel bodies to be expanded when `multiExpand` is true', function (assert) {
  this.set('componentProto.multiExpand', true);
  this.set('componentProto.animatable', false);

  this.render(compositeTemplate);

  const panelTabElems = getDOMNode(this).querySelectorAll(`.${CLASS_NAMES.ACCORDION_PANEL_TAB}`);
  const panelBodyElems = getDOMNode(this).querySelectorAll(`.${CLASS_NAMES.ACCORDION_PANEL_BODY}`);

  const firstPanelTabElem = panelTabElems[0];
  const firstPanelBodyElem = panelBodyElems[0];

  const secondPanelTabElem = panelTabElems[1];
  const secondPanelBodyElem = panelBodyElems[1];

  assert.equal('true', firstPanelBodyElem.getAttribute('aria-hidden'));
  assert.equal('true', secondPanelBodyElem.getAttribute('aria-hidden'));

  secondPanelTabElem.click();

  assert.equal('true', firstPanelBodyElem.getAttribute('aria-hidden'));
  assert.equal('false', secondPanelBodyElem.getAttribute('aria-hidden'));

  firstPanelTabElem.click();

  assert.equal('false', firstPanelBodyElem.getAttribute('aria-hidden'));
  assert.equal('false', secondPanelBodyElem.getAttribute('aria-hidden'));
});

test('calling its opening animation function', function (assert) {
  const animatePanelOpenSpy = this.spy();

  this.set('componentProto.multiExpand', true);
  this.set('componentProto.animatable', true);
  this.set('componentProto.animatePanelOpen', animatePanelOpenSpy);

  this.render(compositeTemplate);

  const panelTabElems = getDOMNode(this).querySelectorAll(`.${CLASS_NAMES.ACCORDION_PANEL_TAB}`);
  const firstPanelTabElem = panelTabElems[0];

  firstPanelTabElem.click();

  message = 'opening animation should be called one time.';
  expected = 1;
  actual = animatePanelOpenSpy.callCount;

  assert.equal(actual, expected, message);

  message = 'opening animation should be called with a component object and a callback function';
  expected = true;
  actual = animatePanelOpenSpy.args[0][1] === unsetPanelComponentMotion;

  assert.equal(actual, expected, message);
});

test('calling its closing animation function', function (assert) {
  const animatePanelClosedSpy = this.spy();

  this.set('INLINE_PANELS.firstObject.isExpanded', true);
  this.set('componentProto.multiExpand', true);
  this.set('componentProto.animatable', true);
  this.set('componentProto.animatePanelClosed', animatePanelClosedSpy);

  this.render(compositeTemplate);

  const panelTabElems = getDOMNode(this).querySelectorAll(`.${CLASS_NAMES.ACCORDION_PANEL_TAB}`);
  const firstPanelTabElem = panelTabElems[0];

  firstPanelTabElem.click();

  message = 'closing animation should be called one time.';
  expected = 1;
  actual = animatePanelClosedSpy.callCount;

  assert.equal(actual, expected, message);

  message = 'closing animation should be called with a component object and a callback function';
  expected = true;
  actual = animatePanelClosedSpy.args[0][1] === unsetPanelComponentMotion;

  assert.equal(actual, expected, message);
});


test('dispatching actions for the `focus` and `focusout` events on panel tab elements', function (assert) {
  assert.expect(2);

  const focusEventHandler = (panelComponent /* , event */) => {
    message = 'callback should have been called with the parent panel component of the tab that was focused';
    expected = getDOMNode(this).querySelector(`.${CLASS_NAMES.ACCORDION_PANEL}`);
    actual = panelComponent.element;

    assert.deepEqual(actual, expected, message);
  };

  this.set('componentProto.onPanelTabFocusIn', focusEventHandler);
  this.set('componentProto.onPanelTabFocusOut', focusEventHandler);

  this.render(compositeTemplate);

  const panelTabElems = getDOMNode(this).querySelectorAll(`.${CLASS_NAMES.ACCORDION_PANEL_TAB}`);
  const firstPanelTabElem = panelTabElems[0];

  firstPanelTabElem.dispatchEvent(new Event('focus'));
  firstPanelTabElem.dispatchEvent(new Event('blur'));
});


test('dispatching an action when a panel body expansion state changes', function (assert) {
  assert.expect(2);

  const expansionEventHandler = (panelComponent, isExpanded) => {
    message = `the callback is called with the parent panel component of the tab that was focused`;
    expected = getDOMNode(this).querySelector(`.${CLASS_NAMES.ACCORDION_PANEL}`);
    actual = panelComponent.element;

    assert.deepEqual(actual, expected, message);

    message = `the callback is called with a boolean for whether or not its body is expanded`;
    expected = false;
    actual = isExpanded;

    assert.equal(actual, expected, message);
  };

  this.set('componentProto.onPanelExpandChanged', expansionEventHandler);
  this.set('INLINE_PANELS.firstObject.isExpanded', true);

  this.render(compositeTemplate);

  this.set('INLINE_PANELS.firstObject.isExpanded', false);
});
