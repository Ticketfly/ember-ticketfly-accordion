import Ember from 'ember';
import run from 'ember-runloop';
import { moduleForComponent /* , test */ } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';

const { K } = Ember;

let expected, actual, message, component;

moduleForComponent('tf-accordion-panel-body', 'Unit | Component | tf accordion panel body', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

const PanelComponentStub = {
  registerPanelBody: K,
  unRegisterPanelBody: K
};

test('registering with its parent panel', function(assert) {
  const panelComponentStub = this.stub(PanelComponentStub);

  run(() => {
    component = this.subject({ panel: panelComponentStub });
  });

  this.render();

  assert.equal(panelComponentStub.registerPanelBody.callCount, 1);
  assert.equal(panelComponentStub.unRegisterPanelBody.callCount, 0);

  run(() => {
    component.willDestroyElement();
  });

  assert.equal(panelComponentStub.registerPanelBody.callCount, 1);
  assert.equal(panelComponentStub.unRegisterPanelBody.callCount, 1);
});

test('WAI-ARIA-compliant attributes', function(assert) {
  const panelComponentStub = this.stub(PanelComponentStub);

  run(() => {
    component = this.subject({ panel: panelComponentStub });
  });

  this.render();

  message = 'the `role` attribute of "tabpanel" is present';
  expected = 'tabpanel';
  actual = component.element.getAttribute('role');

  assert.equal(actual, expected, message);
});
