import { moduleForComponent, test } from 'ember-qunit';

let expected, actual, message;

moduleForComponent('tf-accordion-panel-body', 'Unit | Component | tf accordion panel body', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('WAI-ARIA-compliant attributes', function(assert) {
  const component = this.subject();

  this.render();

  message = 'the `role` attribute of "tabpanel" is present';
  expected = 'tabpanel';
  actual = component.element.getAttribute('role');

  assert.equal(actual, expected, message);
});
