import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';

module('Unit | Controller | application', function(hooks) {
  setupTest(hooks);

  const api = {
    HOST: 'test-host',
    NAMESPACE: 'test-namespace',
    VERSION: 'test-version',
    CLIENT_ID: '12345',
    CLIENT_SECRET: '1a2b3c'
  };

  test('Should return an array of venues on performing fetchVenues', function(assert) {
    const controller = this.owner.lookup('controller:application'),
      results = {
        meta: {code: 200},
        response: {
          venues: [{name: 'Selfridges & Co'}]
        }
      },
      response = {json: sinon.fake.returns(results)},
      fetch = sinon.fake.returns(response),
      searchTerm = 'London',
      expectedURL = `${api.HOST}/${api.NAMESPACE}/venues/trending?near=${searchTerm}&v=${api.VERSION}&client_id=${api.CLIENT_ID}&client_secret=${api.CLIENT_SECRET}`;
    
    controller.setProperties({
      fetch: fetch,
      api: api
    });
    controller.fetchVenues.perform(searchTerm);

    assert.ok(fetch.calledWith(expectedURL), 'URL passed to fetchVenues is correct');
    assert.deepEqual(controller.venues, results.response.venues, 'Venues from fetch call set on model');
  });

  test('Should throw an error message when status of response isn\'t 200', function(assert) {
    const controller = this.owner.lookup('controller:application'),
      results = {
        meta: {code: 400, errorDetail: 'Test Error'},
        response: {}
      },
      response = {json: sinon.fake.returns(results)},
      fetch = sinon.fake.returns(response);

    controller.setProperties({
      fetch: fetch,
      api: api
    });

    try {
      controller.fetchVenues.perform('London');
    } catch(error) {
      assert.equal(error, results.meta.errorDetail, 'Correct error thrown on non 200 status');
    }
  });
});
