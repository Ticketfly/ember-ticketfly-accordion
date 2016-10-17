import Ember from 'ember';
import layout from '../templates/components/tf-accordion';

export default Ember.Component.extend({
  layout,
  attributeBindings: ['aria-multiselectable'],

  ariaRole: 'tablist',
  'aria-multiselectable': "true"
});
