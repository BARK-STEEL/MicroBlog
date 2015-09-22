class User < ActiveRecord::Base
  has_secure_password
  before_create :generate_token

  has_many :posts

  def generate_token
    self.token = SecureRandom.urlsafe_base64(nil, false)
  end
end
