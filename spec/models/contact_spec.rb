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
end
