'use strict';

/**
 * @ngdoc overview
 * @name angularfireSlackApp
 * @description
 * # angularfireSlackApp
 *
 * Main module of the application.
 */
angular
  .module('angularfireSlackApp', [
    'firebase',
    'angular-md5',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        resolve: {
          requireNoAuth: function ($state, Auth) {
            return Auth.$requireSignIn()
            .then(function (auth) {
              $state.go('channels');
            }, function (error) {
              return;
            });
          }
        }
      })
      .state('login', {
        url: '/login',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/login.html',
        resolve: {
          requireNoAuth: function ($state, Auth) {
            return Auth.$requireSignIn()
            .then(function (auth) {
              $state.go('channels');
            }, function (error) {
              return;
            });
          }
        }
      })
      .state('register', {
        url: '/register',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/register.html',
        resolve: {
          requireNoAuth: function ($state, Auth) {
            return Auth.$requireSignIn()
            .then(function (auth) {
              $state.go('channels');
            }, function (error) {
              return;
            });
          }
        }
      })
      .state('profile', {
        url: '/profile',
        controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'users/profile.html',
        resolve: {
          auth: function ($state, Users, Auth) {
            return Auth.$requireSignIn().catch(function () {
              $state.go('home');
            });
          },
          profile: function (Users, Auth) {
            return Auth.$requireSignIn()
            .then(function (auth) {
              return Users.getProfile(auth.uid).$loaded();
            });
          }
        }
      })
      .state('channels', {
        url: '/channels',
        controller: 'ChannelsCtrl as channelsCtrl',
        templateUrl: 'channels/index.html',
        resolve: {
          channels: function (Channels) {
            return Channels.$loaded();
          },
          profile: function ($state, Auth, Users) {
            return Auth.$requireSignIn()
            .then(function (auth) {
              return Users.getProfile(auth.uid).$loaded()
              .then(function (profile) {
                if(profile.displayName) {
                  return profile;
                } else {
                  $state.go('profile');
                }
              });
            }, function (error) {
              $state.go('home');
            });
          }
        }
      })
      .state('channels.create', {
        url: '/create',
        templateUrl: 'channels/create.html',
        controller: 'ChannelsCtrl as channelsCtrl'
      })
      .state('channels.messages', {
        url: '/{channelId}/messages',
        templateUrl: 'channels/messages.html',
        controller: 'MessagesCtrl as messagesCtrl',
        resolve: {
          messages: function ($stateParams, Messages) {
            return Messages.forChannel($stateParams.channelId).$loaded();
          },
          channelName: function ($stateParams, channels) {
            return '#'+channels.$getRecord($stateParams.channelId).name;
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  })
  .config(function(FBCreds){
    var config = {
      apiKey: FBCreds.apiKey,
      authDomain: FBCreds.authDomain,
      databaseURL: FBCreds.databaseURL,
      storageBucket: FBCreds.storageBucket,
      projectId: FBCreds.projectId,
      messagingSenderId: FBCreds.messagingSenderId
    };
    firebase.initializeApp(config);
  });
