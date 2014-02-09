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

        $scope.selectPage = function (page) {
            $scope.fullTextSearch($scope.searchText, page);
        };

        $scope.fullTextSearch = function (text, page) {
            $scope.currentPage = page;
            var from = ($scope.currentPage - 1) * $scope.pageSize.count;
            searchService.fullTextSearch(from, $scope.pageSize.count, text).then(
                function (resp) {
                    $scope.searchResp = resp;
                    $scope.totalItems = resp.hits.total;
                }
            );
        };

        $scope.isAvailableResults = function () {
            return $scope.searchResp ? true : false;
        };

        $scope.isAtLeastOneResult = function () {
            if (!$scope.isAvailableResults()) {
                return false;
            }
            return $scope.searchResp.hits.total > 0;
        };

        $scope.autocomplete = function (text) {
            return searchService.autocomplete(text).then(function (res) {
                var albums = [];
                angular.forEach(res.hits.hits, function (hit) {
                    albums.push(hit.fields['artist.name'] + ' - ' + hit.fields.name + ' (' + hit.fields.year + ')');
                });
                $scope.autocompleteResp = albums;
                return albums;
            });
        };

        $scope.rangeGreaterThanZero = function (range) {
            return range.count > 0;
        };
    }])
    .controller('InfoCtrl', ['$scope', function ($scope) {
        $scope.demoUrl = 'http://angular-musicbrainz.javaetmoi.com/';
        $scope.demoSourceUrl = 'https://github.com/arey/angular-musicbrainz';
        $scope.blogArticleUrl = 'http://javaetmoi.com/2014/02/developper-industrialiser-web-app-recherche-angularjs';
    }
]);