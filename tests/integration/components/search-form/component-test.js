import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | search-form', function(hooks) {
  setupRenderingTest(hooks);

  test('Should render search input and button', async function(assert) {
    await render(hbs`{{search-form}}`);

    assert.dom('[data-test-search-input]').exists('Search input rendered');
    assert.dom('[data-test-search-button]').exists('Search button rendered');
  });
});
