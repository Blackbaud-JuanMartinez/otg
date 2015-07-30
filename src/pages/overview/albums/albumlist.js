/*global angular */

(function () {
    'use strict';

    function AlbumListController($scope, bbData) {
        function updateFilterSummary() {
            var decades = [];

            if (!$scope.locals.filter1980s) {
                decades.push({
                    name: '1980s',
                    minYear: 1980,
                    maxYear: 1989
                });
            }

            if (!$scope.locals.filter1990s) {
                decades.push({
                    name: '1990s',
                    minYear: 1990,
                    maxYear: 1999
                });
            }

            if (!$scope.locals.filter2000s) {
                decades.push({
                    name: '2000s',
                    minYear: 2000,
                    maxYear: 2009
                });
            }

            if (!$scope.locals.filter2010s) {
                decades.push({
                    name: '2010s',
                    minYear: 2010,
                    maxYear: 2019
                });
            }

            $scope.appliedFilters.decades = decades;
        }

        function albumMatchesDecadeFilter(album) {
            var decade,
                decades = $scope.gridOptions.filters.decades,
                i,
                n;

            if (decades) {
                for (i = 0, n = decades.length; i < n; i++) {
                    decade = decades[i];

                    if (album.year >= decade.minYear && album.year <= decade.maxYear) {
                        return false;
                    }
                }

                return true;
            }

            return true;
        }

        function getFilteredAlbums() {
            var album,
                albums,
                data = $scope.data,
                filteredAlbums,
                i,
                n;

            if (data) {
                albums = data.albums;

                if ($scope.gridOptions.filters) {
                    filteredAlbums = [];

                    for (i = 0, n = albums.length; i < n; i++) {
                        album = albums[i];

                        if (albumMatchesDecadeFilter(album)) {
                            filteredAlbums.push(album);
                        }
                    }
                } else {
                    filteredAlbums = albums;
                }
            }

            return filteredAlbums;
        }

        $scope.locals = {};
        $scope.locals.filter1980s = true;
        $scope.locals.filter1990s = true;
        $scope.locals.filter2000s = true;
        $scope.locals.filter2010s = true;

        $scope.appliedFilters = {};

        $scope.gridOptions = {
            columns: [
                {
                    id: 1,
                    caption: ' ',
                    jsonmap: 'summary',
                    name: 'photo',
                    width_all: 120,
                    template_url: 'views/pages/overview/albums/albumphotocolumn.html'
                },
                {
                    id: 2,
                    caption: 'Name',
                    jsonmap: 'summary.name',
                    name: 'name',
                    width_all: 250
                },
                {
                    id: 3,
                    caption: 'Artist',
                    jsonmap: 'summary',
                    name: 'artist',
                    template_url: 'views/pages/overview/albums/artistcolumn.html'
                },
                {
                    id: 4,
                    caption: 'Release Year',
                    jsonmap: 'year',
                    name: 'year'
                }
            ],
            selectedColumnIds: [1, 2, 3, 4]
        };

        $scope.filterOptions = {
            applyFilters: function (args) {
                updateFilterSummary();

                args.filters = angular.copy($scope.appliedFilters);
            },
            clearFilters: function (args) {
                $scope.locals.filter1980s = true;
                $scope.locals.filter1990s = true;
                $scope.locals.filter2000s = true;
                $scope.locals.filter2010s = true;

                updateFilterSummary();

                args.filters = angular.copy($scope.appliedFilters);
            }
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

        $scope.$watch('gridOptions.filters', function () {
            $scope.gridOptions.data = getFilteredAlbums();
        });

        $scope.goBack = function () {
            $scope.carouselIndex -= 1;
        };

        $scope.goFoward = function () {
            $scope.carouselIndex += 1;
        };

        $scope.goToCard = function (index) {
            $scope.carouselIndex = index;
        };

        bbData.load({
            data: 'data/albums'
        }).then(function (result) {
            $scope.data = result.data;
            $scope.gridOptions.data = getFilteredAlbums();

            $scope.carouselIndex = 0;

            $scope.gridOptions.sortOptions = {
                column: 'artist',
                descending: true
            };
        });
    }

    AlbumListController.$inject = ['$scope', 'bbData'];

    angular.module('musicapp').controller('AlbumListController', AlbumListController);
}());
