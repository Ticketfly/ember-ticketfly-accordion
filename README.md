# ember-ticketfly-accordion

_An [ARIA-compliant](https://www.w3.org/TR/wai-aria-practices-1.1/#accordion), easy-to-use
accordion system built from composable Ember components -- with
optional built-in animation through the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)._

[![Latest NPM release][npm-badge]][npm-badge-url]
[![CircleCI Build Status][circle-badge]][circle-badge-url]
[![Test Coverage][coverage-badge]][coverage-badge-url]
[![Code Climate][codeclimate-badge]][codeclimate-badge-url]
[![Ember Observer Score][ember-observer-badge]][ember-observer-badge-url]
[![License][license-badge]][license-badge-url]
[![Dependencies][dependencies-badge]][dependencies-badge-url]
[![Dev Dependencies][devDependencies-badge]][devDependencies-badge-url]


## Installing

```sh
ember install ember-ticketfly-accordion
```

## Features

- Full WAI-ARIA Compliance for Accessibility Winning
- A robust callback API handling DOM events with closure actions.
- Optional, built-in, dependency-free and buttery-smooth animation through the Web Animations API.
- Semantic HTML
  + Tabs are comprised of `<button>` elements instead of anchor tags or divs.    

## Compatibility

This addon makes use of [contextual components](http://emberjs.com/blog/2016/01/15/ember-2-3-released.html#toc_contextual-components), and is therefore
intended to support versions of Ember >= `2.3.0`.


## Configuration

To provide `ember-ticketfly-accordion` with configuration options, define
them in a hash on the `'ember-ticketfly-accordion'` property of the object
exported from your `config/environment.js` file:

```js
ENV['ember-ticketfly-accordion'] = {
  // options go here
};
```

### Supported Options

#### Toggling Animation

Animation is enabled by default, and includes a super-lightweight implementation of
panel opening and closing built with the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) &mdash; with [support back
to IE 10](https://github.com/web-animations/web-animations-js/blob/master/docs/support.md#browser-support) thanks to the
thanks to the [W3C's `web-animations-next` polyfill](https://github.com/web-animations/web-animations-next)
(enabled in Ember by [the `ember-web-animations-next-polyfill` addon](https://github.com/web-animations/web-animations-next)).

To disable animation, simply set `animatable` to `false` on the root accordion component.

To customize animation, there are two approaches:

1. Overriding the addon's default implementation by passing your own functions to
the `animatePanelOpen` and `animatePanelClosed` properties on the root accordion component (One
or both can be overridden).

2. Configuring aspects of the addon's default implementation by setting `addonAnimationSettings` properties
in `config/environment.js` like so **(available settings are shown with their current defaults)**:

```js
ENV['ember-ticketfly-accordion'] = {
  useAddonAnimations: true,
  addonAnimationSettings: {
    panelClose: {
      duration: 390
      easing: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)' // ease-in-out-cubic
    },
    panelOpen: {
      duration: 390
      easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)' // ease-out-cubic
    }
  }
};
```

## Usage

### Enabling MultiExpand Mode

By default, `ember-ticketfly-accordion` follows the standard accordion
interface pattern: that is, it allows for one panel to be expanded while
keeping the other panels closed.

But it's also flexible!

If you'd like to expand multiple panels simultaneously, simply set
`multiExpand` to `true` on the root `tf-accordion` component. From there,
each panel in an accordion will toggle open and closed independently of the others.  

### Actions and Action Arguments

The root `tf-accordion` component handles a number of events for its 
child panels. These are exposed callbacks that can be set with 
[Ember actions](https://guides.emberjs.com/v2.9.0/templates/actions/).  

**Please note that all actions are expected to be closure actions**, and so you must use
the `action` helper (i.e. `onPanelTabFocusIn=(action "panelTabFocusOut")`), or another template 
helper that facilitates curried functions (for example, [Ember Concurrency's `perform` helper](http://ember-concurrency.com/#/docs/writing-tasks).
 
#### Focus Event callbacks

In addition to expanding a panel's body when its tab element is 
clicked, accordions abide by the notion of shifting _focus_ on each
tab. You can hook in to both the `focus` and `focusOut` event of a panel 
tab by setting an action on the `onPanelTabFocusIn` and `onPanelTabFocusOut`
properties respectively.

Your handler will be called with the following arguments:

- `panelComponent` `{Object}`: the instance object of the `tf-accordion-panel`
  component from which the event was fired.

- `event` `{Object}`: the jQuery event of the action


#### Animation Callbacks

##### onPanelAnimatedOpen

***TODO: Document above and link here***

##### onPanelAnimatedClosed

***TODO: Document above and link here***

#### Panel Body Expansion Changes

`onPanelExpandChanged` fires when a `tf-accordion-panel-body` component detects a change
to its `isExpanded` attribute. 

When the action fires it sends two arguments: the panel-body's parent `tf-accordion-panel` component,
and whether or not the panel body is currently (i.e: newly) expanded (boolean).

#### Making use of Currying

Most of the time all you need is the relevant component, but sometimes your action 
requires more context than just that. This is where closure action currying
comes in handy. In those cases, you can pass any arguments you need from the template. For example:

```handlebars
{{tf-accordion onPanelTabFocusOut=(action "panelWasFocusedOut" shouldShowDialogOnFocusOut)}}
```
Then, inside your action handler:

```js
export default Ember.Route.extend({
  actions: {
    panelWasFocusedOut(panelComponent, event, shouldShowDialogOnFocusOut) {
      if (shouldShowDialogOnFocusOut) {
        // ... do something fancy with dialogs 
      }
    }
  }
});
```

### Practical Styling Advice

`ember-ticketfly-accordion` includes a very small set of base
styles to ensure that its elements lay out correctly in the manner
of an accordion (that is, as a set of vertically stacked panels, with tabs
comprised of HTML `<buttons>`).

These can be seen in `app/styles/ember-ticketfly-accordion.css`.

But we can do better! If you'd like to control more styling of
`ember-ticketfly-accordion`'s elements, you can rely on being able to target
the following class names:

- `tfa-accordion`
- `tfa-panel`
- `tfa-panel-tab`
- `tfa-panel-body`

The following modifier classes are also added to a panel 
when it's expanded:

- `tfa-panel--expanded` (added to the panel element when expanded)   
- `tfa-panel-tab--expanded` (added to the panel's tab element when expanded)  

## Collaborating

* `git clone <repository-url>` this repository
* `cd ember-ticketfly-accordion`
* `npm install`
* `bower install`

### Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).



[npm-badge]: https://img.shields.io/npm/v/ember-ticketfly-accordion.svg
[npm-badge-url]: https://www.npmjs.com/package/ember-ticketfly-accordion
[circle-badge]: https://circleci.com/gh/Ticketfly/ember-ticketfly-accordion/tree/master.svg?style=svg&circle-token={{CIRCLE_TOKEN}}
[circle-badge-url]: https://circleci.com/gh/Ticketfly/ember-ticketfly-accordion/tree/master
[codeclimate-badge]: https://img.shields.io/codeclimate/github/Ticketfly/ember-ticketfly-accordion.svg
[codeclimate-badge-url]: https://codeclimate.com/github/Ticketfly/ember-ticketfly-accordion
[coverage-badge]: https://codeclimate.com/repos/580452d5c451cf0072003bc5/badges/fe9856d5b427c83eec3c/coverage.svg
[coverage-badge-url]: https://codeclimate.com/repos/580452d5c451cf0072003bc5/coverage
[ember-observer-badge]: http://emberobserver.com/badges/ember-ticketfly-accordion.svg
[ember-observer-badge-url]: http://emberobserver.com/addons/ember-ticketfly-accordion
[license-badge]: https://img.shields.io/npm/l/ember-ticketfly-accordion.svg
[license-badge-url]: LICENSE.md
[dependencies-badge]: https://img.shields.io/david/Ticketfly/ember-ticketfly-accordion.svg
[dependencies-badge-url]: https://david-dm.org/Ticketfly/ember-ticketfly-accordion
[devDependencies-badge]: https://img.shields.io/david/dev/Ticketfly/ember-ticketfly-accordion.svg
[devDependencies-badge-url]: https://david-dm.org/Ticketfly/ember-ticketfly-accordion#info=devDependencies
