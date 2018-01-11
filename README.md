# ember-scroll-up-bar

- will position your element fixed with top: 0 if in view.
- adds `ember-scroll-up-bar` class if in view
- resets to original styles when scrolled back to top
- No jQuery!  Will make build w/ no jQuery in the future

## Usage

```
{{#ember-scroll-up-bar}}
  {{site-header}}
{{/ember-scroll-up-bar}}
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
