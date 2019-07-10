require 'rails_helper'

RSpec.describe Task, type: :model do
  describe "data input" do
    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:description) }
  end
end
