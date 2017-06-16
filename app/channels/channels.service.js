"use strict";

angular
  .module('angularfireSlackApp')
    .factory('Channels', ['$firebaseArray', function ($firebaseArray) {
      let ref = firebase.database().ref('channels');
      let channels = $firebaseArray(ref);

      return channels;
    }]);
