import Component from 'ember-component';
import computed from 'ember-computed';
import get from 'ember-metal/get';

export default Component.extend({
  tagName: 'svg',
  attributeBindings: ['viewBox', 'fill'],

  fill: 'currentColor',
  dotGapSize: 50,
  dotRadius: 10,
  numDots: 3,

  viewBoxLength: computed('dotGapSize', 'numDots', 'dotRadius', {
    get() {
      const numDots = get(this, 'numDots');
      const dotGapSize = get(this, 'dotGapSize');
      const dotRadius = get(this, 'dotRadius');

      return (
        (dotGapSize * (numDots - 1)) +
        (dotRadius * (numDots - 1))
      );
    }
  }),

  viewBox: computed('viewBoxLength', 'dotRadius', {
    get() {
      const viewBoxLength = get(this, 'viewBoxLength');
      const dotRadius = get(this, 'dotRadius');

      return `0 0 ${viewBoxLength} ${dotRadius * 2}`;
    }
  }),

  dots: computed('viewBox', {
    get() {
      const numDots = get(this, 'numDots');
      const dotGapSize = get(this, 'dotGapSize');
      const dotRadius = get(this, 'dotRadius');

      return Array.from({ length: numDots }, (item, idx) => {
        return {
          cx: dotRadius + (idx * dotGapSize),
          cy: dotRadius,
          radius: dotRadius
        }
      });
    }
  })
});
