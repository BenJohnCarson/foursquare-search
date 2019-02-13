import { module, test } from 'qunit';
import { visit, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | search form', function(hooks) {
  setupApplicationTest(hooks);

  test('Should be able to enter a location into a search form', async function(assert) {
    const searchTerm ='London';

    await visit('/');
    await fillIn('[data-test-search-input]', searchTerm);

    assert.dom('[data-test-search-input]').hasValue(searchTerm, 'Search input has entered location');
    assert.dom('[data-test-search-button]').exists('Button to submit search is visible');
  });
});
