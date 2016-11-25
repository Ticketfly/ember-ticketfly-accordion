import AddonConfig from 'ember-ticketfly-accordion/configuration';

const { assign } = Object;

const TEST_DEFAULTS = {
  useAddonAnimations: true,
  addonAnimationSettings: {
    panelClose: {
      easing: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)' // ease-in-out-cubic
    },
    panelOpen: {
      easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)' // ease-out-cubic
    }
  }
};

/**
 * Test helper to set proper addon configuration settings for testing
 */
export default function initAddonConfig(options = {}) {
  AddonConfig.load(assign({}, TEST_DEFAULTS, options));
}
