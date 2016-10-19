import Component from 'ember-component';
import layout from '../templates/components/tf-accordion-panel-toggle';

export default Component.extend({
  layout,
  tagName: 'button',
  classNames: ['tf-accordion__panel-toggle'],
  hook: 'tf-accordion__panel-toggle',

  ariaRole: 'tab',

  title: ''
});
