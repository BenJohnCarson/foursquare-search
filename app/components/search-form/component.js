import Component from '@ember/component';
import { computed }  from '@ember/object';
import { task } from 'ember-concurrency';

export default Component.extend({
  shouldDisableSearchButton: computed('near', 'searchVenues.isRunning', function() {
    return !this.near || this.searchVenues.isRunning;
  }),
  near: '',
  errorMessage: '',

  searchVenues: task(function* (){
    this.set('errorMessage', '');
    try {
      yield this.fetchVenues(this.near);
    } catch(error) {
      this.set('errorMessage', error);
    }
  })
});
