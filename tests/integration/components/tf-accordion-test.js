import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import getDOMNode from 'dummy/tests/helpers/get-dom-node';

const CLASS_NAMES = {
  ACCORDION: 'test-accordion',
  ACCORDION_PANEL: 'test-accordion__panel',
  ACCORDION_PANEL_TAB: 'test-accordion__panel-tab',
  ACCORDION_PANEL_BODY: 'test-accordion__panel-body'
};

// panel data to feed to our inline `accordion.panel` component
// within our "each" block
const INLINE_PANELS = [
  { tabTitle: 'Section 1', bodyContent: 'Red hair crookshanks bludger Marauder’s Map Prongs sunshine daisies butter mellow Ludo Bagman. Beaters gobbledegook' },
  { tabTitle: 'Section 2', bodyContent: 'Niffler dead easy second bedroom. Padma and Parvati Sorting Hat Minister of Magic blue turban remember my last.' }
];

const BLOCK_PANEL = { tabTitle: 'Section 3' };

const compositeTemplate = hbs`
  {{#tf-accordion class=CLASS_NAMES.ACCORDION multiExpand=isMultiExpand as |accordion|}}
    {{#each INLINE_PANELS as |inlinePanel|}}

      {{accordion.panel
        class=CLASS_NAMES.ACCORDION_PANEL
        tabClassName=CLASS_NAMES.ACCORDION_PANEL_TAB
        bodyClassName=CLASS_NAMES.ACCORDION_PANEL_BODY
        tabTitle=inlinePanel.tabTitle
        bodyContent=inlinePanel.bodyContent
      }}

    {{/each}}

  {{/tf-accordion}}
`;
// const compositeTemplate = hbs`
//   {{#tf-accordion class=CLASS_NAMES.ACCORDION as |accordion|}}
//     {{#each INLINE_PANELS as |inlinePanel|}}

//       {{accordion.panel
//         class=CLASS_NAMES.ACCORDION_PANEL
//         tabClassName=CLASS_NAMES.ACCORDION_PANEL_TAB
//         bodyClassName=CLASS_NAMES.ACCORDION_PANEL_BODY
//         tabTitle=inlinePanel.tabTitle
//         bodyContent=inlinePanel.bodyContent
//       }}

//     {{/each}}

//     {{#accordion.panel class=CLASS_NAMES.ACCORDION_PANEL as |blockPanel|}}

//       {{blockPanel.tab class=CLASS_NAMES.ACCORDION_PANEL_TAB title=BLOCK_PANEL.tabTitle}}

//       {{#blockPanel.body class=CLASS_NAMES.ACCORDION_PANEL_BODY}}
//         <h3>Trailers</h3>
//         <h3>Screenshots</h3>
//       {{/blockPanel.body}}

//     {{/accordion.panel}}
//   {{/tf-accordion}}
// `;

let expected, actual, message;

moduleForComponent('tf-accordion', 'Integration | Component | tf accordion root', {
  integration: true
});


test('yielding an interface to render child panels', function (assert) {
  this.set('CLASS_NAMES', CLASS_NAMES);
  this.set('INLINE_PANELS', INLINE_PANELS);
  this.set('BLOCK_PANEL', BLOCK_PANEL);

  this.render(compositeTemplate);

  const accordionElem = getDOMNode(this);

  message = 'accordion renders three child panel components';
  expected = 2;
  actual = accordionElem.querySelectorAll(`.${CLASS_NAMES.ACCORDION_PANEL}`).length;


  assert.equal(actual, expected, message);
});

test('panels are closed by default', function (assert) {
  this.set('CLASS_NAMES', CLASS_NAMES);
  this.set('INLINE_PANELS', INLINE_PANELS);
  this.set('BLOCK_PANEL', BLOCK_PANEL);

  this.render(compositeTemplate);

  const panelBodyElems = getDOMNode(this).querySelectorAll(`.${CLASS_NAMES.ACCORDION_PANEL_BODY}`);

  message = 'all panel-body elements should have `aria-hidden` set to `true`';
  expected = -1;
  actual = [...panelBodyElems].findIndex(elem => elem.getAttribute('aria-hidden') !== 'true');

  assert.equal(actual, expected, message);
});

test('individual panel body toggling on tab clicked', function (assert) {
  this.set('CLASS_NAMES', CLASS_NAMES);
  this.set('INLINE_PANELS', INLINE_PANELS);
  this.set('BLOCK_PANEL', BLOCK_PANEL);

  this.render(compositeTemplate);

  const firstPanelTabElem = getDOMNode(this).querySelector(`.${CLASS_NAMES.ACCORDION_PANEL_TAB}`);
  const firstPanelBodyElem = getDOMNode(this).querySelector(`.${CLASS_NAMES.ACCORDION_PANEL_BODY}`);

  assert.equal('true', firstPanelBodyElem.getAttribute('aria-hidden'));

  firstPanelTabElem.click();

  assert.equal('false', firstPanelBodyElem.getAttribute('aria-hidden'));

  firstPanelTabElem.click();

  assert.equal('true', firstPanelBodyElem.getAttribute('aria-hidden'));
});


test('closing the other open panel when multiexpand is false', function (assert) {
  this.set('CLASS_NAMES', CLASS_NAMES);
  this.set('INLINE_PANELS', INLINE_PANELS);
  this.set('BLOCK_PANEL', BLOCK_PANEL);

  this.render(compositeTemplate);

  const panelTabElems = getDOMNode(this).querySelectorAll(`.${CLASS_NAMES.ACCORDION_PANEL_TAB}`);
  const panelBodyElems = getDOMNode(this).querySelectorAll(`.${CLASS_NAMES.ACCORDION_PANEL_BODY}`);

  const firstPanelTabElem = panelTabElems[0];
  const firstPanelBodyElem = panelBodyElems[0];

  const secondPanelTabElem = panelTabElems[1];
  const secondPanelBodyElem = panelBodyElems[1];

  assert.equal('true', firstPanelBodyElem.getAttribute('aria-hidden'));
  assert.equal('true', secondPanelBodyElem.getAttribute('aria-hidden'));

  secondPanelTabElem.click();

  assert.equal('true', firstPanelBodyElem.getAttribute('aria-hidden'));
  assert.equal('false', secondPanelBodyElem.getAttribute('aria-hidden'));

  firstPanelTabElem.click();

  assert.equal('false', firstPanelBodyElem.getAttribute('aria-hidden'));
  assert.equal('true', secondPanelBodyElem.getAttribute('aria-hidden'));
});

test('allowing multiple panel bodies to be expanded when `multiexpand` is true', function (assert) {
  this.set('CLASS_NAMES', CLASS_NAMES);
  this.set('INLINE_PANELS', INLINE_PANELS);
  this.set('BLOCK_PANEL', BLOCK_PANEL);
  this.set('isMultiExpand', true);

  this.render(compositeTemplate);

  const panelTabElems = getDOMNode(this).querySelectorAll(`.${CLASS_NAMES.ACCORDION_PANEL_TAB}`);
  const panelBodyElems = getDOMNode(this).querySelectorAll(`.${CLASS_NAMES.ACCORDION_PANEL_BODY}`);

  const firstPanelTabElem = panelTabElems[0];
  const firstPanelBodyElem = panelBodyElems[0];

  const secondPanelTabElem = panelTabElems[1];
  const secondPanelBodyElem = panelBodyElems[1];

  assert.equal('true', firstPanelBodyElem.getAttribute('aria-hidden'));
  assert.equal('true', secondPanelBodyElem.getAttribute('aria-hidden'));

  secondPanelTabElem.click();

  assert.equal('true', firstPanelBodyElem.getAttribute('aria-hidden'));
  assert.equal('false', secondPanelBodyElem.getAttribute('aria-hidden'));

  firstPanelTabElem.click();

  assert.equal('false', firstPanelBodyElem.getAttribute('aria-hidden'));
  assert.equal('false', secondPanelBodyElem.getAttribute('aria-hidden'));
});
