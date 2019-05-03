class SessionsController < ApplicationController

  def new
  end

  def create
    user = User.find_by(email: params[:users][:email].downcase)
    if user 
      redirect_to user
    else 
      render 'new'
    end
  end

  def destroy
  end
end