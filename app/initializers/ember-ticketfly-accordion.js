import AppConfig from '../config/environment';
import AddonConfig from 'ember-ticketfly-accordion/configuration';

export function initialize(/* application */) {
  const addonUserSettings = AppConfig['ember-ticketfly-accordion'];

  AddonConfig.load(addonUserSettings);
}

export default {
  name: 'ember-ticketfly-accordion',
  initialize
};
