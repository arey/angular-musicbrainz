'use strict';

/* Directives */


angular.module('musicAlbumApp.directives', []).
    directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }])
    .directive('rank',function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                score: '=',
                ceil: '='
            },
            templateUrl: 'partials/directives/rating.html'
        };
    }).directive('cover', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                albumId: '='
            },
            templateUrl: 'partials/directives/cover.html'
        };
    });

