import { animatePanelClosed, animatePanelOpen } from 'dummy/utils/accordion-panel-animation';
import { module, test } from 'qunit';
import run from 'ember-runloop';
import registerTestComponent from 'dummy/tests/helpers/registerTestComponent';

const DIMENSION_PANEL_BODY_HEIGHT = 100;

const PanelBodyProto = {
  element: null
};

function makePanelBodyElem(tagName = 'div', dimensions = {}) {
  const elem = document.createElement(tagName);

  elem.style.height = dimensions.height;

  return elem;
}


let expected, actual, dummyPanelBody;

module('Unit | Utility | accordion panel animation');

test(`animating a component's element`, function(assert) {
  dummyPanelBody = registerTestComponent(this, dummyPanelBodyProto);
});
