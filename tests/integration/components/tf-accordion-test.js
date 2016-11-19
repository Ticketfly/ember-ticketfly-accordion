import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import getDOMNode from 'dummy/tests/helpers/get-dom-node';
import EmberObject from 'ember-object';

const { assign } = Object;

const ComponentProto = EmberObject.extend({
  multiExpand: false,
  cycleFocus: true
});

const PanelProto = EmberObject.extend({
  tabTitle: 'Panel Section Tab',
  bodyContent: 'Red hair crookshanks bludger Marauder’s Map Prongs sunshine daisies butter mellow Ludo Bagman. Beaters gobbledegook',
  isExpanded: false
});

const CLASS_NAMES = {
  ACCORDION: 'test-accordion',
  ACCORDION_PANEL: 'test-accordion__panel',
  ACCORDION_PANEL_TAB: 'test-accordion__panel-tab',
  ACCORDION_PANEL_BODY: 'test-accordion__panel-body'
};


const compositeTemplate = hbs`
  {{#tf-accordion
    class=CLASS_NAMES.ACCORDION
    cycleFocus=componentProto.cycleFocus
    multiExpand=componentProto.multiExpand as |accordion|
  }}
    {{#each INLINE_PANELS as |inlinePanel|}}

      {{accordion.panel
        class=CLASS_NAMES.ACCORDION_PANEL
        tabClassName=CLASS_NAMES.ACCORDION_PANEL_TAB
        bodyClassName=CLASS_NAMES.ACCORDION_PANEL_BODY
        tabTitle=inlinePanel.tabTitle
        bodyContent=inlinePanel.bodyContent
        isExpanded=inlinePanel.isExpanded
      }}

    {{/each}}
  {{/tf-accordion}}
`;

let expected;
let actual;
let message;

moduleForComponent('tf-accordion', 'Integration | Component | tf accordion root', {
  integration: true,

  beforeEach() {
    this.set('componentProto', ComponentProto.create());
    this.set('INLINE_PANELS', [
      PanelProto.create(),
      PanelProto.create()
    ]);
    this.set('CLASS_NAMES', CLASS_NAMES);
    // this.set('BLOCK_PANEL', BLOCK_PANEL);
  }
});

test('yielding an interface to render child panels', function (assert) {
  this.render(compositeTemplate);

  const accordionElem = getDOMNode(this);

  message = 'accordion renders three child panel components';
  expected = 2;
  actual = accordionElem.querySelectorAll(`.${CLASS_NAMES.ACCORDION_PANEL}`).length;

  assert.equal(actual, expected, message);
});

test('panels are closed by default', function (assert) {
  this.render(compositeTemplate);

  const panelBodyElems = getDOMNode(this).querySelectorAll(`.${CLASS_NAMES.ACCORDION_PANEL_BODY}`);

  message = 'all panel-body elements should have `aria-hidden` set to `true`';
  expected = -1;
  actual = Array.from(panelBodyElems).findIndex(elem => elem.getAttribute('aria-hidden') !== 'true');

  assert.equal(actual, expected, message);
});

test('individual panel body toggling on tab clicked', function (assert) {
  this.render(compositeTemplate);

  const firstPanelTabElem = getDOMNode(this).querySelector(`.${CLASS_NAMES.ACCORDION_PANEL_TAB}`);
  const firstPanelBodyElem = getDOMNode(this).querySelector(`.${CLASS_NAMES.ACCORDION_PANEL_BODY}`);

  assert.equal('true', firstPanelBodyElem.getAttribute('aria-hidden'));

  firstPanelTabElem.click();

  assert.equal('false', firstPanelBodyElem.getAttribute('aria-hidden'));

  firstPanelTabElem.click();

  assert.equal('true', firstPanelBodyElem.getAttribute('aria-hidden'));
});

test('closing the other open panel when `multiExpand` is false', function (assert) {
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

test('allowing multiple panel bodies to be expanded when `multiExpand` is true', function (assert) {
  const componentProto = assign({}, ComponentProto, { multiExpand: true });

  this.set('componentProto', componentProto);

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
