/*global angular */

(function () {
    'use strict';
    
    function OverviewPageController($scope, bbData) {
        bbData.load({
            data: {
                albums: 'data/albums',
                artists: 'data/artists'
            }
        }).then(function (result) {
            $scope.artistCount = result.data.artists.artists.length;
            $scope.albumCount = result.data.albums.albums.length;
            $scope.tabsReady = true;
        });
    }
    
    OverviewPageController.$inject = ['$scope', 'bbData'];
    
    angular.module('musicapp').controller('OverviewPageController', OverviewPageController);
}());