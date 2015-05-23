'use strict';

/* Services */

angular.module('musicAlbumApp.services', ['ngResource'])
    .value('version', '1.0')
    // elasticsearch.angular.js creates an elasticsearch
    // module, which provides an esFactory
    .service('es', ['esFactory', function (esFactory) {
        return esFactory({
            hosts: [
                // you may use localhost:9200 with a local Elasticsearch cluster
                'es.javaetmoi.com:80'
            ],
            log: 'trace',
            sniffOnStart: false
        });
    }])
    .factory('searchService', ['es', function (es) {
        return {
            'fullTextSearch': function (from, size, text) {
                return es.search({
                    index: 'musicalbum',
                    type: 'album',
                    body: {
                        'from': from,
                        'size': size,
                        'query': {
                            'bool': {
                                'must': [
                                    {
                                        'fuzzy_like_this': {
                                            'fields': [
                                                'name',
                                                'artist.name',
                                                'year.string'
                                            ],
                                            'like_text': text,
                                            'min_similarity': 0.7,
                                            'prefix_length': 1
                                        }
                                    }
                                ]
                            }
                        },
                        'facets': {
                            'artist_type': {
                                'terms': {
                                    'field': 'artist.type_id'
                                }
                            },
                            'album_rating': {
                                'histogram': {
                                    'key_field': 'rating.score',
                                    'interval': 21
                                }
                            },
                            'album_year': {
                                'range': {
                                    'field': 'year',
                                    'ranges': [
                                        { 'to': 1970},
                                        {  'from': 1970, 'to': 1980},
                                        {  'from': 1980, 'to': 1990},
                                        {  'from': 1990, 'to': 2000},
                                        {  'from': 2000, 'to': 2010},
                                        {  'from': 2010 }
                                    ]
                                }
                            }
                        }
                    }
                });
            },

            'autocomplete': function (text) {
                return es.search({
                    index: 'musicalbum',
                    type: 'album',
                    body: {
                        'fields': [
                            'artist.name',
                            'id',
                            'name',
                            'year'
                        ],
                        'query': {
                            'query_string': {
                                'fields': [
                                    'name',
                                    'name.start',
                                    'year.string',
                                    'artist.name',
                                    'artist.name.start'
                                ],
                                'query': text,
                                'use_dis_max': false,
                                'auto_generate_phrase_queries': true,
                                'default_operator': 'OR'
                            }
                        },
                        'highlight': {
                            'number_of_fragments': 0,
                            'pre_tags': [
                                '<b>'
                            ],
                            'post_tags': [
                                '</b>'
                            ],
                            'fields': {
                                'artist.name': {},
                                'name.start': {},
                                'year.string': {}
                            }
                        }
                    }
                });
            }
        };
    }])
    .value('userLanguage', {
        getFirstLanguageRange: function (acceptLang) {
            if (acceptLang === undefined) {
                return undefined;
            }
            var languages = acceptLang.split(',');
            var firstLangRangeMaybeQuota = languages[0];
            var firstLangRange = firstLangRangeMaybeQuota.split(';');
            if (firstLangRange) {
                return firstLangRange[0];
            }
            return firstLangRangeMaybeQuota;
        },
        getLanguage: function (languageRange) {
            var extractPartsReg = /^([\w\*]*)(-(\w*))?.*$/i;

            var match = languageRange.trim().match(extractPartsReg);

            if (!match) {
                return undefined;
            }
            // parse language
            var parseLangReg = /^([a-z]{2}|\*)$/i;
            var lang = match[1];
            if (lang) {
                var langMatch = lang.match(parseLangReg);
                if (langMatch) {
                    return langMatch[0].toLowerCase();
                }
            }
            return undefined;
        }
    }).service('translation', ['$resource', function ($resource) {
        this.getTranslation = function ($scope, language) {
            var languageFilePath = 'i18n/app-locale_' + language + '.json';
            $resource(languageFilePath).get(function (data) {
                $scope.translation = data;
            });
        };
    }]);
