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

#### Selecting CSS Styles

`ember-ticketfly-accordion` includes a very small set of base
styles to ensure that its elements lay out correctly in the manner
of an accordion (that is, as a set of vertically stacked panels, with tabs
comprised of HTML `<buttons>`).

These can be seen in `app/styles/ember-ticketfly-accordion-core.css`.

But we can do better! If you'd like to control more styling of
`ember-ticketfly-accordion`'s elements, you can rely on being able to target
the following class names:

- `tfa-accordion`
- `tfa-panel`
- `tfa-panel-tab`
- `tfa-panel-body`

That being said, you can enable a few additional stylesheet imports
from your ENV configuration hash:

```js
ENV['ember-ticketfly-accordion'] = {
  extraStyles: {
    spiffy: true
  }
};
```

Extra imports are opt-in by default, though currently, [`spiffy`](./app/styles/ember-ticketfly-accordion-spiffy.css) is
the only additional option (It might be better off staying that way 😀.)

📋 A future update to the project will include interactive documentation to showcase
different uses and different ideas for styling.

#### Toggling Animation

Animation is enabled by default, and includes a super-lightweight implementation of
panel opening and closing built with the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) &mdash; with [support back
to IE 10](https://github.com/web-animations/web-animations-js/blob/master/docs/support.md#browser-support) thanks to the
thanks to the [W3C's `web-animations-next` polyfill](https://github.com/web-animations/web-animations-next)
(enabled in Ember by [the `ember-web-animations-next-polyfill` addon](https://github.com/web-animations/web-animations-next)).

Activation &mdash; and, furthermore, configuration &mdash; can be controlled in
`config/environment.js` as follows **(available settings are shown with their current defaults)**:

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

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).



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
