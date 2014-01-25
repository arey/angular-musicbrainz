module.exports = function(config){
    config.set({
    basePath : '../',

    files : [
      // libraries
      'app/lib/angular/angular.js',
      'app/lib/**/angular-*.js',
      'app/lib/angular-ui-bootstrap-bower/ui-bootstrap-tpls.js',
      'app/lib/angular-mocks/angular-mocks.js',

      // our app
      'app/js/**/*.js',

      // test
      'test/unit/**/*.js',

      //include the directory where directive templates are stored.
      'app/partials/directives/**/*.html'

    ],

    exclude : [
      'app/lib/angular-scenario/angular-scenario.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome', 'PhantomJS'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor',
            'karma-coverage'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },

    // generate js files from html templates to expose them during testing.
   preprocessors : {
        'app/partials/directives/**/*.html': ['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
        // strip this from the file path
        stripPrefix: 'app/',

        moduleName: 'directive-templates'
    }

})}
