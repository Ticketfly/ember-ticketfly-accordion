import Ember from 'ember';
import run from 'ember-runloop';
import { moduleForComponent /* , test */ } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';

const { K } = Ember;

const AccordionComponentStub = {
  registerPanel: K,
  unRegisterPanel: K
};

const CLASS_NAMES = {
  TAB: 'test-accordion-panel__tab',
  BODY: 'test-accordion-panel__body'
};

let message = '';
let expected;
let actual;
let component;
let accordionComponentStub;

moduleForComponent('tf-accordion-panel', 'Unit | Component | tf accordion panel root', {
  // Specify the other units that are required for this test
  needs: [
    'component:tf-accordion-panel-tab',
    'component:tf-accordion-panel-body'
  ],

  unit: true,

  beforeEach() {
    accordionComponentStub = sinon.stub(AccordionComponentStub);
  },

  afterEach() {
    sinon.restore(accordionComponentStub);
  }
});

test('registering with its parent accordion', function(assert) {
  run(() => {
    component = this.subject({ accordion: accordionComponentStub });
  });

  this.render();

  assert.equal(accordionComponentStub.registerPanel.callCount, 1);
  assert.equal(accordionComponentStub.unRegisterPanel.callCount, 0);

  run(() => {
    component.willDestroyElement();
  });

  assert.equal(accordionComponentStub.registerPanel.callCount, 1);
  assert.equal(accordionComponentStub.unRegisterPanel.callCount, 1);
});

test('generating ids for its child tab and body', function (assert) {
  const opts = {
    accordion: accordionComponentStub,
    tabClassName: CLASS_NAMES.TAB,
    bodyClassName: CLASS_NAMES.BODY
  };

  run(() => {
    component = this.subject(opts);
  });

  this.render();

  const tabElem = component.element.querySelector(`.${CLASS_NAMES.TAB}`);
  const bodyElem = component.element.querySelector(`.${CLASS_NAMES.BODY}`);

  message = 'panel tab uses id passed from parent component';
  expected = component.get('tabID');
  actual = tabElem.getAttribute('id');

  assert.equal(actual, expected, message);

  message = 'panel body uses id passed from parent component';
  expected = component.get('panelBodyID');
  actual = bodyElem.getAttribute('id');

  assert.equal(actual, expected, message);
});

test('WAI-ARIA-compliant attributes', function(assert) {
  run(() => {
    component = this.subject({ accordion: accordionComponentStub });
  });

  this.render();

  message = 'the `role` attribute of `"heading"` is present';
  expected = 'heading';
  actual = component.element.getAttribute('role');

  assert.equal(actual, expected, message);

  message = 'no `aria-level` value is set or defined by default';
  expected = null;
  actual = component.element.getAttribute('aria-level');

  assert.equal(actual, expected, message);

  message = '`aria-level` attribute and value are applied when set';
  expected = '3';

  run(() => {
    component.set('aria-level', expected);
  });

  actual = component.element.getAttribute('aria-level');

  assert.equal(actual, expected, message);
});

