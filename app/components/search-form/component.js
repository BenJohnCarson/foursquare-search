import Component from '@ember/component';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';
import Constants from 'foursquare-search/common/constants';

export default Component.extend({
  shouldDisableSearchButton: computed('near', 'searchVenues.isRunning', function () {
    return !this.near || this.searchVenues.isRunning;
  }),
  near: '',
  errorMessage: '',
  searchTypes: Constants.SEARCH_TYPES,
  selectedType: Constants.SEARCH_TYPES[0],

  searchVenues: task(function* () {
    this.set('errorMessage', '');
    try {
      yield this.fetchVenues(this.near, this.selectedType.apiValue);
    } catch (error) {
      this.set('errorMessage', error);
    }
  })
});
