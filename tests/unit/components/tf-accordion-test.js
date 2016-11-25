import { moduleForComponent, test } from 'ember-qunit';
import initAddonConfig from 'dummy/tests/helpers/init-addon-config';
import { animatePanelOpen, animatePanelClosed } from 'ember-ticketfly-accordion/utils/accordion-panel-animation';

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

test('WAI-ARIA-compliant attributes', function (assert) {
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

test('animatable by default', function (assert) {
  const component = this.subject();

  assert.equal(true, component.get('isAnimatable'));
});

test('setting default animation functions', function (assert) {
  const component = this.subject();

  message = 'addon animation functions are used by default';

  assert.equal(true, Object.is(animatePanelOpen, component.get('animatePanelOpen')), message);
  assert.equal(true, Object.is(animatePanelClosed, component.get('animatePanelClosed')), message);
});


test('overriding default animation functions', function (assert) {
  const customOpenFunc = function () {};
  const customCloseFunc = function () {};

  const component = this.subject({
    animatePanelOpen: customOpenFunc,
    animatePanelClosed: customCloseFunc,
  });

  message = 'addon animation functions can be overridden with arguments';

  assert.equal(true, Object.is(customOpenFunc, component.get('animatePanelOpen')), message);
  assert.equal(true, Object.is(customCloseFunc, component.get('animatePanelClosed')), message);
});
