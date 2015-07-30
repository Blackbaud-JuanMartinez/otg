/*global angular */

(function () {
    'use strict';
    
    function AlbumsTileController($scope, $stateParams, $timeout, bbData, bbPaging) {
        bbData.load({
            data: 'data/artists/' + encodeURIComponent($stateParams.artistName.replace(/ /gi, '_')) + '/albums'
        }).then(function (result) {
            $scope.albumsPaged = bbPaging.init(result.data.albums);
        });
    }
    
    AlbumsTileController.$inject = ['$scope', '$stateParams', '$timeout', 'bbData', 'bbPaging'];
    
    angular.module('musicapp').controller('AlbumsTileController', AlbumsTileController);
}());