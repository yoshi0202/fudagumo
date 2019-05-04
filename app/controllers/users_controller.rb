class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    if !logged_in? || current_user.id != @user.id
      redirect_to root_path
    end
  end
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to @user
    else 
      redirect_to root_path
    end
  end

  private
    def user_params
      params.require(:user).permit(:name, :email, :password,
                                    :password_confirmation)
    end
end