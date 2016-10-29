import Ember from 'ember';
import run from 'ember-runloop';
import { moduleForComponent /* , test */ } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';

const { K } = Ember;

const AccordionComponentStub = {
  registerPanel: K,
  unRegisterPanel: K
};


let expected, actual, message, component;

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
