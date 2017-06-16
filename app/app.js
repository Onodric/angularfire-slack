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
        templateUrl: 'home/home.html'
      })
      .state('login', {
        url: '/login',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/login.html',
        resolve: {
          requireNoAuth: function ($state, Auth) {
            return Auth.$requireSignIn()
            .then(function (auth) {
              $state.go('home');
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
              $state.go('home');
            }, function (error) {
              return;
            });
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
