# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.hostname = "balanced-www"
  config.vm.box = 'precise64'
  config.vm.box_url = 'https://opscode-vm.s3.amazonaws.com/vagrant/opscode_ubuntu-12.04_provisionerless.box'
  config.vm.synced_folder '.', '/srv/app'

  config.omnibus.chef_version = :latest

  # Assign this VM to a host-only network IP, allowing you to access it
  config.vm.network :private_network, ip: '10.0.0.2'
  config.vm.network :forwarded_port, guest: 8080, host: 8080

  config.berkshelf.enabled = true


  config.vm.provision :chef_solo do |chef|

   chef.run_list = [
        'recipe[balanced-www]',
    ]

  end
end


