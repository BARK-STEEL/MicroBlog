class AddSecondPicToUsers < ActiveRecord::Migration
  def change
    add_column :users, :profile_photo2, :string
  end
end
