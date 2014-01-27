www.balancedpayments.com
==================

Balanced Static Site

[![Build Status](https://travis-ci.org/balanced/www.balancedpayments.com.png)](https://travis-ci.org/balanced/www.balancedpayments.com)

## What

Welcome to the Balanced Static Site.

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
5. Commit your changes (`git commit -am 'Add some feature'`)
6. Push to the branch (`git push origin my-new-feature`)
7. Create new [pull request](https://help.github.com/articles/using-pull-requests)

# Setting up the development environment with Vagrant

Vagrant is a tool to automate the installation of development
environments in separate virtual machines. This project has been setup
with vagrant to map this current folder to `/srv/app.`

Vagrant will also connect port 8080 in the virtual machine to port
8080 on the host computers localhost, so that if you surf to
http://10.0.0.2:8080/ when vagrant is running then you will be able to
see the website running.

Any changes made while vagrant is running should be propagated to the
virtual machine and regenerate the site with the changes made.

## Step by step

[Install Vagrant](http://docs.vagrantup.com/v2/installation/index.html)
and required dependencies.

Install Berkshelf
```
$ gem install berkshelf --no-ri --no-rdoc
```

Install the vagrant-berkshelf Plugin

```
$ vagrant plugin install vagrant-berkshelf
```

Install the vagrant-omnibus plugin
```
$ vagrant plugin install vagrant-omnibus
```


Fire up the virtual machine
```
$ vagrant up
$ vagrant provision # Not necessary on first run, updates jekyll on subsequent
$ vagrant ssh
$ cd /srv/app
```

Open your web browser and point it to http://10.0.0.2:8080/ and
bask in the greatness that is our website. To see updates refresh
your browser. Updates can take a few seconds to build.



