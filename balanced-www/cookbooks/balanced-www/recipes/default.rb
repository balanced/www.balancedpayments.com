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


git "#{Chef::Config[:file_cache_path]}/take2.git" do
  repository "https://github.com/rserna2010/take2.git"
  reference "master"
  action :sync
end

bash "install grunt" do
  cwd "#{Chef::Config[:file_cache_path]}/take2.git"
  code <<-EOH
    npm install -g grunt-cli
    npm install
  EOH
  environment 'PREFIX' => "/usr/local"
end
