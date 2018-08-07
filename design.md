# 5xTraining: 設計
[使用說明](README.md)

## 概要

### 開發需求

本教程的主要課題為指定網站的改版，過程中將訓練網頁設計的能力，並熟悉設計軟體與切版技巧。這個流程需要做到的事情有：

#### 設計階段

- 選定一指定網站並重新設計頁面
- 與 Mentor 討論網站的問題與修改計畫，模擬與客戶溝通的過程
- 使用 Sketch 進行設計
    - 含首頁至少三個頁面，其他頁面由 Mentor 指定
    - 需包含 Desktop HD, Desktop, Tablet, Mobile 四個版本的設計稿

#### 開發階段

- 使用 Rails 進行前台開發
    - 需套用 Bootstrap
    - 需具備 RWD
    - 使用 ERB, Haml 或 Slim 來撰寫 HTML
    - 使用 SCSS/SASS 來撰寫 CSS
    - 使用 YAML 檔案處理文字資料
    - 需包含指定網站所有動態效果


### 瀏覽器支援

- 預設需要支援 macOS/Chrome 的最新版本

### 開發工具

請以下列程式語言的最新版本進行開發。

#### 設計

- [Sketch](https://www.sketchapp.com/)

#### 開發

- Ruby
- Ruby on Rails

※ 本教程重點放在熟練 Sketch 操作與撰寫 Rails 前台，不需要部署。

## 教程的最終目標

完成本教程後，我們會認為你已經習得以下能力：

- 能夠運用 Sketch 進行網頁設計
- 能夠參照設計稿進行切版
- 具備獨立開前台頁面的能力
- 知道如何在 GitHub 發 PR、merge 等協作流程，以及必須的 git 指令
	- 能將 commit 切成適度的大小
	- 能寫出適合的 PR 說明
	- 能針對 code review 進行修正
- 遇到問題時，能夠適時以口頭或線上工具向相關人員（在本例中為導師）求救

## 參考資料

- Git: https://gitbook.tw/
- Sketch: https://www.sketchapp.com/
- Rails: https://railsbook.tw/

## 必修課題

### 步驟1: 選定並分析指定網站

- 可選擇的指定網站有：
    1. [Mesido 和流行飾品](https://www.mesido.com.tw/)
    2. [Elegant walk｜EW女鞋－踏上優雅的步伐！](http://www.ewshoes.tw/)
    3. [ZARA Taiwan / 台灣](https://www.zara.com/tw/)
    4. [ZALORA時尚服飾購物網站](https://www.zalora.com.tw/)
    5. [Chiu3時尚服飾 官方網站](http://www.chiu3.com/v2/official)

- 選定一指定網站並分析該網站現有的問題
    - 設計、架構、編排、用戶體驗等
    - 可沿用 Logo、文案、商品照片等
    - 也可以重新設計 Logo、照片等

### 步驟2: 與 Mentor 討論修改計畫

- 與 Mentor 進行討論：
    - Mentor 會扮演客戶的角色
    - Mentee 需根據指定網站提出問題點與修正方案
    - 最終由 Mentor 指定其他頁面作為題目
    - 題目含首頁至少三個頁面

### 步驟3: Wireframe 設計

- 根據指定題目進行 Wireframe 繪製
    - 至少完成每個頁面 Desktop 版本的 Wireframe
    - 繪製同時規劃 Sketch 的設計流程

- 與 Mentor 討論 Wireframe

### 步驟4: 以 Sketch 進行設計

- 根據 Wireframe 進行設計
    - 需包含 Desktop HD, Desktop, Tablet, Mobile 四個版本的設計稿
    - 根據不同版面的大小，可收合或隱藏部分元件，但不可刪減原本網站的內容

- 設計時，需留意以下事項：
    - 圖層整理與命名
    - 文字／元件的樣式設定
    - Symbols 設計與套用
    - 不同版本間的風格必須統一

### 步驟5: 提交 Sketch 檔案，與 Mentor 進行討論與修正

- 所有設計必須整合在同一個 Sketch 檔案中
- 討論時，會根據版面設計、一致性、用戶體驗等不同面向進行綜合評估並給予 Feedback
- 確定最終版本後即可進入開發階段

### 步驟6: 建立 Rails 的開發環境

#### 1-1: 安裝 Ruby

- 利用 [rbenv](https://github.com/rbenv/rbenv) 或 [RVM](https://rvm.io) 安裝最新版本的 Ruby
- 以 `ruby -v` 指令來確認 Ruby 的版本

#### 1-2: 安裝 Rails

- 以 gem 指令安裝 Rails
- 安裝最新版本的 Rails
- 以 `rails -v` 指令來確認 Rails 的版本

### 步驟7: 學習使用 Git

- 在你的環境中安裝 git
	- macOS 的話，請以 `brew` 等工具安裝
	- 以 `git config` 設定 user name 和 email

- 我們會根據 Mentee 的設計，幫助 Mentee 建立基本的 Rails 專案
- Mentee 可以選擇將專案 fork 到自己的帳號之下，或使用 `git remote set-url` 的方式建立新的 repo
	- 如果沒有 GitHub 帳號，請先申請帳號
- 先建立新的 git topic branch
	- 之後都在 topic branch 上開發並 commit

### 步驟8: 前台設計

- 前台開發需滿足以下條件：
    - 需套用 Bootstrap
    - 需具備 RWD
    - 使用 ERB, Haml 或 Slim 來撰寫 HTML
    - 使用 SCSS/SASS 來撰寫 CSS
    - 使用 YAML 檔案處理文字資料

- 同時，熟悉 Rails 的架構。如不熟悉 MVC 的操作，或有資料庫的需求，請盡可能尋求幫助。
- 記得在 GitHub 上建立 PR 並請人 review
	- 必要時，請在 PR 上標柱 WIP（work in progress）
	- 收到 comment 後就做必要的處置。收到兩個 LGTM（looks good to me） 後就可以 merge 回 master

## 後記

辛苦了，恭喜你已經完成本次教程！

請盡可能持續練習 Sketch，熟悉快捷鍵與 Plugin 的操作，也可以嘗試搭配 [inVision](https://www.invisionapp.com/) 或 [Zeplin](https://zeplin.io/) 等協作工具。

你也可以嘗試建立 Rails 專案、學習開發 Rails，繼續選修課程做出真正的產品吧！

## （番外篇）選修課題

選修課題延續必修課題。除了前台頁面，這次請嘗試自己建立全新的 Rails 專案，並根據你先前的設計稿，做出實際可以運作的產品。本產品除了前台頁面，需加入後台管理，讓使用者能順利新增、修改與刪除產品，並管理產品的狀態。

### 選修課題1: 完成網站所有頁面的設計

- 延續先前的 Sketch 檔案，除 Mentor 指定的頁面之外，將其他頁面的設計完成

### 選修課題2: 建立 Rails 專案

- 以 `rails new` 指令，建立 app 最低限度的樣板和檔案
- 將使用的 Ruby 版號寫進 `Gemfile`（也請確認 Rails 版號是否有標明）
- 在 GitHub 建立新的 Reop 並將成品 push 上去

### 選修課題3: 想像網站成品會是什麼樣子

- 開始進行設計之前，請參照網站需求，和 Mentor 一起討論成品的架構
	- 需要哪些 model (table)？
	- table 會需要哪些欄位？
- 有想法之後，將 model 關係圖手繪出來
	- 完成後將關係圖拍照存檔，放進 repo 裡
	- 把 table schema 寫進 `README.md`（model 名稱、欄位名稱、資料形態）

※ 在這個階段，model 關係圖不需要是完全正確的。以現在所能預想的範圍來規劃就好（做到後面的步驟，發現需要修改時再來調整的概念）

### 選修課題4: 資料庫連接等週邊設定

- 安裝 bundler
- 在 `Gemfile` 安裝 `pg`（PostgreSQL 的 adapter）
- 設定 `database.yml`
- 以 `rails db:create` 建立資料庫
- 以 `rails db` 確認有正確連接資料庫

### 選修課題5: 建立任務 model

開始來做管理任務所需要的 CRUD。

- 以 `rails generate` 指令建立 CRUD 所需的 model class
- 撰寫 migration 並以此建立 table
	- 非常重要：migration 要確定能安全回到上一步的狀態！請養成以 `redo` 確認的習慣
- 以 `rails c` 指令，透過 model 確認有正確連接資料庫
	- 順便試著以 ActiveRecord 建立資料

### 選修課題6: 讓任務能夠被新增、修改、刪除

- 製作任務的列表、新增、檢視、修改頁面
	- 以 `rails generate` 指令產生 controller
	- 實做 controller 和 view 必要的部分
	- 新增、修改、刪除後，需要顯示對應的 flash 訊息
- 修改 `routes.rb`，讓 `http://localhost:3000/` 會顯示任務的列表頁面
- 在 GitHub 上發 PR 並請人 review
	- 之後的 PR，如果覺得過於龐大，就需要開始考慮分割成多個 PR


### 選修課題7: 加入設計

同必修步驟8: 前台設計，根據你的設計稿將頁面調整完畢。
