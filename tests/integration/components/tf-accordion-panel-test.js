import Ember from 'ember';
import { moduleForComponent /* , test */ } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import getDOMNode from 'dummy/tests/helpers/get-dom-node';
import test from 'ember-sinon-qunit/test-support/test';

const { K } = Ember;

const CLASS_NAMES = {
  DEFAULT_TAB: 'test-accordion__default-panel-tab',
  DEFAULT_BODY: 'test-accordion__default-panel-body',
  CUSTOM_TAB: 'test-accordion__custom-panel-tab',
  CUSTOM_BODY: 'test-accordion__custom-panel-body'
};

const AccordionComponentStub = {
  registerPanel: K,
  unRegisterPanel: K
};

let message;
let domNode;

moduleForComponent('tf-accordion-panel', 'Integration | Component | tf accordion root panel', {
  integration: true
});

test('rendering child components during non-block usage', function(assert) {
  const accordionComponentStub = this.stub(AccordionComponentStub);

  this.set('CLASS_NAMES', CLASS_NAMES);
  this.set('accordion', accordionComponentStub);

  this.render(hbs`
    {{tf-accordion-panel
      accordion=accordion
      tabClassName=CLASS_NAMES.DEFAULT_TAB
      bodyClassName=CLASS_NAMES.DEFAULT_BODY
    }}
  `);

  domNode = getDOMNode(this);

  message = 'renders a panel tab element when used without block form';

  assert.ok(domNode.querySelector(`.${CLASS_NAMES.DEFAULT_TAB}`), message);
  assert.notOk(domNode.querySelector(`.${CLASS_NAMES.CUSTOM_TAB}`), message);

  message = 'renders a panel body element when used without block form';

  assert.ok(domNode.querySelector(`.${CLASS_NAMES.DEFAULT_BODY}`), message);
  assert.notOk(domNode.querySelector(`.${CLASS_NAMES.CUSTOM_BODY}`), message);
});

test('yielding an interface for child components during block usages', function (assert) {
  const accordionComponentStub = this.stub(AccordionComponentStub);

  this.set('CLASS_NAMES', CLASS_NAMES);
  this.set('accordion', accordionComponentStub);

  message = 'yields an interface for a tab component when use in block form';

  this.render(hbs`
    {{#tf-accordion-panel accordion=accordion as |panel|}}
      {{panel.tab class=CLASS_NAMES.CUSTOM_TAB}}
      {{panel.body class=CLASS_NAMES.CUSTOM_BODY}}
    {{/tf-accordion-panel}}
  `);

  domNode = getDOMNode(this);

  assert.ok(domNode.querySelector(`.${CLASS_NAMES.CUSTOM_TAB}`), message);
  assert.ok(domNode.querySelector(`.${CLASS_NAMES.CUSTOM_BODY}`), message);

  assert.notOk(domNode.querySelector(`.${CLASS_NAMES.DEFAULT_TAB}`), message);
  assert.notOk(domNode.querySelector(`.${CLASS_NAMES.DEFAULT_BODY}`), message);
});
