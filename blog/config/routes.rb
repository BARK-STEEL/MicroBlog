Rails.application.routes.draw do

  root 'welcome#index'
  
  get '/users/log_in' => 'users#log_in', as: :log_in
  get '/users/sign_up' => 'users#sign_up', as: :sign_up
  get '/users/profile' => 'users#profile', as: :profile

  resources :users, only: [:create, :edit, :update]

  post '/sessions' => 'sessions#create'
  delete '/sessions' => 'sessions#destroy', as: :log_out

end
