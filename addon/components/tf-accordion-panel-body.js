import Component from 'ember-component';
import layout from '../templates/components/tf-accordion-panel-body';

export default Component.extend({
  layout,
  hook: 'tf-accordion-panel-body',
  classNames: ['tf-accordion-panel-body'],

  ariaRole: 'tabpanel'
});
