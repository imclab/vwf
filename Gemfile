# Specifying versions: http://docs.rubygems.org/read/chapter/16

source :rubygems

gem "sinatra", ">= 1.3", :require => "sinatra/base"
gem "json"

gem "websocket-rack", :require => "rack/websocket"

gem "thin"

gem "rake" # for build scripts
gem "rocco" # for documentation builds

group :development do
  gem "sinatra-reloader", :require => "sinatra/reloader"
end

group :test do
  gem "rack-test", :require => "rack/test"
end

# Allow a prerelease version in order to resolve a websocket-rack warning about eventmachine
# comm_inactivity_timeout. Remove once 1.0.0 is released.

# 1.0.0.beta.4 won't build successfully with RubyInstaller and MinGW.

gem "eventmachine", ">= 1.0.0.beta", "!= 1.0.0.beta.4"

# redcarpet >= 2 no longer declares a Markdown class, which Rocco expects. Having rocco require
# "redcarpet/compat" for redcarpet >= 2 would probably also fix this.

gem "redcarpet", "< 2"
