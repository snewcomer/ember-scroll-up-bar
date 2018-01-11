import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-scroll-up-bar', 'Integration | Component | ember scroll up bar', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ember-scroll-up-bar}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ember-scroll-up-bar}}
      template block text
    {{/ember-scroll-up-bar}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
