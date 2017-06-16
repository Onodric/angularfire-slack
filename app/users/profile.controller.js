"use strict";

angular
  .module('angularfireSlackApp')
    .controller('ProfileCtrl', ['$state', 'md5', 'auth', 'profile', function ($state, md5, auth, profile) {
      let profileCtrl = this;

      profileCtrl.profile = profile;

      profileCtrl.updateProfile = function () {
        profileCtrl.profile.emailHash = md5.createHash(auth.email);
        profileCtrl.profile.$save();
      };

    }]);
