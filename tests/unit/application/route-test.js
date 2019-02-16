import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | application', function(hooks) {
  setupTest(hooks);

  test('Should return an empty array from model hook', function(assert) {
    const route = this.owner.lookup('route:application'),
      model = route.model();

    assert.ok(Array.isArray(model), 'Model is an array');
    assert.notOk(model.length, 'Model is empty');
  });
});
