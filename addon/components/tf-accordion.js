import Component from 'ember-component';
import layout from '../templates/components/tf-accordion';

export default Component.extend({
  layout,
  attributeBindings: ['aria-multiselectable'],

  ariaRole: 'tablist',
  'aria-multiselectable': 'true'
});
