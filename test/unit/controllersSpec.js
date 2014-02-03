'use strict';

/* jasmine specs for controllers go here */

describe('Angular MusicBrainz controllers', function () {

    var scope, ctrl;

    // Load the module that the controller you are testing is in
    beforeEach(module('musicAlbumApp.controllers'));

    describe('Controller: SearchCtrl', function () {
        var mockSearchService = {}, $q, respData;

        // inject is used for resolving references that you need to use in your tests, don't use this as a normal beforeEach, this beforeEach is used to resolve references
        beforeEach(inject(function ($controller, $rootScope, _$q_) {
            $q = _$q_;
            scope = $rootScope.$new();
            scope.translation = {
                'SEARCH_PAGE_RESULT': 'results per page'
            };

            //instead of instantiating the controller using $controller, we are saving a reference for it & calling it in the createController function and later will use in each unit test
            ctrl = $controller('SearchCtrl', {$scope: scope, searchService: mockSearchService});
        }));

        //The actual before each for setting up common variables, dependencies or functions
        beforeEach(function () {
            mockSearchService.fullTextSearch = jasmine.createSpy('fullTextSearch');

            //this will be the return type of the api.users, it will return a promise
            var respDefer = $q.defer();

            //resolve on a defer and passing it data, will always run the first argument of the then() if you want to test the second one, write reject() instead, but here by default we want to resolve it and pass it an empty object that we can change it's value in any unit test
            respData = { hits: { total: 5}};
            respDefer.resolve(respData);

            //defer.promise is actually the object that has the then() method
            mockSearchService.fullTextSearch.andReturn(respDefer.promise);
        });

        it('controller when load should set default properties values', function () {
            expect(scope.maxSize).toBeDefined();
            expect(scope.currentPage).toBeDefined();
            expect(scope.pageSizes).toBeDefined();
            expect(scope.pageSize).toBeDefined();
        });

        it('fullTextSearch should put the searchResp variable into the scope', function () {

            expect(scope.searchResp).toBeUndefined();
            expect(scope.isAvailableResults()).toBeFalsy();
            expect(scope.isAtLeastOneResult()).toBeFalsy();

            scope.fullTextSearch('U2', 1);

            //scope.$digest() will fire watchers on current scope, in short will run the callback function in the controller that will call anotherService.doSomething
            scope.$digest();

            expect(scope.searchResp).toBeDefined();
            expect(scope.totalItems).toBeDefined();
            expect(scope.isAvailableResults()).toBeTruthy();
            expect(scope.isAtLeastOneResult()).toBeTruthy();
        });

        it('rangeGreaterThanZero', function () {
            expect(scope.rangeGreaterThanZero({ count: 5})).toBeTruthy();
            expect(scope.rangeGreaterThanZero({ count: 0})).toBeFalsy();
        });

    });


    describe('InfoCtrl', function () {

        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            ctrl = $controller('InfoCtrl', {$scope: scope});
        }));

        it('should set demoUrl and demoSourceUrl variables', function () {
            expect(scope.demoUrl).toBeDefined();
            expect(scope.demoSourceUrl).toBeDefined();
        });
    });

});