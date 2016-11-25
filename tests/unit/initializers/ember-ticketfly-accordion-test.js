import Ember from 'ember';
import EmberTicketflyAccordionInitializer from 'dummy/initializers/ember-ticketfly-accordion';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | ember ticketfly accordion', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  EmberTicketflyAccordionInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
