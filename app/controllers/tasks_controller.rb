class TasksController < ApplicationController
  def index
    @tasks = Task.all
  end

  def new
    @task = Task.new
  end

  def create
    @task = Task.new(task_params)

    if @task.save
      redirect_to tasks_path, notice: '新增任務成功！'
    else
      render :new
    end
  end

  private
  def task_params
    params.require(:task).permit(:title, :content)
  end
end
