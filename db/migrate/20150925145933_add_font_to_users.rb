class AddFontToUsers < ActiveRecord::Migration
  def change
    add_column :users, :post_font, :string
  end
end
