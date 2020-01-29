require 'rails_helper'

RSpec.describe Contact, type: :model do
  context 'Validations' do
    it "Doesn't persist duplicate email addresses" do
      contact = Contact.new(name: 'Tom', company: 'Tom inc.', email: 'test@example.com').save
      contact2 = Contact.new(name: 'Bob', company: 'Bob inc.', email: 'test@example.com').save
      expect(contact2).to eq(false)
    end

    it "Ensures presence of email" do
      contact = Contact.new(name: 'Tom', company: 'Tom inc.').save
      expect(contact).to eq(false)
    end

    it "Ensures presence of name" do
      contact = Contact.new(email: 'test@test.com', company: 'Tom inc.').save
      expect(contact).to eq(false)
    end

    it "Ensures presence of company" do
      contact = Contact.new(name: 'Tom', email: 'test@example.com').save
      expect(contact).to eq(false)
    end

    it "Saves successfully when given valid inputs" do
      contact = Contact.new(name: 'Tom', company: 'Tom inc.', email: 'test@example.com').save
      expect(contact).to eq(true)
    end
  end

  context 'Generate lat/lng' do
    it "Generates a correctly formated coordinate string (in a set range)" do
      lat = Contact.generate_lat()
      expect(lat).to be_kind_of(String)
      expect(lat.split('.')[0].length).to eq(2)
      expect(lat.split('.')[1].length).to eq(6)
    end

    it "Generates a random coordinate each time" do
      lng = Contact.generate_lng()
      lng2 = Contact.generate_lng()
      expect(lng).not_to eq(lng2)
    end
  end
end
