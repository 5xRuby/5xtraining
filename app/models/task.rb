class Task < ApplicationRecord
  validates :title, :description, presence: true
end
