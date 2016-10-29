import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tf-accordion', 'Integration | Component | tf accordion', {
  integration: true
});

const CLASS_NAMES = {
  ACCORDION: 'test-accordion',
  ACCORDION_PANEL: 'test-accordion__panel',
  ACCORDION_PANEL_TAB: 'test-accordion__panel-tab',
  ACCORDION_PANEL_BODY: 'test-accordion__panel-body'
};

const compositeTemplate = hbs`
  {{#tf-accordion class=CLASS_NAMES.ACCORDION as |accordion|}}
    {{#each panels as |inlinePanel|}}

      {{accordion.panel
        class=CLASS_NAMES.ACCORDION_PANEL
        tabClassName=CLASS_NAMES.ACCORDION_TAB
        bodyClassName=CLASS_NAMES.ACCORDION_BODY
        tabTitle=inlinePanel.tabTitle
        bodyContent=inlinePanel.bodyContent
      }}

    {{/each}}

    {{#accordion.panel class=CLASS_NAMES.ACCORDION_PANEL as |blockPanel|}}

      {{panel.tab class=CLASS_NAMES.ACCORDION_TAB title=blockPanel.tabTitle}}
      {{#panel.body class=CLASS_NAMES.ACCORDION_BODY}}
        <h3>Trailers</h3>
        <h3>Screenshots</h3>
      {{/panel.body}}
    {{/accordion.panel}}
  {{/tf-accordion}}
`;


test('rendering child components with configurable class names', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{tf-accordion}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tf-accordion}}
      template block text
    {{/tf-accordion}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
