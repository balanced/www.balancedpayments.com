www.balancedpayments.com Static pages
=========

[![Build Status](https://travis-ci.org/balanced/www.balancedpayments.com.png)](https://travis-ci.org/balanced/www.balancedpayments.com)


Building locally
----------------

    cd www.balancedpayments.com
    npm install
    git submodule update --init
    make

Viewing the site
----------------

    open output/index.html

Live compiling for development
----------------

    wintersmith preview

Then in another terminal:

    cd static
    ./watcher

Navigate to [http://localhost:8080](http://localhost:8080).
