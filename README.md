# Post

## Ruby & Rails Version
- Ruby: `2.6.0`
- Rails: `5.2.3`

## ER Diagram
![ERD](https://images2.imgbox.com/89/f0/0cKkgDPd_o.jpg)

## Table Schema
- users

  |Column|Data Type|
  |--|--|
  |id|*integer*| 
  |email|*string*| 
  |password|*string*| 
  |role|*string*| 

- tasks

  |Column|Data Type|
  |--|--|
  |id|*integer*| 
  |user_id|*integer*| 
  |title|*string*| 
  |start_time|*datetime*| 
  |end_time|*datetime*| 
  |priority|*integer*| 
  |status|*integer*| 
  |description|*text*| 
  
- tags

  |Column|Data Type|
  |--|--|
  |id|*integer*| 
  |name|*string*| 
  |title|*string*| 

- tags_tasks (join table for "tags" and "tasks")

  |Column|Data Type|
  |--|--|
  |id|*integer*| 
  |tag_id|*integer*| 
  |task_id|*integer*| 


## Getting Started