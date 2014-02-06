'use strict';

describe('my angular musicbrainz app', function () {

    beforeEach(function () {
        browser().navigateTo('app/index.html');
    });

    describe('search', function () {

        beforeEach(function () {
            browser().navigateTo('#/search');
        });

        it('should render search when user navigates to /search', function () {
            expect(element('#search-input-label').text()).
                toContain('music');
        });

        it('U2 album search', function () {
            input('searchText').enter('U2');
            element(':button').click();
            expect(element('#result-number').text()).
                toContain('22');

        });

    });

    describe('info', function () {

        beforeEach(function () {
            browser().navigateTo('#/info');
        });

        it('should render info when user navigates to /info', function () {
            expect(element('[ng-view] li:first').text()).
                toMatch(/Application version/);
        });

    });

    it('should automatically redirect to /search when location hash/fragment is empty', function () {
        expect(browser().location().url()).toBe('/search');
    });

});
