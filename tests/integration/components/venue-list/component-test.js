import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | venue-list', function (hooks) {
  setupRenderingTest(hooks);

  test('Should display a list of venue names', async function (assert) {
    const venue1 = { name: 'venue 1' },
      venue2 = { name: 'venue 2' },
      venues = [venue1, venue2];

    this.set('venues', venues);
    await render(hbs`{{venue-list venues=venues}}`);

    assert.dom('li').exists({ count: venues.length }, 'Correct number of venues displayed');
    venues.forEach((venue, i) => {
      assert.dom(`[data-test-venue-item="${i}"]`).hasText(venue.name, 'Venue has correct name');
    });
  });
});
