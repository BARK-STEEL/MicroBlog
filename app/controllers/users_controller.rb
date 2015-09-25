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
    render layout: 'profile_layout'
  end

  def edit
    @user = current_user
  end

  def update
    user = current_user
    user.update(user_params)
    redirect_to profile_path
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :profile_photo, :profile_photo2, :post_font, :color)
  end

end
