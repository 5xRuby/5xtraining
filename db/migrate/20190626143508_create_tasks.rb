class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :title
      t.datetime :start_time
      t.datetime :end_time
      t.integer :priority
      t.integer :status
      t.text :description

      t.timestamps
    end
  end
end
