'use strict';

/* Filters */

angular.module('musicAlbumApp.filters', []).
    filter('interpolate', ['version', function (version) {
        return function (text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        };
    }]).
    filter('joinBy',function () {
        return function (input, delimiter) {
            return (input || []).join(delimiter || ', ');
        };
    }).
    filter('reverse',function () {
        return function (items) {
            if (!items) {
                return items;
            }
            return items.slice().reverse();
        };
    }).
    filter('artistTypeLabel', ['$rootScope', function ($rootScope) {
        return function (input) {
            return $rootScope.translation['ARTIST_TYPE_' + input];
        };
    }]).
    filter('yearFormat', ['$rootScope', function ($rootScope) {
        return function (range) {
            if (range.from === undefined) {
                return $rootScope.translation.FILTER_RELEASE_DATE_BEFORE + ' ' + range.to;
            }
            if (range.to === undefined) {
                return $rootScope.translation.FILTER_RELEASE_DATE_SINCE + ' ' + range.from;
            }
            if (range.from < 2000) {
                return $rootScope.translation.FILTER_RELEASE_DATE_YEAR + ' ' + (range.from - 1900);
            }
            return $rootScope.translation.FILTER_RELEASE_DATE_YEAR + ' ' + range.from;
        };
    }]);
