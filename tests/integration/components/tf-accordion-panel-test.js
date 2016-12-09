import { moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import getDOMNode from 'dummy/tests/helpers/get-dom-node';
import test from 'ember-sinon-qunit/test-support/test';
import EmberObject from 'ember-object';
import getOwner from 'ember-owner/get';

const CLASS_NAMES = {
  DEFAULT_TAB: 'test-accordion__default-panel-tab',
  DEFAULT_BODY: 'test-accordion__default-panel-body',
  CUSTOM_TAB: 'test-accordion__custom-panel-tab',
  CUSTOM_BODY: 'test-accordion__custom-panel-body'
};

const PanelComponentProto = EmberObject.extend({
  isExpanded: false
});

const INLINE_TEMPLATE = hbs`
  {{tf-accordion-panel
    accordion=accordion
    tabClassName=CLASS_NAMES.DEFAULT_TAB
    bodyClassName=CLASS_NAMES.DEFAULT_BODY
    isExpanded=panelComponentProto.isExpanded
  }}
`;

const BLOCK_TEMPLATE = hbs`
  {{#tf-accordion-panel
    isExpanded=panelComponentProto.isExpanded
    accordion=accordion as |panel|
  }}
    {{panel.tab class=CLASS_NAMES.CUSTOM_TAB}}
    {{panel.body class=CLASS_NAMES.CUSTOM_BODY}}
  {{/tf-accordion-panel}}
`;

let message;

moduleForComponent('tf-accordion-panel', 'Integration | Component | tf accordion panel', {
  integration: true,

  beforeEach(/* { test: testContext } */) {
    const owner = getOwner(this);
    const accordion = owner._lookupFactory('component:tf-accordion').create();

    this.set('accordion', accordion);
    this.set('CLASS_NAMES', CLASS_NAMES);
    this.set('panelComponentProto', PanelComponentProto.create());
  }
});

test('rendering child components during non-block usage', function(assert) {
  this.render(INLINE_TEMPLATE);

  const domNode = getDOMNode(this);

  message = 'renders a panel tab element';

  assert.ok(domNode.querySelector(`.${CLASS_NAMES.DEFAULT_TAB}`), message);
  assert.notOk(domNode.querySelector(`.${CLASS_NAMES.CUSTOM_TAB}`), message);

  message = 'renders a panel body element';

  assert.ok(domNode.querySelector(`.${CLASS_NAMES.DEFAULT_BODY}`), message);
  assert.notOk(domNode.querySelector(`.${CLASS_NAMES.CUSTOM_BODY}`), message);
});

test('yielding an interface for child components during block usage', function (assert) {
  message = 'yields an interface for a tab component when use in block form';

  this.render(BLOCK_TEMPLATE);

  const domNode = getDOMNode(this);

  assert.ok(domNode.querySelector(`.${CLASS_NAMES.CUSTOM_TAB}`), message);
  assert.ok(domNode.querySelector(`.${CLASS_NAMES.CUSTOM_BODY}`), message);

  assert.notOk(domNode.querySelector(`.${CLASS_NAMES.DEFAULT_TAB}`), message);
  assert.notOk(domNode.querySelector(`.${CLASS_NAMES.DEFAULT_BODY}`), message);
});

test(`dispatching an action to the parent accordion on select`, function (assert) {
  this.render(INLINE_TEMPLATE);

  const panelSelectActionSpy = this.spy(this.get('accordion.actions'), '_onPanelSelection');
  const panelTabElem = getDOMNode(this).querySelector(`.${CLASS_NAMES.DEFAULT_TAB}`);

  panelTabElem.click();

  assert.equal(panelSelectActionSpy.callCount, 1);

  panelTabElem.dispatchEvent(new Event('touchend', { bubbles: true }));

  assert.equal(panelSelectActionSpy.callCount, 2);
});

test(`selecting a panel's child tab component toggles its expansion state`, function (assert) {
  this.set('panelComponentProto.isExpanded', false);
  this.render(INLINE_TEMPLATE);

  const domNode = getDOMNode(this);
  const panelTabElem = domNode.querySelector(`.${CLASS_NAMES.DEFAULT_TAB}`);
  const panelBodyElem = domNode.querySelector(`.${CLASS_NAMES.DEFAULT_BODY}`);

  assert.equal('false', panelTabElem.getAttribute('aria-expanded'));
  assert.equal('true', panelBodyElem.getAttribute('aria-hidden'));

  panelTabElem.click();

  assert.equal('true', panelTabElem.getAttribute('aria-expanded'));
  assert.equal('false', panelBodyElem.getAttribute('aria-hidden'));
});

test('classNameBindings', function (assert) {
  this.set('panelComponentProto.isExpanded', false);
  this.render(INLINE_TEMPLATE);

  const domNode = getDOMNode(this);
  const expandedClassNameBinding = 'tfa-panel--expanded';

  message = `the panel element does not have the ${expandedClassNameBinding} class name added when it's not expanded`;
  assert.equal(false, domNode.classList.contains(expandedClassNameBinding));

  this.set('panelComponentProto.isExpanded', true);

  message = `the panel element has the ${expandedClassNameBinding} class name added when it's expanded`;
  assert.equal(true, domNode.classList.contains(expandedClassNameBinding));
});
