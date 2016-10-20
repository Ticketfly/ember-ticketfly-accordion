import Component from 'ember-component';
import layout from '../templates/components/tf-accordion-panel-toggle';

export default Component.extend({
  layout,
  hook: 'tf-accordion-panel-toggle',
  tagName: 'button',
  
  attributeBindings: ['isPanelExpanded:aria-expanded'],
  classNames: ['tf-accordion-panel-toggle'],

  ariaRole: 'tab',
  isPanelExpanded: false,

  id: '',
  title: ''
});
