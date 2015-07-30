/*global angular */

(function () {
    'use strict';
    
    function MembersTileController($scope, $stateParams, $timeout, bbData, bbPaging) {
        bbData.load({
            data: 'data/artists/' + encodeURIComponent($stateParams.artistName.replace(/ /gi, '_')) + '/members'
        }).then(function (result) {
            $scope.membersPaged = bbPaging.init(result.data.members);
        });
    }
    
    MembersTileController.$inject = ['$scope', '$stateParams', '$timeout', 'bbData', 'bbPaging'];
    
    angular.module('musicapp').controller('MembersTileController', MembersTileController);
}());