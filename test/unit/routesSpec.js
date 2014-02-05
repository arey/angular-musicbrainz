describe("route", function () {
    beforeEach(module('musicAlbumApp.routes'));

    it('should map routes to controllers', function () {
        module('musicAlbumApp.routes');

        inject(function ($route) {

            expect($route.routes['/search'].controller).toBe('SearchCtrl');
            expect($route.routes['/search'].templateUrl).
                toEqual('partials/search.html');

            expect($route.routes['/info'].controller).toEqual('InfoCtrl');
            expect($route.routes['/info'].templateUrl).
                toEqual('partials/info.html');

            // otherwise redirect to
            expect($route.routes[null].redirectTo).toEqual('/search')
        });
    });
});