class Api::PostsController < ApplicationController

  include Api::PostsHelper

  before_action :current_api_user!

  def index
    render json: @current_user.posts
  end

  def create
    render json: @current_user.posts.create(post_params)
  end

  def show
    render json: @current_user.posts.find(params[:id])
  end

  def update
    post = @current_user.posts.find(params[:id])
    render json: post.update(params[:post_params])
  end

  def destroy
    @current_user.posts.destroy(params[:id])
    render json: {status: 202}
  end

  private

  def post_params
      params.require(:post).permit(:title, :content)
  end

end
