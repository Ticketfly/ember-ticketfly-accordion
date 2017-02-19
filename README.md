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

View 

## Installing

```sh
ember install ember-ticketfly-accordion
```

## Features

- Full [WAI-ARIA](https://www.w3.org/TR/wai-aria-practices-1.1/#accordion) Compliance for Accessibility Winning.
- A robust callback API for handling DOM events with closure actions.
- Built-in (but configurable) buttery-smooth animation through the [Web-Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) and [`ember-web-animations-next-polyfill`](https://github.com/BrianSipple/ember-web-animations-next-polyfill).
- Semantic HTML
  + Tabs are comprised of `<button>` elements instead of plain `<div>`s.


## Compatibility

This addon makes use of [contextual components](http://emberjs.com/blog/2016/01/15/ember-2-3-released.html#toc_contextual-components), and is therefore
intended to support versions of Ember >= `2.3.0`.

## Usage

View the [interactive documentation](https://ticketfly.github.io/ember-ticketfly-accordion/) for usage information and tips.

## Configuration

To provide `ember-ticketfly-accordion` with [configuration options](#supported-options), define
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


## Working with ARIA Attributes

As part of its adherence to the [WAI-ARIA accordion spec](https://www.w3.org/TR/wai-aria-practices-1.1/#accordion), each 
part of the component system contains the `attributeBindings` needed to automatically set 
proper values for attributes such as `aria-expanded`() `aria-multiselectable`(), `aria-controls`(), etc. 

This behavior is built-in for free. 

Some ARIA attribute values are arbitrary, however, and where it's appropriate, components will declare bindings
for attributes that you can set directly. Currently, this includes:

##### `tf-accordion-panel`
- `aria-level`: Since the panel functions as a "heading", but isn't any of the standard heading elements
(`<h1>`, `<h2>`, etc), this value should be set on each panel in the accordion according to 
how you would define its heading level within your document. Since accordions can be used in just about any 
context, `tf-accordion-panel` makes no default assumptions about this in advance.



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
