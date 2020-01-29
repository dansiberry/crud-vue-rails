# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

Contact.destroy_all()

10.times do
  Contact.create!(
    name: Faker::Name.name,
    email: Faker::Internet.email,
    lat: Contact.generate_lat(),
    lng: Contact.generate_lng(),
    company: Faker::Company.name,
    summary: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis voluptas nisi qui neque, minus, laudantium deleniti cum, temporibus perspiciatis, facere est hic sapiente. Modi, harum, similique. Porro ipsum laboriosam ea.'
  )
end
