devops-version-status
===================

A module append two endpoints to the URL
    1. /version, shows version info from pakcage.json
    2. /status, gets module name from pakcage.json and show '(module name) is running.'

## Installation
    npm install devops-version-status --save

## usage
    //in Gruntfile.js or Gulpfile.js
    var app = express();

    var vs = require('devops-version-status');
    vs(app);

    // default is './package.json', to specificy package.json, e.g.
    // vs(app, '../package.json')

## test
    npm test

## Contributing
    brybwy@gmail.com

## Release History
    * 1.0.0 Initial release
