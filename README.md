# Angular MusicBrainz

Simple **music album search web app** built with **AngularJS**. Search queries are executed against an **Elasticsearch** index.
These index has been created from the **MusicBrainz database**.<br/>
Only "real" **Album** are searchable. Single, EP, Compilation, Live, Remix, Soundtrack and Broadcast are not indexed.

## Features ##

* **Autocomplete** with highlighting
* **Paginated search results** with album cover thumbs
* **Faceting**: distribution of music albums in the result set
* **I18N**: both english and french languages are supported
* **Unit tests** and **end-to-end tests** with Karma and Jasmine
* Cover and Rating Angular directives
* Elasticsearch-js client usage
* Responsive Design

![Angular Musicbrainz Screenshot](https://raw.githubusercontent.com/arey/angular-musicbrainz/master/screenshot.png "Angular Musicbrainz Screenshot")

## Quick Start ##

* `git clone https://github.com/arey/angular-musicbrainz`
* Open the `app/index.html` file into Firefox


## Online Demo

MusicBrainz database searching with AngularJS and Elasticsearch:
[http://angular-musicbrainz.javaetmoi.com/](http://angular-musicbrainz.javaetmoi.com/ "MusicBrainz database searching with AngularJS and Elasticsearch")


## Powered by ##

This project depends on several other open source projects:

* **[Elasticsearch-js](https://github.com/elasticsearch/elasticsearch-js)**: the brand new official JavaScript Elasticsearch client
* **[AngularJS](http://angularjs.org/)**: the popular Google MVC JavaScript framework
* **[Angular Seed](https://github.com/angular/angular-seed)**: application skeleton for a typical [AngularJS](http://angularjs.org/) web app
* **[Bootstrap](Bootstrap)**: front-end framework for developing responsive
* **[Angular UI Bootstrap](http://angular-ui.github.io/bootstrap/)**: Bootstrap components written in pure AngularJS
* **[jQuery](http://jquery.com/)**: only used to asynchronously load JS files at runtime

## Prerequisites ##

Angular is a client-side-only technology and the only required backend is an Elasticsearch server.<br/>
Thus the angular-musicbainz application run in a local browser.<br/>
With Mozilla Firefox, the `app/index.html` could be load from the filesystem.<br/>
Whereas with Google Chrome, you need a local web server (like Apache, Nginx, IIS) to  avoid issues with security
restrictions (sandbox). You may also used the provided `scripts/web-server.js`to start a web server whith NodeJS.

### 1. NodeJS and third libraries ###

[Node.js](http://nodejs.org/) provides a JavaScript web server that could be used to play with angular-musicbainz.<br/>
Unit tests and e2e tests execution requires NodeJS and Karma.
Grunt requires Karma.

NodeJS libraries to install:
* Karma in order to run the unit tests and the e2e tests: `sudo npm install -g karma`
* Bower to update dependencies
* Grunt to build the distributed files

### 2. Elasticsearch ###

A pre-configured **public Elasticsearch cluster** is available on OpenShift.<br/>
URL: http://es.javaetmoi.com/musicalbum/album/_search


You may use it or choose to **install your own cluster**.<br/>
[Download Elasticsearch v0.90.10](http://www.elasticsearch.org/download/) and configure it.<br/>
One unziped, edit the config/elaticsearch.yml configuration file. Uncomment the _cluster.name_ line and set it with the  _musicbrainz_ cluster name:
`cluster.name: musicbrainz`<br/>
You may also prefer to keep the default _elasticsearch_ cluster name and change the name in the es-musicbrainz-batch.properties configuration file.<br/>

Edit the app/js/services.js file<br/>
At line 11, change `hosts: [ 'es.javaetmoi.com:80' ]` configuration to `hosts: [ 'localhost:9200' ]`

## Running the application

* Clone the angular-musicbrainz repository.
* Run `scripts/web-server.js` with NodeJS or deploy the `app` directory into a local web server.
* Then navigate your browser to `http://localhost:<port>/app/index.html` to see the app running in your browser.

## Running unit tests

[Jasmine](http://pivotal.github.com/jasmine/) and
[Karma](http://karma-runner.github.io) have been used for unit tests/specs.

* start `scripts/test.sh` (on windows: `scripts\test.bat`)
  * a browser will start and connect to the Karma server (Chrome is default browser, others can be captured by loading the same url as the one in Chrome or by changing the `config/karma.conf.js` file)
* to run or re-run tests just change any of your source or test javascript files

### End to end testing

Angular ships with a baked-in end-to-end test runner that understands angular, your app and allows
you to write your tests with jasmine-like BDD syntax.

Requires a webserver, node.js + `./scripts/web-server.js` or your backend server that hosts the angular static files.

Check out the
[end-to-end runner's documentation](http://docs.angularjs.org/guide/dev_guide.e2e-testing) for more
info.

* create your end-to-end tests in `test/e2e/scenarios.js`
* serve your project directory with your http/backend server or node.js + `scripts/web-server.js`
* to run do one of:
  * open `http://localhost:port/test/e2e/runner.html` in your browser
  * run the tests from console with [Karma](http://karma-runner.github.io) via
    `scripts/e2e-test.sh` or `script/e2e-test.bat`


## Build Status ##

Travis: [![Build Status](https://travis-ci.org/arey/angular-musicbrainz.png?branch=master)](https://travis-ci.org/arey/angular-musicbrainz)

Code Converage: [![Coverage Status](https://coveralls.io/repos/arey/angular-musicbrainz/badge.png)](https://coveralls.io/r/arey/angular-musicbrainz)

Dependencies: [![Dependency Status](https://david-dm.org/arey/angular-musicbrainz/status.png?branch=master)](https://david-dm.org/arey/angular-musicbrainz#info=Dependencies)
[![devDependency Status](https://david-dm.org/arey/angular-musicbrainz/dev-status.png?branch=master)](https://david-dm.org/arey/angular-musicbrainz#info=devDependencies)

Code Climate: [![Code Climate](https://codeclimate.com/github/arey/angular-musicbrainz.png)](https://codeclimate.com/github/arey/angular-musicbrainz)

## Documentation ##

* French blog post: [Développer et industrialiser une web app avec AngularJS](http://javaetmoi.com/2014/02/developper-industrialiser-web-app-recherche-angularjs)

## Directory Layout

    app/                --> all of the files to be used in development
      css/              --> css files
        app.css         --> default stylesheet
      i18n/             --> json files for french and english languages
      img/              --> image files
      index.html        --> app layout file (the main html template file of the app)
      js/               --> javascript files
        app.js          --> application
        controllers.js  --> application controllers
        directives.js   --> application directives
        filters.js      --> custom angular filters
        routes.js       --> application routes
        services.js     --> custom angular services
      lib/                  --> angular and 3rd party javascript libraries declared in bower.json
        angular/
        angular-i18n/
        angular-mocks/      --> mocks that replace certain angular services in tests
        angular-resource/
        angular-route/
        angular-sanitize/
        angular-scenario/   --> angular's scenario (end-to-end) test runner library
        angular-ui-bootstrap-bower/
        bootstrap/
        elasticsearch-js/
        jquery/
      partials/             --> angular view partials (partial html templates)
        info.html
        search.html
        directives/
          cover.html        --> angular templates behind directives
          rating.html

    config/karma.conf.js        --> config file for running unit tests with Karma
    config/karma-e2e.conf.js    --> config file for running e2e tests with Karma

    dist                --> files created by `grunt build` to be used in production

    node_modules        --> files installed by nodejs in order to run grunt and karma

    scripts/            --> handy shell/js/ruby scripts
      e2e-test.sh       --> runs end-to-end tests with Karma (*nix)
      e2e-test.bat      --> runs end-to-end tests with Karma (windows)
      test.bat          --> autotests unit tests with Karma (windows)
      test.sh           --> autotests unit tests with Karma (*nix)
      web-server.js     --> simple development webserver based on node.js

    test/               --> test source files
      e2e/              --> end-to-end tests level
        runner.html     --> end-to-end test runner (open in your browser to run)
        scenarios.js    --> end-to-end specs
      unit/                     --> unit level specs/tests
        controllersSpec.js      --> specs for controllers
        directivessSpec.js      --> specs for directives
        filtersSpec.js          --> specs for filters
        servicesSpec.js         --> specs for services


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/arey/angular-musicbrainz/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

