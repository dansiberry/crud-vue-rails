class ContactsController < ApplicationController
  before_action :set_contact, only: [:update, :destroy]

  def index
    @contacts = Contact.all()
    render json: @contacts
  end

  def create
    @contact = Contact.new(contact_params)
    @contact.lat = Contact.generateLat();
    @contact.lng = Contact.generateLng();

    if @contact.save
      render json: {status: :ok, message: 'Successfuly saved'}
    else
      render json: {status: "error", code: 400, message: @contact.errors.full_messages.to_sentence}
    end
  end

  def destroy
    if @contact.destroy
      render json: {status: :ok, message: 'Successfuly deleted contact'}
    else
      render json: {status: "error", code: 400, message: @contact.errors.full_messages.to_sentence}
    end
  end

  def update
    if @contact && @contact.update_attributes(contact_params)
      render json: {status: :ok, message: 'Successfuly updated contact'}
    else
      render json: {status: "error", code: 400, message: @contact.errors.full_messages.to_sentence}
    end
  end

  private

  def set_contact
    @contact = Contact.find_by(id: params[:id])
    if !@contact
      render json: {status: "error", code: 400, message: 'Contact not found'}
    end
  end

  def contact_params
    params.require(:contact).permit(:name, :email, :summary, :company, :id)
  end
end
