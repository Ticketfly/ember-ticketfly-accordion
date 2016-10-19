import Component from 'ember-component';
import layout from '../templates/components/tf-accordion-panel';

/**
 * This component wraps a `tf-accordion-panel-toggle` and `tf-accordion-panel-body` component
 */
export default Component.extend({
  layout,
  hook: 'tf-accordion__panel',
  classNames: ['tf-accordion__panel']
});
