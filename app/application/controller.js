import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { task } from 'ember-concurrency';
import fetch from 'fetch';
import ENV from 'foursquare-search/config/environment';

export default Controller.extend({
  venues: alias('model'),
  fetch: fetch,
  api: ENV.FOURSQUARE,
  noVenuesFoundMessage: 'Sorry, we couldn\'t find any venues near',

  fetchVenues: task(function* (near, type) {
    this.set('venues', []);
    const response = yield this.fetch(this._buildSearchURL(near, type)),
      results = yield response.json();

    if (results.meta.code !== 200) {
      throw results.meta.errorDetail;
    }
    this.set('venues', this._extractVenues(results, type));
    if (!this.venues.length) {
      throw `${this.noVenuesFoundMessage} ${near}`;
    }
  }),

  _buildSearchURL(near, type) {
    return `${this.api.HOST}/${this.api.NAMESPACE}/venues/${type}?near=${near}&v=${this.api.VERSION}&client_id=${this.api.CLIENT_ID}&client_secret=${this.api.CLIENT_SECRET}`;
  },
  _extractVenues(results, type) {
    if (type === 'trending') {
      return results.response.venues;
    }
    if (type === 'explore') {
      const items = results.response.groups[0].items;
      let venues = [];

      items.forEach(item => {
        venues.push(item.venue);
      });
      return venues;
    }
  }
});
