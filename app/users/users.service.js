"use strict";

angular
  .module('angularfireSlackApp')
    .factory('Users', ['$firebaseArray', '$firebaseObject', function($firebaseArray, $FirebaseObject) {
      let usersRef = firebase.database().ref('users');
      let users = $firebaseArray(usersRef);

      let Users = {
        getGravatar: function (uid) {
          return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
        },
        getProfile: function (uid) {
          return $FirebaseObject(usersRef.child(uid));
        },
        getDisplayame: function (uid) {
          return users.$getRecord(uid).displayName;
        },
        all: users
      };

      return Users;
  }]);
