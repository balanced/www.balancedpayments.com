#
# Cookbook Name:: www.balancedpayments.com

# Recipe:: default
#
# Copyright (C) 2013 YOUR_NAME
#
# All rights reserved - Do Not Redistribute
#
include_recipe "nodejs"
include_recipe "nodejs::npm"
include_recipe "git"


git "#{Chef::Config[:file_cache_path]}/www.balancedpayments.com.git" do
  repository "https://github.com/balanced/www.balancedpayments.com.git"
  reference "master"
  action :sync
end

bash "install grunt" do
  cwd "#{Chef::Config[:file_cache_path]}/www.balancedpayments.com.git"
  code <<-EOH
    npm install -g grunt-cli
    npm install
    grunt vagrant
  EOH
  environment 'PREFIX' => "/usr/local"
end
