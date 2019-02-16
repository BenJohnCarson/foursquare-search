import Controller from '@ember/controller';
import { alias }  from '@ember/object/computed';
import { task } from 'ember-concurrency';
import fetch from 'fetch';
import ENV from 'foursquare-search/config/environment';

export default Controller.extend({
  venues: alias('model'),
  fetch: fetch,
  api: ENV.FOURSQUARE,

  fetchVenues: task(function* (near) {
    const response = yield this.fetch(this._buildSearchURL(near)),
      results = yield response.json();

    if (results.meta.code !== 200) {
      throw results.meta.errorDetail;
    } 
    this.set('venues', results.response.venues);
  }),

  _buildSearchURL(near) {
    return `${this.api.HOST}/${this.api.NAMESPACE}/venues/trending?near=${near}&v=${this.api.VERSION}&client_id=${this.api.CLIENT_ID}&client_secret=${this.api.CLIENT_SECRET}`;
  }
});
