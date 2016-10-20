import Component from 'ember-component';
import layout from '../templates/components/tf-accordion-panel-toggle';

export default Component.extend({
  layout,
  tagName: 'button',
  classNames: ['tf-accordion-panel-toggle'],
  hook: 'tf-accordion-panel-toggle',

  ariaRole: 'tab',

  title: ''
});
