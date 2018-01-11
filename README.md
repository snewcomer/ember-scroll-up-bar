# ember-scroll-up-bar

This addon simply wraps your navigation/header component and will render it at the top of the document when the user is scrolling up and conversely will hide when the user is scrolling down, saving critical space on mobile.

NOTE: As the user scrolls down, this component will stick closeby to the top of the viewport by setting the absolute position to the current pageYOffset.  Thus as you scroll down, it will fade away slightly instead of disapearing quickly.  However, if the content below your navigation component is relatively positioned, the content will replace the space where your navigation did exist since your header component was lifted from the DOM and absolutely positioned.

- will position your element fixed with top: 0 if user scrolls up
- adds `ember-scroll-up-bar` class if in view
- resets to original styles when scrolled back to top
- No jQuery!  Event listeners are on the `document`.  Will make build w/ no jQuery in the future
- requestAnimationFrame for performant layout re-renders

## Usage

```
{{#ember-scroll-up-bar}}
  {{site-header}}
{{/ember-scroll-up-bar}}

<main>
  {{outlet}}
</main>
{{site-footer}}
```

This README outlines the details of collaborating on this Ember addon.

## Installation

* `git clone <repository-url>` this repository
* `cd ember-scroll-up-bar`
* `npm install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
