/*global angular */

(function () {
    'use strict';
    
    function ArtistListController($scope, bbData, $timeout) {
        $scope.gridOptions = {
            columns: [
                {
                    id: 1,
                    caption: ' ',
                    jsonmap: 'summary',
                    name: 'photo',
                    width_all: 145,
                    template_url: 'pages/overview/artists/artistphotocolumn.html'
                },
                {
                    id: 2,
                    caption: 'Artist',
                    jsonmap: 'summary',
                    name: 'summary',
                    width_all: 350,
                    template_url: 'pages/overview/artists/artistcolumn.html'
                },
                {
                    id: 3,
                    caption: 'Albums',
                    jsonmap: 'albums',
                    name: 'albums',
                    width_all: 400,
                    template_url: 'pages/overview/artists/albumscolumn.html'
                }
            ],
            hideFilters: true,
            hideColPicker: true,
            selectedColumnIds: [1, 2, 3]
        };

        $scope.$watch('gridOptions.sortOptions', function () {
            if ($scope.gridOptions.data) {
                $scope.gridOptions.data.sort(function (a, b) {
                    var descending = $scope.gridOptions.sortOptions.descending ? 1 : -1,
                        sortProperty = $scope.gridOptions.sortOptions.column;
                    if (a[sortProperty] > b[sortProperty]) {
                        return (descending);
                    } else if (a[sortProperty] < b[sortProperty]) {
                        return (-1 * descending);
                    } else {
                        return 0;
                    }
                });
            }
        }, true);

        bbData.load({
            data: 'data/artists'
        }).then(function (result) {
            $scope.data = result.data;
            $scope.gridOptions.data = $scope.data.artists;
            
            $scope.gridOptions.sortOptions = {
                column: 'name',
                descending: true
            };
        });
    }
    
    ArtistListController.$inject = ['$scope', 'bbData', '$timeout'];
    
    angular.module('musicapp').controller('ArtistListController', ArtistListController);
}());