import { moduleForComponent, test } from 'ember-qunit';
import initAddonConfig from 'dummy/tests/helpers/init-addon-config';

let expected;
let actual;
let message;

moduleForComponent('tf-accordion', 'Unit | Component | tf accordion root', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true,
  beforeEach() {
    initAddonConfig();
  }
});

test('WAI-ARIA-compliant attributes', function(assert) {
  const component = this.subject();

  this.render();

  message = 'the `role` attribute of "tablist" is present';
  expected = 'tablist';
  actual = component.element.getAttribute('role');

  assert.equal(actual, expected, message);


  message = 'the `aria-multiselectable` attribute of "true" is present';
  expected = "true";
  actual = component.element.getAttribute('aria-multiselectable');

  assert.equal(actual, expected, message);
});
