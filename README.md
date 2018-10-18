# ember-scroll-up-bar

This addon simply wraps your navigation/header component and will render it at the top of the document when the user is scrolling up and conversely will hide when the user is scrolling down, saving critical space on mobile.  This is done using `ember-maybe-in-element`

- positions your element fixed with top: 0, right: 0, and left: 0 if user scrolls up
- adds `<ember-scroll-up-bar>` element if in view with animation when sliding in and out
- No jQuery!  Event listeners are on the `document`.  Will make build w/ no jQuery in the future
- requestAnimationFrame for performant layout re-renders
- Does not assume structure of you app, thus need to duplicate your header code as shown below.
- currently supports scss (if you are using something else, it is easy to copy to your desired format)

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

And import the scss file into your app.scss

```
@import 'ember-scroll-up-bar'
```

Installation
------------------------------------------------------------------------------

```
ember install ember-scroll-up-bar
```


Usage
------------------------------------------------------------------------------

[Longer description of how to use the addon in apps.]


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-scroll-up-bar`
* `yarn install`

### Linting

* `yarn lint:hbs`
* `yarn lint:js`
* `yarn lint:js --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
