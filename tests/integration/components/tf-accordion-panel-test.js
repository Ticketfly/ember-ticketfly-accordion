import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import getDOMNode from 'dummy/tests/helpers/get-dom-node';
import { hook, initialize as initializeHook } from 'ember-hook';

const DEFAULT_HEADER_HOOK = 'tf-accordion__panel-toggle';
const DEFAULT_BODY_HOOK = 'tf-accordion__panel-body';
const CUSTOM_HEADER_HOOK = 'test-panel-toggle-header';
const CUSTOM_BODY_HOOK = 'test-panel-body';

// let expected, actual,
let message;
let domNode;

moduleForComponent('tf-accordion__panel', 'Integration | Component | tf accordion panel', {
  integration: true,

  beforeEach() {
    initializeHook();
  }
});

test('rendering child components with non-block usage', function(assert) {
  this.render(hbs`{{tf-accordion-panel}}`);
  domNode = getDOMNode(this);

  message = 'renders a panel toggle element when used without block form';
  assert.ok(domNode.querySelector(hook(DEFAULT_HEADER_HOOK)), message);
  assert.notOk(domNode.querySelector(hook(CUSTOM_HEADER_HOOK)), message);

  message = 'renders a panel body element when used without block form';
  assert.ok(domNode.querySelector(hook(DEFAULT_BODY_HOOK)), message);
  assert.notOk(domNode.querySelector(hook(CUSTOM_BODY_HOOK)), message);
});

test('yield an interface for child component with block usages', function (assert) {
  message = 'yields an interface for a toggle component when use in block form';
  this.set('CUSTOM_HEADER_HOOK', CUSTOM_HEADER_HOOK);
  this.set('CUSTOM_BODY_HOOK', CUSTOM_BODY_HOOK);

  this.render(hbs`
    {{#tf-accordion-panel as |panel|}}
      {{panel.toggleHeader hook=CUSTOM_HEADER_HOOK}}
      {{panel.body hook=CUSTOM_BODY_HOOK}}
    {{/tf-accordion-panel}}
  `);

  domNode = getDOMNode(this);
  assert.ok(domNode.querySelector(hook(CUSTOM_HEADER_HOOK)), message);
  assert.ok(domNode.querySelector(hook(CUSTOM_BODY_HOOK)), message);

  assert.notOk(domNode.querySelector(hook(DEFAULT_HEADER_HOOK)), message);
  assert.notOk(domNode.querySelector(hook(DEFAULT_BODY_HOOK)), message);
});
