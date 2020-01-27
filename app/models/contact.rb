class Contact < ApplicationRecord
  validates :email, presence: true, uniqueness: true, format: { with: /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i }
  validates :name, presence: true
  validates :company, presence: true

  def self.generateLat()
    decimal = Array.new(6) { rand(0...9) }.join
    "#{rand(37...42)}.#{decimal}"
  end

  def self.generateLng()
    decimal = Array.new(6) { rand(0...9) }.join
    "#{rand(-5...-1)}.#{decimal}"
  end
end

