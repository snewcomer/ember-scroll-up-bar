import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ember scroll up bar', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders with no class', async function(assert) {
    await render(hbs`
      {{#ember-scroll-up-bar}}
        <ul>
          <li>WAT</li>
        </ul>
      {{/ember-scroll-up-bar}}
      <div style="height:500px" class="container">
        Scroll Down
      </div>
    `);

    assert.equal(this.element.className, 'ember-view');
  });
});
