import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tf-accordion-panel', 'Integration | Component | tf accordion panel', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{tf-accordion-panel}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tf-accordion-panel}}
      template block text
    {{/tf-accordion-panel}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
