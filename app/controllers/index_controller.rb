class IndexController < ApplicationController
  def index
    @microposts = Micropost.all
  end
end
