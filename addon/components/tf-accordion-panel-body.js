import Component from 'ember-component';
import layout from '../templates/components/tf-accordion-panel-body';
import { not } from 'ember-computed';

export default Component.extend({
  layout,
  hook: 'tf-accordion-panel-body',

  attributeBindings: [
    'tabID:aria-labelledby', 
    'isHidden:aria-hidden'
  ],

  classNames: ['tf-accordion-panel-body'],

  tabID: '',
  content: '',
  isPanelExpanded: false,

  ariaRole: 'tabpanel',  
  isHidden: not('isPanelExpanded') 
});
