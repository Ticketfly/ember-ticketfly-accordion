// import { animatePanelClosed, animatePanelOpen } from 'dummy/utils/accordion-panel-animation';
// import { module, test } from 'qunit';
// import run from 'ember-runloop';
// import registerTestComponent from 'dummy/tests/helpers/register-test-component';

// const DIMENSION_PANEL_BODY_HEIGHT = 100;

// function makePanelBodyElem(tagName = 'div', dimensions = {}) {
//   const elem = document.createElement(tagName);

//   elem.style.height = dimensions.height || DIMENSION_PANEL_BODY_HEIGHT;

//   return elem;
// }

// let expected, actual, dummyPanelBody;

// module('Unit | Utility | accordion panel animation');

// test(`animating a component's element`, function(assert) {
//   const dimensions = { height: DIMENSION_PANEL_BODY_HEIGHT };
//   const dummyElement = makePanelBodyElem('div', dimensions);
//   debugger;

//   dummyPanelBody = registerTestComponent(this, {
//     element: dummyElement
//   });

//   run(() => {
//     animatePanelOpen(dummyPanelBody);
//   });

//   debugger;
//   expected = dimensions.height;
//   actual = dummyElement.offsetHeight;
//   assert.equal(actual, expected);
// });
