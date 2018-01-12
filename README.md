# ember-scroll-up-bar

This addon simply wraps your navigation/header component and will render it at the top of the document when the user is scrolling up and conversely will hide when the user is scrolling down, saving critical space on mobile.  This is done using `ember-maybe-in-element`

Various apps are structured differently and to avoid layout problems when switching b/w absolute/fixed positioning and back to your original css (possibly causing content to move up depending on your architecture), I just decided to duplicate the header code.  This addon can be used directly or as a good informational source on how to implement on your own!


- will position your element fixed with top: 0, right: 0, and left: 0 if user scrolls up
- adds `ember-scroll-up-bar` element if in view with animation when sliding in and out
- No jQuery!  Event listeners are on the `document`.  Will make build w/ no jQuery in the future
- requestAnimationFrame for performant layout re-renders
- Does not assume structure of you app, thus need to duplicate your header code as shown below.  

## Usage

```
{{#ember-scroll-up-bar componentHeight=85}}
  {{site-header}}
{{/ember-scroll-up-bar}}

{{site-header}}
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
