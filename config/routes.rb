Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get 'api/contacts' => 'contacts#index'
  post 'api/contacts' => 'contacts#create'
  patch 'api/contacts' => 'contacts#update'
  delete 'api/contacts' => 'contacts#destroy'

  root 'pages#home'
end
