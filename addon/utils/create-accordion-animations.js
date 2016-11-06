import { scheduleOnce } from 'ember-runloop';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import Configuration from 'ember-ticketfly-accordion/configuration';

const { addonAnimationSettings = {} } = Configuration;

const closeSettings = addonAnimationSettings.panelClose || {};
const openSettings = addonAnimationSettings.panelOpen || {};

const DURATION__CLOSE_PANEL = closeSettings.duration || 390;
const DURATION__OPEN_PANEL = openSettings.duration || 390;

const EASING__CLOSE_PANEL = closeSettings.easing || 'cubic-bezier(0.645, 0.045, 0.355, 1.000)'; // ease-in-out-cubic
const EASING__OPEN_PANEL = openSettings.easing || 'cubic-bezier(0.215, 0.610, 0.355, 1)'; // ease-out-cubic

const OPEN_TIMING = {
  duration: DURATION__OPEN_PANEL,
  easing: EASING__OPEN_PANEL,
  fill: 'forwards'
};

const CLOSE_TIMING = {
  duration: DURATION__CLOSE_PANEL,
  easing: EASING__CLOSE_PANEL,
  fill: 'forwards'
};

function makeStartingOpenEffect(elem, type = 'open') {
  return new KeyframeEffect(
    elem,
    [
      // fun trick that will allow us to measure the element's final height before animating it there
      { visibility: 'hidden', position: 'absolute' }
    ],
    { duration: 0 }
  );
}

function makeSlideDownEffect(panelBodyElem) {
  const { height, paddingTop, paddingBottom } = getComputedStyle(panelBodyElem);

  return new KeyframeEffect(
    panelBodyElem,
    [
      { visibility: 'visible', height: '0px', paddingTop: '0px', paddingBottom: '0px', overflow: 'hidden', opacity: 0 },
      { height: `${height}`, paddingTop: `${paddingTop}`, paddingBottom: `${paddingBottom}`, opacity: 1 }
    ],
    OPEN_TIMING
  );
}

function makeClosingEffect(panelBodyElem, { height, paddingTop, paddingBottom } = startingDimensions) {
  return new KeyframeEffect(
    panelBodyElem,
    [
      { height, paddingTop, paddingBottom, overflow: 'hidden', visibility: 'visible', opacity: 1 },
      { height: '0px', paddingTop: '0px', paddingBottom: '0px', visibility: 'hidden', opacity: 0 }
    ],
    CLOSE_TIMING
  );
}

function animatePanelOpen(panelBodyComponent) {
  const panelBodyElem = get(panelBodyComponent, 'element');
  const startingEffect = makeStartingOpenEffect(panelBodyElem);
  const animation = new Animation(startingEffect, document.timeline);

  animation.onfinish = function _initialPanelOpenOnfinish() {
    const slideDownEffect = makeSlideDownEffect(panelBodyElem);

    new Animation(slideDownEffect, document.timeline).play();

    scheduleOnce('afterRender', this, function _removePanelBodyClosedState() {
      set(panelBodyComponent, 'hasAnimatedClosed', false);
    });
  };

  animation.play();

  return animation;
}

function animatePanelClose(panelBodyComponent) {
  const panelBodyElem = get(panelBodyComponent, 'element');
  const { height, paddingTop, paddingBottom } = getComputedStyle(panelBodyElem);

  const effect = makeClosingEffect(panelBodyElem, { height, paddingTop, paddingBottom });
  const animation = new Animation(effect, document.timeline);

  animation.onfinish = function _panelCloseOnfinish() {
    panelBodyElem.animate(
      [
        { height, paddingTop, paddingBottom, visibility: 'visible' }
      ],
      { duration: 0.0001, fill: 'forwards' }
    );

    scheduleOnce('afterRender', this, function _addPanelBodyClosedState() {
      set(panelBodyComponent, 'hasAnimatedClosed', true);
    });
  };

  animation.play();

  return animation;
}

export { animatePanelOpen, animatePanelClose };

