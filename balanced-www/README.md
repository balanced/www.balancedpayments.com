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

