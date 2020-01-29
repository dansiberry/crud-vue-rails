class CreateContacts < ActiveRecord::Migration[6.0]
  def change
    create_table :contacts do |t|
      t.string :name, null: false, index: { unique: true }
      t.string :lat
      t.string :lng
      t.string :email, null: false, index: { unique: true }
      t.text :summary
      t.string :company, null: false, index: { unique: true }
    end
  end
end
