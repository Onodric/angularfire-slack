"use strict";

angular
  .module('angularfireSlackApp')
  .factory('Auth', ['$firebaseAuth', function ($firebaseAuth) {
    var auth = $firebaseAuth();

    return auth;
  }]);
