www.balancedpayments.com
==================

Balanced Static Site

[![Build Status](https://travis-ci.org/balanced/www.balancedpayments.com.png)](https://travis-ci.org/balanced/www.balancedpayments.com)

## What

Welcome to the Balanced Dashboard.

As an open company we want to put as much of our company in the public view as
possible. We're creating our [homepage](https://www.balancedpayments.com/) as a static site that
anyone can fork, comment on, contribute to, or generally tinker with.

## Why

Found a spelling mistake? See an error? Jump in and contribute!

## How

### Running locally

You will need node installed as a development dependency. See
[node's site](http://nodejs.org/) for help with that.

1. `npm install -g grunt-cli`
2. `npm install`
3. Build - `grunt`
4. To view in a browser - [http://localhost:8080/](http://localhost:8080/)
5. To run unit tests at the command line `grunt test`
6. To build for deployment `grunt build`

### Building and Deploying

1. To build everything `grunt build`
2. To deploy to S3 `grunt deploy`

**Note**: To build, you need to have binary dependendencies installed for [grunt-img](https://github.com/heldr/grunt-img). See the project page for how to set that up. If you have a Mac and use homebrew, you can run this to install them:

		brew install optipng jpeg

**Note**: In order to deploy to S3, you must have the appropriate `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables set

### Contributing

You can contribute to this project in one of two ways:

1. Browse our issues, comment on proposals, report bugs.
2. Clone the balanced-static-site repo, make some changes according to our
   development guidelines and issue a pull-request with your changes.


### Development guidelines

1. Fork it (`git clone git://github.com/balanced/www.balancedpayments.com.git`)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Write your code **and unit tests**
4. Ensure all tests still pass (`grunt test`)
5. Verify your code (`grunt verify`) (uses [JSHint](https://github.com/jshint/jshint/) and [JSBeautify](https://github.com/einars/js-beautify) to do linting and check style guidelines)
6. Commit your changes (`git commit -am 'Add some feature'`)
7. Push to the branch (`git push origin my-new-feature`)
8. Create new [pull request](https://help.github.com/articles/using-pull-requests)

