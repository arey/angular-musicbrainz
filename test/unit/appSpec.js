'use strict';

describe("Angular MusicBrainz App Module", function () {

    var module;
    beforeEach(function () {
        module = angular.module("musicAlbumApp");
    });

    it("should be registered", function () {
        expect(module).not.toEqual(null);
    });

    describe("dependencies:", function () {

        var deps;
        var hasModule = function (m) {
            return deps.indexOf(m) >= 0;
        };
        beforeEach(function () {
            deps = module.value('appName').requires;
        });

        // test the module's dependencies
        it("should have musicAlbumApp.controllers as a dependency", function () {
            expect(hasModule('musicAlbumApp.controllers')).toEqual(true);
        });

        it("should have musicAlbumApp.directives as a dependency", function () {
            expect(hasModule('musicAlbumApp.directives')).toEqual(true);
        });

        it("should have musicAlbumApp.filters as a dependency", function () {
            expect(hasModule('musicAlbumApp.filters')).toEqual(true);
        });

        it("should have musicAlbumApp.routes as a dependency", function () {
            expect(hasModule('musicAlbumApp.routes')).toEqual(true);
        });

        it("should have musicAlbumApp.services as a dependency", function () {
            expect(hasModule('musicAlbumApp.services')).toEqual(true);
        });
    });
});