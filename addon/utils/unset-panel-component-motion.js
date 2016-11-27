import set from 'ember-metal/set';

export default function unsetPanelComponentMotion(panelComponent) {
  set(panelComponent, 'isInMotion', false);
}
