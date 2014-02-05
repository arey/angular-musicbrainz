'use strict';

// Declare app level module which depends on filters, and services
angular.module('musicAlbumApp', [
        'ngSanitize',
        'elasticsearch',
        'musicAlbumApp.routes',
        'musicAlbumApp.filters',
        'musicAlbumApp.services',
        'musicAlbumApp.directives',
        'musicAlbumApp.controllers'
    ]).
    run(['$http', '$rootScope', 'userLanguage', 'translation', function ($http, $rootScope, userLanguage, translation) {
        var langRange = 'en-us';
        var language = 'en';
        var translated = false;

        var loadAngularI18n = function (langRange) {
            var angularI18nScript = 'lib/angular-i18n/angular-locale_' + langRange + '.js';
            $.getScript(angularI18nScript)
                .fail(function () {
                    console.warn('Could not load ' + angularI18nScript + ' for language: ' + langRange);
                    $.getScript('lib/angular-i18n/angular-locale_no.js');
                });
        };

        var loadAppI18n = function (language) {
            var supportedLanguages = ['en', 'fr'];
            if (supportedLanguages.indexOf(language) !== -1) {
                translation.getTranslation($rootScope, language);
            } else {
                console.warn('Unsupported language: ' + language + '. Using english default language.');
                translation.getTranslation($rootScope, 'en');
            }
        };

        var loadI18nResources = function () {
            console.log('Current user langRange:' + langRange + ' and language:' + language);
            loadAngularI18n(langRange);
            loadAppI18n(language);
        };

        if (sessionStorage) {
            if (sessionStorage.getItem('userLanguageRange')) {
                langRange = sessionStorage.getItem('userLanguageRange');
                language = userLanguage.getLanguage(langRange);
                loadI18nResources();
                translated = true;
            }
        }

        if (!translated) {
            translation.getTranslation($rootScope, language);
            $http.jsonp('http://ajaxhttpheaders.appspot.com?callback=JSON_CALLBACK').
                success(function (data) {
                    var acceptLang = data['Accept-Language'];
                    langRange = userLanguage.getFirstLanguageRange(acceptLang);
                    language = userLanguage.getLanguage(langRange);
                    if (sessionStorage) {
                        sessionStorage.setItem('userLanguageRange', langRange);
                    }
                }).
                finally(function () {
                    loadI18nResources();
                });
        }
    }]);
