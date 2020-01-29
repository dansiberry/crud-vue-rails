class Contact < ApplicationRecord
  validates :email, presence: true, uniqueness: true, format: { with: /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i }
  validates :name, presence: true
  validates :company, presence: true

  def self.generate_lat
    generate_random_coord(37...42)
  end

  def self.generate_lng
    generate_random_coord(-5...-1)
  end

  def self.generate_random_coord(range)
    decimal = Array.new(6) { rand(0...9) }.join
    "#{rand(range)}.#{decimal}"
  end
end

