import Component from 'ember-component';
import getOwner from 'ember-owner/get';
import { assign } from 'ember-platform';

const REGISTRATION = 'component:test-component';

export function registerTestComponent(context, opts = {}) {
  const owner = getOwner(context);
  const options = assign({ tagName: 'dummy' }, opts);

  const TestComponent = Component.extend(options);

  unregisterTestComponent(context);
  owner.register(REGISTRATION, TestComponent);

  return TestComponent;
}

export function unregisterTestComponent(context) {
  const owner = getOwner(context);

  if (owner.resolveRegistration(REGISTRATION)) {
    owner.unregister(REGISTRATION);
  }
}

export default registerTestComponent;
