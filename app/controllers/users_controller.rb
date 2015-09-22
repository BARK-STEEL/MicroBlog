class UsersController < ApplicationController
  
  include SessionsHelper

  def sign_up
    @user = User.new
  end

  def create
    user = User.create(user_params)
    redirect_to root_path
  end

  def log_in
  end

  def profile
    authenticate!
    @user = current_user
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end

end
