  # -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.hostname = "www-balancedpayments-com-VM-berkshelf"

 # Every Vagrant virtual environment requires a box to build off of.
  config.vm.box = "opscode-ubuntu-12.04"

  # The url from where the 'config.vm.box' box will be fetched if it doesn't already exist on the user's system.
  config.vm.box_url = "https://opscode-vm.s3.amazonaws.com/vagrant/opscode_ubuntu-12.04_provisionerless.box"


  config.omnibus.chef_version = :latest

  # Assign this VM to a host-only network IP, allowing you to access it
  config.vm.network :private_network, ip: '10.0.0.2'

  config.vm.network :forwarded_port, guest: 8080, host: 8080

  config.vm.boot_timeout = 120
  config.berkshelf.enabled = true


  config.vm.provision :chef_solo do |chef|

   chef.run_list = [
        'recipe[www.balancedpayments.com]',
    ]

  end
end



