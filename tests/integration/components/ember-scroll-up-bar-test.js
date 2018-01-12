import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ember scroll up bar', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders with no class', async function(assert) {
    await render(hbs`
      {{#ember-scroll-up-bar componentHeight=65}}
        <ul>
          <li>WAT</li>
        </ul>
      {{/ember-scroll-up-bar}}
      <div style="height:500px" class="container">
        Scroll Down
      </div>
    `);

    assert.notOk(document.getElementById('ember-scroll-up-bar-wormhole'), 'no content has yet to render');
  });

  test('it renders textContent in div', async function(assert) {
    this._showMe = true;
    await render(hbs`
      <div id="ember-scroll-up-bar-wormhole"></div>
      {{#ember-scroll-up-bar componentHeight=65 _showMe=_showMe}}
        <ul>
          <li>WAT</li>
        </ul>
      {{/ember-scroll-up-bar}}
      <div style="height:500px" class="container">
        Scroll Down
      </div>
    `);

    assert.equal(document.getElementById('ember-scroll-up-bar-wormhole').textContent.trim(), 'WAT', 'content has yet to render');
  });

});
