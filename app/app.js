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
        templateUrl: 'auth/login.html'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'auth/register.html'
      });

    $urlRouterProvider.otherwise('/');
  })
  .config(function(){
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
