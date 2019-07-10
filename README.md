# Let's Post It
[![Build Status](https://travis-ci.org/emn178/js-md5.svg?branch=master)](https://travis-ci.org/dannyh79/let_me-post_it)

A Rails app for task management

---
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


## Getting Started (WIP)
- 以 `rails db:create` 建立資料庫
- 以 `rails db` 確認有正確連接資料庫

## Running the Automated Test Suite
- `$ bundle exec guard`