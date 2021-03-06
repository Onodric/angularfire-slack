"use strict";

angular
  .module('angularfireSlackApp')
    .controller('ChannelsCtrl', ['$state', 'Auth', 'Users', 'profile', 'channels', function ($state, Auth, Users, profile, channels) {
      let channelsCtrl = this;

      channelsCtrl.profile = profile;
      channelsCtrl.channels = channels;

      channelsCtrl.getDisplayName = Users.getDisplayName;
      channelsCtrl.getGravatar = Users.getGravatar;

      channelsCtrl.logout = function () {
        Auth.$signOut()
        .then( function () {
          $state.go('home');
        });
      };

      channelsCtrl.newChannel = {
        name: ''
      };

      channelsCtrl.createChannel = function () {
        channelsCtrl.channels.$add(channelsCtrl.newChannel)
        .then(function (ref) {
          $state.go('channels.messages', {channelId: ref.key});
        });
      };
    }]);
