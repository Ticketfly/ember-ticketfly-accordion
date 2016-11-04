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

let expected, actual, component;

moduleForComponent('tf-accordion-panel', 'Unit | Component | tf accordion panel root', {
  // Specify the other units that are required for this test
  needs: [
    'component:tf-accordion-panel-tab',
    'component:tf-accordion-panel-body'
  ],
  unit: true
});

test('registering with its parent accordion', function(assert) {
  const accordionComponentStub = this.stub(AccordionComponentStub);

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
  const accordionComponentStub = this.stub(AccordionComponentStub);
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

  expected = component.get('tabID');
  actual = tabElem.getAttribute('id');

  assert.equal(actual, expected, 'panel tab uses id passed from parent component');

  expected = component.get('panelBodyID');
  actual = bodyElem.getAttribute('id');

  assert.equal(actual, expected, 'panel body uses id passed from parent component');
});
