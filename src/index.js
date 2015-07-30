/*globals angular */

(function () {
    'use strict';

    function spaceToUnderscore(value) {
        if (!value) {
            return value;
        }

        return value.replace(/ /gi, '_').toLowerCase();
    }

    angular.module('musicapp', ['sky', 'ui.bootstrap', 'ui.router', 'ngAnimate', 'musicapp.templates', 'angular-carousel'])
        .config(['$locationProvider', '$stateProvider', function ($locationProvider, $stateProvider) {
            $locationProvider.html5Mode(false);

            $stateProvider
                .state('artist', {
                    abstract: true,
                    controller: 'ArtistPageController',
                    templateUrl: 'pages/artists/artistpage.html',
                    url: '/artists/:artistName'
                })
                .state('artist.views', {
                    url: '',
                    views: {
                        'albums': {
                            controller: 'AlbumsTileController',
                            templateUrl: 'pages/artists/albums/albumstile.html'
                        },
                        'members': {
                            controller: 'MembersTileController',
                            templateUrl: 'pages/artists/members/memberstile.html'
                        }
                    }
                })
                .state('home', {
                    abstract: true,
                    controller: 'OverviewPageController',
                    templateUrl: 'pages/overview/overview.html',
                    url: ''
                })
                .state('home.albums', {
                    url: '/albums',
                    views: {
                        'albumlist': {
                            controller: 'AlbumListController',
                            templateUrl: 'pages/overview/albums/albumlist.html'
                        }
                    }
                })
                .state('home.artists', {
                    url: '/artists',
                    views: {
                        'artistlist': {
                            controller: 'ArtistListController',
                            templateUrl: 'pages/overview/artists/artistlist.html'
                        }
                    }
                });
        }])
        .run(['bbDataConfig', 'bbOmnibarConfig', 'bbHelpwidgetConfig', function (bbDataConfig, bbOmnibarConfig, bbHelpwidgetConfig) {
            bbDataConfig.dataUrlFilter = function (url) {
                return url + '.json';
            };

            bbOmnibarConfig.enableSearch = true;
            bbOmnibarConfig.enableHelp = true;

            bbHelpwidgetConfig.productId = 'REx';
            bbHelpwidgetConfig.url = '//p1helpui.renxt.blackbaud.net/helpwidget.js';
        }])
        .filter('spaceToUnderscore', function () {
            return spaceToUnderscore;
        })
        .factory('spaceToUnderscore', function () {
            return spaceToUnderscore;
        })
        .controller('MainController', angular.noop);
}());
