require 'rails_helper'

RSpec.describe ContactsController, type: :controller do
  context 'Index' do
    it "Responds with success" do
      get :index
      expect(response.code).to eq('200')
    end

    it "Returns JSON" do
      get :index
      expect(response.content_type).to include("application/json")
    end
  end

  context 'Create' do
    it "Fails if no name is given" do
      post :create, params: { contact: { email: 'a@a.com', company: 'company' }}
      expect(JSON.parse(response.body)['code']).to eq(400)
    end

    it "Succeeds if all params given" do
      count = Contact.count
      post :create, params: { contact: { email: 'a@a.com', company: 'company', name: 'bob' }}
      expect(Contact.count).to eq(count + 1)
    end
  end

  context 'Update' do
    it "Updates a given contact" do
      contact = Contact.create!(email: 'a@a.com', company: 'company', name: 'bob')
      post :update, params: { id: contact.id, contact: { email: 'b@b.com', company: 'company' }}
      expect(Contact.last.email).to eq('b@b.com')
    end

    it "Should fail if invalid ID is given" do
      post :update, params: { id: 'foo', contact: { email: 'b@b.com', company: 'company' }}
      expect(JSON.parse(response.body)['code']).to eq(400)
    end
  end

  context 'Delete' do
    it "Deletes a given contact" do
      contact = Contact.create!(email: 'a@a.com', company: 'company', name: 'bob')
      count = Contact.count
      delete :destroy, params: { id: contact.id }
      expect(Contact.count).to eq(count - 1)
    end
  end
end
