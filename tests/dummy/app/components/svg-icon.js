import Component from 'ember-component';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import layout from '../templates/components/svg-icon';
import ENV from 'dummy/config/environment';

const { rootURL } = ENV;
const ICON_PATH_PREFIX = `${rootURL}assets/icons.svg#`;

export default Component.extend({
  layout,
  tagName: 'svg',
  attributeBindings: [
    'id',
    'aria-hidden',
    'version',
    'viewBox',
    'xmlns',
    'xmlnsXlink:xmlns:xlink',   // special syntax for namespaced attributes (https://github.com/emberjs/ember.js/pull/10186#discussion_r22911832)
    'x',
    'y',
    'width',
    'height',
    'stroke',
    'stroke-width',
    'fill',
    'preserveAspectRatio',
    'style'
  ],

  classNames: ['c-svg-icon'],

  /* ------------------- API ------------------- */
  version: '1.1',

  // @see: https://github.com/BrianSipple/why-am-i-doing-this/blob/master/a11y/explicit-values-for-state-attributes.md
  'aria-hidden': 'true',

  width: '1em',
  height: '1em',
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink',
  stroke: 'none',
  fill: 'none',
  'stroke-width': '0.0625rem',

  fileName: '',

  /* ------------------- COMPUTED ------------------- */

  filePath: computed('fileName', {
    get() {
      return `${ICON_PATH_PREFIX}${get(this, 'fileName')}`;
    }
  })
});
