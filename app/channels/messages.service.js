"use strict";

angular
  .module('angularfireSlackApp')
    .factory('Messages', ['$firebaseArray', function ($firebaseArray) {
      let channelMessageRef = firebase.database().ref('channelMessages');

      return {
        forChannel: function (channelId) {
          return $firebaseArray(channelMessageRef.child(channelId));
        }
      };
    }]);
