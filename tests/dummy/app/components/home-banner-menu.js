import Component from 'ember-component';
import layout from '../templates/components/home-banner-menu';
import get from 'ember-metal/get';

const KEYCODE_ENTER = 19;
const KEYCODE_SPACE = 32;

export default Component.extend({
  layout,
  tagName: 'ul',
  classNames: [
    'c-home-banner-menu',
    'u-relative',
    'o-grid',
    'o-grid--align-center',
    'o-grid--align-middle',
    'o-grid--fit',
    'g-list-reset',
    'u-text-center'
  ],

  'on-item-select'() {},

  actions: {
    itemClicked(anchorHash, ev) {
      get(this, 'on-item-select')(anchorHash, ev);
    },

    itemKeyDown(anchorHash, ev) {
      const keycode = ev.keyCode || ev.which;

      if ([KEYCODE_ENTER, KEYCODE_SPACE].includes(keycode)) {
        get(this, 'on-item-select')(anchorHash, ev);
      }
    }
  }
});
