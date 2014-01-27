#
# Cookbook Name:: balanced-www

# Recipe:: default
#
# Copyright (C) 2013 YOUR_NAME
#
# All rights reserved - Do Not Redistribute
#
include_recipe "nodejs"
include_recipe "nodejs::npm"
include_recipe "git"


bash "install grunt" do
  cwd "/srv/app"
  code <<-EOH
    npm install -g grunt-cli
    npm install
    grunt vagrant
  EOH
  environment 'PREFIX' => "/usr/local"
end
