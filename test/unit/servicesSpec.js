'use strict';

/* jasmine specs for services go here */

describe('service', function () {
    beforeEach(module('musicAlbumApp.services'));


    describe('version service', function () {
        it('should return current version', inject(function (version) {
            expect(version).toEqual('1.0');
        }));
    });

    describe('userLanguage service getFirstLanguageRange function', function () {
        it('should return undefined language range', inject(function (userLanguage) {
            var langRange = userLanguage.getFirstLanguageRange();
            expect(langRange).toEqual(undefined);
        }));
        it('should return en-us as first language range', inject(function (userLanguage) {
            var langRange = userLanguage.getFirstLanguageRange('en-us,en,fr');
            expect(langRange).toEqual('en-us');
        }));
        it('should return en-us as first language range', inject(function (userLanguage) {
            var langRange = userLanguage.getFirstLanguageRange('en-us;q=0.8,fr');
            expect(langRange).toEqual('en-us');
        }));
        it('should return en as language', inject(function (userLanguage) {
            var lang = userLanguage.getLanguage('en-us');
            expect(lang).toEqual('en');
        }));
        it('should return fr as language', inject(function (userLanguage) {
            var lang = userLanguage.getLanguage('fr-be');
            expect(lang).toEqual('fr');
        }));
    });

    describe('userLanguage service getLanguage function', function () {
        it('should return en as language', inject(function (userLanguage) {
            var lang = userLanguage.getLanguage('en-us');
            expect(lang).toEqual('en');
        }));
        it('should return fr as language', inject(function (userLanguage) {
            var lang = userLanguage.getLanguage('fr-be');
            expect(lang).toEqual('fr');
        }));
    });
});
