class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :title
      t.string :content
      t.datetime :start_time
      t.datetime :end_time
      t.string :priority
      t.string :status

      t.timestamps
    end
  end
end
