require 'rails_helper'

RSpec.describe Task, type: :feature do
  let(:title) { Faker::Lorem.sentence }
  let(:description) { Faker::Lorem.paragraph }

  describe 'index' do
    it do
      visit tasks_path
      expect(page).to have_css('h1', text: 'Task List')
      expect(page).to have_css('a', text: 'Create a New Task')
      expect(page).to have_css('table th', text: 'Title')
      expect(page).to have_css('table th', text: 'Start Time')
      expect(page).to have_css('table th', text: 'End Time')
      expect(page).to have_css('table th', text: 'Status')
      expect(page).to have_css('table th', text: 'Description')
      expect(page).to have_css('table th', text: 'Edit')
    end
  end

  describe 'create a task' do
    it 'with title and description' do
      create_task_with(title, description)
      expect(page).to have_content('Success: a new task is created!')
      expect(page).to have_content(title)
      expect(page).to have_content(description)
    end

    it 'without input' do
      create_task_with(nil, nil)
      expect(page).to have_content('Title can\'t be blank')
      expect(page).to have_content('Description can\'t be blank')
    end
    
    it 'without title' do
      create_task_with(nil, description)
      expect(page).to have_content('Title can\'t be blank')
    end

    it 'without description' do
      create_task_with(title, nil)
      expect(page).to have_content('Description can\'t be blank')
    end
  end

  describe 'view a task' do
    it do
      create_task_with(title, description)
      visit the_task_path(title)
  
      expect(page).to have_content(title)
      expect(page).to have_content(description)
    end
  end

  describe 'edit a task' do
    let(:new_title) { Faker::Lorem.sentence }
    let(:new_description) { Faker::Lorem.paragraph }

    it 'with new title and new description' do
      create_task_with(title, description)
      visit the_edit_task_path(title)

      edit_task_with(new_title, new_description)
      
      expect(page).to have_content('Success: the task is updated!')
      expect(page).to have_content(new_title)
      expect(page).to have_content(new_description)
    end

    it 'without input' do
      create_task_with(title, description)
      visit the_edit_task_path(title)
      edit_task_with()
      
      expect(page).to have_content('Title can\'t be blank')
      expect(page).to have_content('Description can\'t be blank')
    end

    it 'without title' do
      create_task_with(title, description)
      visit the_edit_task_path(title)
      edit_task_with(nil, new_description)
      
      expect(page).to have_content('Title can\'t be blank')
    end
    
    it 'without description' do
      create_task_with(title, description)
      visit the_edit_task_path(title)
      edit_task_with(new_title)
      expect(page).to have_content('Description can\'t be blank')
    end
  end

  describe 'delete a task' do
    it do
      create_task_with(title, description)
      click_on 'Delete'
      expect(page).to have_content('Success: the task is deleted!')
    end
  end

  private

  def create_task_with(title, description)
    visit new_task_path
    within('form.form_task') do
      fill_in 'Title', with: title
      fill_in 'Description', with: description
      click_on 'Create Task'
    end
  end

  def edit_task_with(new_title = nil, new_description = nil)
    within('form.form_task') do
      fill_in 'Title', with: new_title
      fill_in 'Description', with: new_description
      click_on 'Update Task'
    end
  end

  def the_task_path(title)
    task_path(find_task_by_title(title))
  end

  def the_edit_task_path(title)
    edit_task_path(find_task_by_title(title))
  end

  def find_task_by_title(title)
    Task.find_by(title: title)
  end
end