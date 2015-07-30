/*global angular */

(function () {
    'use strict';
    
    function ArtistPageController($scope, $stateParams, bbData, bbWindow, spaceToUnderscore) {
        $scope.tiles = [
            {
                id: 'ArtistAlbumsTile',
                view_name: 'albums',
                collapsed: false,
                collapsed_small: false
            },
            {
                id: 'ArtistMembersTile',
                view_name: 'members',
                collapsed: false,
                collapsed_small: false
            }
        ];
        
        $scope.layout = {
            one_column_layout: [
                'ArtistAlbumsTile',
                'ArtistMembersTile'
            ],
            two_column_layout: [
                [
                    'ArtistAlbumsTile'
                ],
                [
                    'ArtistMembersTile'
                ]
            ]
        };
        
        bbData.load({
            data: 'data/artists/' + spaceToUnderscore($stateParams.artistName)
        }).then(function (result) {
            $scope.artist = result.data;
            bbWindow.setWindowTitle($scope.artist.name);
        });
    }
    
    ArtistPageController.$inject = ['$scope', '$stateParams', 'bbData', 'bbWindow', 'spaceToUnderscore'];
    
    angular.module('musicapp').controller('ArtistPageController', ArtistPageController);
}());