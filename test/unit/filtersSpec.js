'use strict';

/* jasmine specs for filters go here */

describe('filter', function() {
  beforeEach(module('musicAlbumApp.filters'));


  describe('interpolate', function() {
    beforeEach(module(function($provide) {
      $provide.value('version', 'TEST_VER');
    }));


    it('should replace VERSION', inject(function(interpolateFilter) {
      expect(interpolateFilter('before %VERSION% after')).toEqual('before TEST_VER after');
    }));
  });

    describe('joinBy', function() {
        it('join 2 tags with default delimiter', inject(function(joinByFilter) {
            expect(joinByFilter(["rock", "blues"])).toEqual('rock, blues');
        }));
        it('join 2 tags with custom delimiter', inject(function(joinByFilter) {
            expect(joinByFilter(["rock", "blues"], " - ")).toEqual('rock - blues');
        }));
        it('join a single tag', inject(function(joinByFilter) {
            expect(joinByFilter(["rock"])).toEqual('rock');
        }));
        it('join empty tag arrays', inject(function(joinByFilter) {
            expect(joinByFilter([])).toEqual('');
        }));
    });

    describe('reverse', function() {
        it('array of strings', inject(function(reverseFilter) {
            expect(reverseFilter(["rock", "blues"])).toEqual(["blues", "rock"]);
        }))
        it('undefined items', inject(function(reverseFilter) {
            expect(reverseFilter(undefined)).toEqual(undefined);
        }));
    });

    describe('artistTypeLabel', function() {
        beforeEach(inject(function ($rootScope) {
            $rootScope.translation = {
                "ARTIST_TYPE_1" : "Person"
            };
        }));
        it('artist type 1', inject(function(artistTypeLabelFilter) {
            expect(artistTypeLabelFilter(1)).toEqual('Person');
        }))
    });

    describe('yearFormat', function() {
        beforeEach(inject(function ($rootScope) {
            $rootScope.translation = {
                "FILTER_RELEASE_DATE_BEFORE" : "Before",
                "FILTER_RELEASE_DATE_SINCE" : "Since",
                "FILTER_RELEASE_DATE_YEAR" : "Years"
            };
        }));
        it('to 1970', inject(function(yearFormatFilter) {
            expect(yearFormatFilter({ to : 1970})).toEqual('Before 1970');
        }))
        it('from 1970 to 1980', inject(function(yearFormatFilter) {
            expect(yearFormatFilter({ from : 1970, to : 1900})).toEqual('Years 70');
        }))
        it('from 2000 to 2010', inject(function(yearFormatFilter) {
            expect(yearFormatFilter({ from : 2000, to : 2010})).toEqual('Years 2000');
        }))
        it('from 2010', inject(function(yearFormatFilter) {
            expect(yearFormatFilter({ from : 2010})).toEqual('Since 2010');
        }))
    });

});
