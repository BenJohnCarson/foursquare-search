import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import sinon from 'sinon';

module('Integration | Component | search-form', function (hooks) {
  setupRenderingTest(hooks);

  test('Should render search input and button', async function (assert) {
    await render(hbs`{{search-form}}`);

    assert.dom('[data-test-search-input]').exists('Search input rendered');
    assert.dom('[data-test-search-button]').exists('Search button rendered');
    assert.dom('[data-test-search-button]').isDisabled('Search input disabled without input');

    await fillIn('[data-test-search-input]', 'London');

    assert.dom('[data-test-search-button]').isNotDisabled('Search input enabled with input');
  });

  test('Should call passed in fetchVenues with search term on click of search button', async function (assert) {
    const fetchVenues = sinon.fake(),
      searchTerm = 'London';

    this.set('fetchVenues', fetchVenues);
    await render(hbs`{{search-form fetchVenues=fetchVenues}}`);
    await fillIn('[data-test-search-input]', searchTerm);
    await click('[data-test-search-button]');

    assert.ok(fetchVenues.calledWith(searchTerm), 'fetchVenues called with entered search term');
  });

  test('Should display error message if fetchVenues throws an error', async function (assert) {
    const error = 'test error',
      fetchVenues = () => { throw error; };

    this.set('fetchVenues', fetchVenues);
    await render(hbs`{{search-form fetchVenues=fetchVenues}}`);
    await fillIn('[data-test-search-input]', 'London');
    await click('[data-test-search-button]');

    assert.dom('[data-test-error-message]').hasText(error, 'Error text display when fetchVenues throws an error');
  });
});
