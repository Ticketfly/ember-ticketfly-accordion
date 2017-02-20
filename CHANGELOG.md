# 0.6.2 &mdash; February 19, 2017

- **[PATCH]**: Remove unecessary extra touch handler that was accidentally inverting panel
toggling ([#42](https://github.com/Ticketfly/ember-ticketfly-accordion/pull/42])).


# 0.6.1 &mdash; February 17, 2017

- **[ENHANCEMENT]**: Tweak the start of the opening animation so that 
there's an extremely small duration set. ([#40](https://github.com/Ticketfly/ember-ticketfly-accordion/pull/40])).


# 0.6.0 &mdash; February 17, 2017

- **[BREAKING CHANGE]**: Top-level accordion element no longer has `width: 100%` built-in.
It seems much better to leave `width` untouched ([#38](https://github.com/Ticketfly/ember-ticketfly-accordion/pull/38])).

- **[ENHANCEMENT]**: Built-in styles have a little specificity as possilble, short of being behind 
the `.tfa-accordion` namespace ([#37](https://github.com/Ticketfly/ember-ticketfly-accordion/pull/37])).

- **[ADDED]**: First "real" version of interactive documentation ([#39](https://github.com/Ticketfly/ember-ticketfly-accordion/pull/39])).


# 0.5.0 &mdash; January 25, 2017

- **[ADDED]**: support for having a proper `aria-selected` value set on each panel tab element.
within an accordion.

- A note on the minor version bump: In retrospect, `0.4.1` also should have been a minor version bump,
since it added some significant improvements. The same applies for the addition above, thus,
here we are.


# 0.4.1 &mdash; January 25, 2017

- **[ADDED]**: `role="heading"` is now applied to the element for the `tfa-panel` component ([#32](https://github.com/Ticketfly/ember-ticketfly-accordion/pull/32])).

- **[ADDED]**: The `tfa-panel` component now has an attribute binding for `aria-level` ([#32](https://github.com/Ticketfly/ember-ticketfly-accordion/pull/32])).


# 0.4.0 &mdash; January 3, 2017

- **[BREAKING CHANGE]** Change name of attributes used to set class names for expanded panels ([#29](https://github.com/Ticketfly/ember-ticketfly-accordion/pull/29])).
  + `panelExpandedTabClass` on the `tf-accordion-panel` component is now `expandedTabClassName`.
    + This syntax has a more similar feel to `expandedClassName`.
  + `panelExpandedClass` on the `tf-accordion-panel-tab` component is now `expandedClassName`.
    + This is more consistent with the `expandedClassName` property on the `tf-accordion-panel` component
    and feels more intuitive when declaring in markup.


# 0.3.1 &mdash; December 27, 2016

- **[PATCH]** Fix CHANGELOG date typo.


# 0.3.0 &mdash; December 27, 2016

- **[BREAKING CHANGE]** CSS `contain` value to `layout` and remove `overflow: hidden` 
on root accordion ([#28](https://github.com/Ticketfly/ember-ticketfly-accordion/pull/28])).
  + `overflow` shouldn't be a concern of the addon. Simultaneously, only `layout` level
  containment is needed to optimize rendering the accordion's elements, wheras `content` containment
  prevented [`ink overflow`](https://drafts.csswg.org/css-overflow-3/#ink-overflow).

- **[ENHANCEMENT]** Add `appearance` to `none` to the styling for panel buttons ([#27](https://github.com/Ticketfly/ember-ticketfly-accordion/pull/27])). 


# 0.2.3 &mdash; December 13, 2016

- Remove necessary (and unused) `ember-hook` dependency. ([#26](https://github.com/Ticketfly/ember-ticketfly-accordion/pull/26]))


# 0.2.2 &mdash; December 10, 2016

- Fix `classNameBindings` to prevent `undefined` from being added. ([#25](https://github.com/Ticketfly/ember-ticketfly-accordion/pull/25]))


# 0.2.1 &mdash; December 9, 2016

- Bind the "tfa-panel--expanded" class to panel elements ([#22](https://github.com/Ticketfly/ember-ticketfly-accordion/pull/22]))

- Unset browsers's override of the CSS `text-align` property 
  for the panel tab (button) element ([#23](https://github.com/Ticketfly/ember-ticketfly-accordion/pull/23]))

- Clean up handling of custom class names. Support custom expanded-state classes ([#24](https://github.com/Ticketfly/ember-ticketfly-accordion/pull/24]))


# 0.2.0 &mdash; December 8, 2016

- Officially nix the idea for configurable stylesheets ([#20](https://github.com/Ticketfly/ember-ticketfly-accordion/pull/20]))


# 0.1.0 &mdash; December 1, 2016

- Enable `multi-expand mode` ([#12](https://github.com/Ticketfly/ember-ticketfly-accordion/pull/12))

- Implement, document, and test configurable animations ([#13](https://github.com/Ticketfly/ember-ticketfly-accordion/pull/13))

- Implement, document, and test configurable animation lifecycle hooks ([#14](https://github.com/Ticketfly/ember-ticketfly-accordion/pull/14))

- Implement, document, and test interface for events and action handling ([#18](https://github.com/Ticketfly/ember-ticketfly-accordion/pull/18))


# 0.0.3 &mdash; November 5, 2016

- Move styles to `vendor/` directory and import then
selectively from there ([#11](https://github.com/Ticketfly/ember-ticketfly-accordion/pull/11).)


# 0.0.2 &mdash; November 5, 2016

- Add CSS layout containment to root accordion. 


# 0.0.1 &mdash; November 5, 2016

- Initial core functionality and testing for accordion behavior
