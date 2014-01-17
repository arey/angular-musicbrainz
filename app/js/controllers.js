'use strict';

/* Controllers */

angular.module('musicAlbumApp.controllers', ['ui.bootstrap']).
    controller('SearchCtrl', ['$scope', 'searchService', function ($scope, searchService) {
        $scope.maxSize = 5;
        $scope.currentPage = 1;
        $scope.pageSizes = [
            {count: 5, label: '5 ' + $scope.translation.SEARCH_PAGE_RESULT},
            {count: 10, label: '10 ' + $scope.translation.SEARCH_PAGE_RESULT},
            {count: 20, label: '20 ' + $scope.translation.SEARCH_PAGE_RESULT},
            {count: 50, label: '50 ' + $scope.translation.SEARCH_PAGE_RESULT}
        ];
        $scope.pageSize = $scope.pageSizes[1]; // 10

        var onSearchResponse = function (resp) {
            $scope.searchResp = resp;
            $scope.totalItems = resp.hits.total;
        };

        $scope.selectPage = function (page) {
            $scope.fullTextSearch($scope.searchText, page);
        };

        $scope.fullTextSearch = function (text, page) {
            $scope.currentPage = page;
            var from = ($scope.currentPage - 1) * $scope.pageSize.count;
            searchService.fullTextSearch(from, $scope.pageSize.count, text, onSearchResponse);
        };

        $scope.isAvailableResults = function () {
            return $scope.searchResp ? true : false;
        };

        $scope.selected = undefined;
        $scope.autocomplete = function (text) {
            return searchService.autocomplete(text).then(function (res) {
                var albums = [];
                angular.forEach(res.hits.hits, function (hit) {
                    albums.push(hit.fields['artist.name'] + ' - ' + hit.fields.name + ' (' + hit.fields.year + ')');
                });
                return albums;
            });
        };

        $scope.rangeGreaterThanZero = function (range) {
            return range.count > 0;
        };
    }])
    .controller('InfoCtrl', [function () {

    }]);