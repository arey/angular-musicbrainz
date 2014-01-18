'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {

    // Load the musicAlbumApp.directives module, which contains the directive
  beforeEach(module('musicAlbumApp.directives'));

  describe('app-version', function() {
    it('should print current version', function() {
      module(function($provide) {
        $provide.value('version', 'TEST_VER');
      });
      inject(function($compile, $rootScope) {
        var element = $compile('<span app-version></span>')($rootScope);
        expect(element.text()).toEqual('TEST_VER');
      });
    });
  });

    describe('rank directive', function() {
        it('should print rating of 80%', function() {
            module('directive-templates');
            inject(function($templateCache, $compile, $rootScope) {
                var ratingTemplate = $templateCache.get('templates/rating.html');
                $templateCache.put('templates/rating.html',ratingTemplate);

                // Compile a piece of HTML containing the directive
                var element = $compile('<rank score="80"/>')($rootScope);
                // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
                $rootScope.$digest();
                // Check that the compiled element contains the templated content
                expect(element.html()).toContain('<span style="width:80%;" class="current-rating ng-binding">80</span>');
            });
        });
    });

    describe('cover directive', function() {
        it('should display War cover album', function() {
            module('directive-templates');
            inject(function($templateCache, $compile, $rootScope) {
                var ratingTemplate = $templateCache.get('templates/cover.html');
                $templateCache.put('templates/cover.html',ratingTemplate);

                $rootScope.album = {
                    id : "c6b36664-7e60-3b3e-a24d-d096c67a11e9"
                };
                var element = $compile('<cover album-id="album.id"/>')($rootScope);
                $rootScope.$digest();
                expect(element.html()).toContain('<img');
                expect(element.html()).toContain('width="125px"');
                expect(element.html()).toContain('src="http://coverartarchive.org/release-group/c6b36664-7e60-3b3e-a24d-d096c67a11e9/front-250.jpg"');
            });
        });
    });
});
