import Ember from 'ember';
import run from 'ember-runloop';
import { moduleForComponent /* , test */ } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';

const { K } = Ember;

const PanelComponentStub = {
  registerTab: K,
  unRegisterTab: K
};

let expected, actual, message, component;

moduleForComponent('tf-accordion-panel-tab', 'Unit | Component | tf accordion panel tab', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});


test('registering with its parent panel', function(assert) {
  const panelComponentStub = this.stub(PanelComponentStub);

  run(() => {
    component = this.subject({ panel: panelComponentStub });
  });

  this.render();

  assert.equal(panelComponentStub.registerTab.callCount, 1);
  assert.equal(panelComponentStub.unRegisterTab.callCount, 0);

  run(() => {
    component.willDestroyElement();
  });

  assert.equal(panelComponentStub.registerTab.callCount, 1);
  assert.equal(panelComponentStub.unRegisterTab.callCount, 1);
});


test('WAI-ARIA-compliant attributes', function(assert) {
  const panelComponentStub = this.stub(PanelComponentStub);

  run(() => {
    component = this.subject({ panel: panelComponentStub });
  });

  this.render();

  message = 'the `role` attribute of "tab" is present';
  expected = 'tab';
  actual = component.element.getAttribute('role');

  assert.equal(actual, expected, message);
});
