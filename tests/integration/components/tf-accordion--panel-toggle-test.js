import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tf-accordion-panel-toggle', 'Integration | Component | tf accordion panel toggle', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{tf-accordion-panel-toggle}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tf-accordion-panel-toggle}}
      template block text
    {{/tf-accordion-panel-toggle}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
