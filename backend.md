2026/08/16 更新

# 新進工程師訓練教材: 後端
[使用說明](README.md)

※ 開工前請先讀[AI 輔助學習與開發指引](ai-guide.md)，了解本教程中 coding agent 與 LLM 的使用界線。

## 概要

### 開發需求

本教材的主要目的，是要開發一套「任務管理系統」。這個系統需要做到的事情有：

- 任務功能
	- 可新增自己的任務
	- 使用者登入後，只能看見自己建立的任務
	- 可設定任務的開始及結束時間
	- 可設定任務的優先順序（高、中、低）
	- 可設定任務目前的狀態（待處理、進行中、已完成）
	- 可依任務建立時間排序
	- 可依任務狀態篩選任務
	- 可以任務的標題、內容進行搜尋
	- 可為任務加上分類標籤，並以標籤進行搜尋
	- 任務列表，並可依優先順序、開始時間及結束時間等進行排序

滿足以上需求之後，還會需要如下的管理機制：

- 使用者的管理功能
	- 定義使用者角色：管理者＆一般使用者
	- 管理者具有權限新增、修改、刪除使用者
	- 管理者具有權限查看所有使用者任務

※ 不使用 AASM & acts_as_tag 相關 Gem。認證功能不使用 Devise，也不使用 `has_secure_password`（詳見步驟22）

### 瀏覽器支援

- 預設需要支援 macOS/Chrome 的最新版本

### 開發工具

請以下列程式語言、網站開發框架及資料庫系統的最新穩定版本進行開發：

- Ruby 4.0 或以上版本
- Rails 8.2 或以上版本
- PostgreSQL（最新穩定版本）

### 開發輔助工具

- 使用 [Overmind](https://github.com/DarthSim/overmind) 取代 Rails 預設建議的 foreman，來執行 `Procfile.dev`（`bin/dev` 啟動開發環境時，需要同時跑 web server 和 tailwindcss watcher 等多個 process）

### 背景工作

- ActiveJob + [Solid Queue](https://github.com/rails/solid_queue)

### 前端相關工具

#### CSS

- TailwindCSS v4
- 推薦使用
  - [TailwindCSS UI](https://tailwindcss.com/plus)
  - [Flowbite](https://flowbite.com/)

#### JS

- Hotwire
- Stimulus JS：比較麻煩的任務
- Alpine.JS：一般性任務，容易快速上手且大部份 case 可以在 JS 寫在 view

#### View Component

- [View Component](https://viewcomponent.org/) + [LookBook](https://lookbook.build/)

### server 端請使用：

- render.com
- fly.io
- 其它任何類似的 PAAS
- 申請新的 Vultr 或 DigitalOcean 帳號可以免費試用

※ 本教材中對效能、資安沒有特別的要求，但仍需要有一定的品質。網站效能太差的話，會被要求改善。

## 最終目標

完成本教材後，我們會認為你已經具備以下能力：

- 可以實做基本的 Rails 網站以及做簡單的佈署
- 對於已經上線的 Rails 專案，能夠進行功能的追加和資料維護
- 知道如何在 GitHub 發 PR、merge 等協作流程，以及必須的 Git 指令：
	- 一個PR盡量將檔案變動控制在15個以內
	- 能將 commit 切成適度的大小
	- 能寫出適合的 PR 說明
	- 能針對 code review 進行修正
- 遇到問題時，能夠適時以口頭或線上工具向相關人員（在本例中為導師）求救

## 參考資料

- Git: [https://gitbook.tw/](https://gitbook.tw/)
- Rails new with Typecraft: https://www.youtube.com/playlist?list=PLHFP2OPUpCeZcPutT9yn4-e0bMmrn5Gd1
- 開發技巧集：[topics.md](topics.md)（Git、GitHub、Rails 開發環境相關技巧，請在研習過程中隨時參考）

### 查詢技術資料的基本網站

第一次使用的 method 或功能，請養成先查閱官方文件的習慣：

- [Ruby 官方文件](https://docs.ruby-lang.org/en/)
- [Ruby on Rails API](https://api.rubyonrails.org/)
- [Ruby on Rails Guides](https://guides.rubyonrails.org/)（[中文版](https://rails.ruby.tw/)）

## 必修課題

### 步驟1: 建立 Rails 的開發環境

#### 1-1: 安裝 Ruby

- 利用 [mise](https://mise.jdx.dev/) 安裝最新版本的 Ruby（`mise use -g ruby@latest`）
- 以 `ruby -v` 指令來確認 Ruby 的版本

#### 1-2: 安裝 Rails

- 以 gem 指令安裝 Rails
- 安裝最新版本的 Rails
- 以 `rails -v` 指令來確認 Rails 的版本

#### 1-3: 安裝資料庫（PostgreSQL）

- 在你使用的 OS 下安裝 PostgreSQL
	- macOS 的話，請以 `brew` 等工具安裝

#### 1-4: 安裝 Overmind

- 以 `brew install overmind` 安裝 [Overmind](https://github.com/DarthSim/overmind)
	- 之後會用它來啟動開發環境（詳見步驟3）

### 步驟2: 在 GitHub 建立 repository

- 在你的環境中安裝 Git
	- macOS 的話，請以 `brew` 等工具安裝
	- 以 `git config` 設定 user name 和 email
- 請考慮專案名稱（也等於 repo 名稱）
- 建立 repo
	- 如果沒有帳號的話，先申請帳號
	- 接著建立空白的 repo
- 使用 macOS 的人，為了避免把系統檔案誤 commit 進 Git，請加上全域的 ignore 設定
	- 建立 `~/.config/git/ignore` 這個文字檔，寫入以下內容：
	- ```
	  .DS_Store
	  ```

### 步驟3: 建立 Rails 專案

- 以 `rails new` 指令，建立 Rails 應用程式最低限度的樣板和檔案
	- 先以 `rails new --help` 確認有哪些選項，再選擇適合的選項建立專案
	- TailwindCSS 為必要，資料庫使用 PostgreSQL
	- 可以參考以下建議選項：
		- 想多方嘗試各種功能的人：
			- `--css=tailwind --database=postgresql --skip-action-mailbox`
		- 只想專注在本教材課題的人：
			- `--css=tailwind --database=postgresql --skip-action-mailer --skip-action-mailbox --skip-action-text --skip-active-storage --skip-action-cable --skip-jbuilder`
		- ※ 請不要加 `--skip-active-job`，之後的課題會用到 ActiveJob + Solid Queue
- 啟動開發環境確認專案能跑起來
	- `rails new --css=tailwind` 會產生 `bin/dev` 和 `Procfile.dev`：開發期需要同時跑 web server 和 `tailwindcss --watch` 兩個 process
	- `bin/dev` 預設會使用 foreman，本教材改用 overmind：以 `overmind start -f Procfile.dev` 啟動（或把 `bin/dev` 改為呼叫 overmind）
	- 開啟 `http://localhost:3000/` 確認頁面正常顯示
- 在 `rails new` 產生的專案目錄下，建立 `docs` 資料夾，並將本教程文件 commit 進去
	- 目的是為了方便之後開發時可以參考
- 將成品 push 到 GitHub 的 repo
- 將使用的 Ruby 版號寫進 `Gemfile`（也請確認 Rails 版號是否有標明）

#### 關於 Dependabot 的通知

GitHub 會透過 `dependabot` 自動建立 gem 版本更新的 PR。研習期間，新人通常還難以自行判斷這類 PR 該如何處理，建議和導師討論後[將其關閉](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuring-dependabot-version-updates#disabling-dependabot-version-updates)（依各團隊的政策決定）。

### 步驟4: 想像網站成品會是什麼樣子

- 開始進行設計之前，先和導師一起討論對最終成品的預想
	- 可以在紙上畫 prototype，或使用 [draw.io](https://drawio-app.com/)、[Figma](https://www.figma.com/) 等工具
	- 也和導師一起想想這個網站會以什麼形式被使用（公開在網路上？公司內部使用？）
- 請參照網站需求，開始想需要怎樣的資料結構
	- 需要哪些資料表？資料表名稱、欄位名稱、資料型態、限制（constraints）等，把建立 schema 所需的資訊都想過一遍
- 有想法之後，將資料結構以 **ER 圖**呈現
	- 請使用 [Mermaid 的 `erDiagram`](https://mermaid.js.org/syntax/entityRelationshipDiagram.html) 撰寫，直接寫在 `README.md` 中（GitHub 會自動渲染成圖）
	- 完成後在 GitHub 上發 PR 並請導師 review

※ 在這個階段，ER 圖不需要是完全正確的。以現在所能預想的範圍來規劃就好（做到後面的步驟，發現需要修改時再來調整的概念）

### 步驟5: 資料庫連接等週邊設定

- 建立新的 topic 分支
	- 之後都在 topic 分支上開發並進行 commit
- 安裝 bundler
- 在 `Gemfile` 安裝 `pg`（PostgreSQL 的 adapter）
- 設定 `database.yml`
- 以 `rails db:create` 建立資料庫
- 以 `rails db` 確認有正確連接資料庫
- 在 `README.md` 記錄包含 DB 設定在內的環境建置步驟
- 在 GitHub 上建立 PR 並請人 review
	- 必要時，請在 PR 上使用 Draft PR（或標註 WIP），詳見[開發技巧集](topics.md)
	- 收到 Comment 後就做必要的處置。收到兩個 LGTM（Looks Good To Me） 後就可以 merge 回 main

### 步驟6: 建立任務 model

開始來做管理任務所需要的 CRUD。一開始先簡單做，只要能記錄名字和任務內容即可。

- 以 `rails generate` 指令建立 CRUD 所需的 model 類別
- 撰寫 migration 並以此建立資料表
	- 非常重要：migration 要確定能安全回到上一步的狀態！請養成以 `redo` 確認的習慣
	- 別忘了設定 DB 層級的限制（constraints）
- 以 `rails c` 指令，透過 model 確認有正確連接資料庫
	- 順便試著以 ActiveRecord 方式建立任務，確認能順利建立
- 在 GitHub 上發 PR 並請人 review

### 步驟7: 新增、修改、檢視、刪除任務

- 製作任務的列表、新增、檢視以及修改頁面
	- 以 `rails generate` 指令產生 controller
		- 請和導師討論要用哪一種 template engine（ERB / Slim / Haml..etc）
	- 實做 controller 和 view 必要的部分
	- 完成新增、修改、刪除動作之後，需要在畫面上顯示 Flash 訊息
- 修改 `routes.rb`，讓 `http://localhost:3000/` 會顯示任務的列表頁面
- 存取列表頁面時，觀察瀏覽器和伺服器之間的 HTTP 往返（request / response），試著向導師說明
- 完成本步驟後，試著向導師說明你所寫的程式碼
	- 各個 class、method、變數的用途
	- 處理的流程（從 request 進來到畫面 render 出去）
- 在 GitHub 上發 PR 並請人 review

※ 之後的 PR，如果覺得過於龐大（超過15個檔案變動），就需要開始考慮分割成多個 PR

#### 關於 Rails 7 以後的刪除功能

Rails 7 起，刪除功能有兩個和以往不同的寫法要注意：

1. 刪除後 redirect 時，`redirect_to` 需要加上 `status: :see_other`
	- ※ 不加的話，redirect 會被視為刪除動作的一部分，以 DELETE method 轉向目標頁面
2. 確認對話框（confirm dialog）的寫法改為 `data: { turbo_confirm: "確定要刪除嗎？" }`

### 步驟8: 實際操作 SQL

- 直接操作資料庫
	- 以 `rails db` 指令連接資料庫
	- 以 SQL 對任務進行查詢、新增、修改、刪除
- 存取任務列表頁面，確認 log 中出現的 SQL
	- 試著向導師說明執行了哪些 SQL
- 確認 ActiveRecord 的 method 會產生什麼 SQL
	- 在 `rails c` 中執行 `find`、`where` 等 method，觀察產生的 SQL
- 試著向導師說明什麼是「SQL injection」，以及「在 Rails 中如何避免 SQL injection」

### 步驟9: 寫 E2E 測試

測試框架使用 Rails 內建的 [Minitest](https://guides.rubyonrails.org/testing.html)，不另外安裝 RSpec。

- 認識 `rails new` 產生的 `test/` 目錄結構（`test_helper.rb`、`application_system_test_case.rb` 等）
- 針對任務的功能撰寫 system test（`rails generate system_test tasks`，以 `rails test:system` 執行）
- 使用 [factory_bot_rails](https://github.com/thoughtbot/factory_bot_rails) 與 [Faker](https://github.com/faker-ruby/faker) 建立測試資料（Minitest 也能搭配 Factory Bot 使用）
	- Rails 內建的 fixtures 機制也請認識一下，理解兩者的差異
- 導入 GitHub Actions 之類的 CI 工具，每次 Push 後自動跑測試
	- 可參考 el-training 提供的 [workflow 設定範例](https://github.com/everyleaf/el-training/tree/master/github_actions/.github/workflows)
	- 太難的話可以請導師幫忙設定
- 安裝 rubocop 以統一程式風格
	- 可參考 el-training 提供的 [RuboCop 設定範例](https://github.com/everyleaf/el-training/tree/master/rubocop)
	- 建議也在 CI 上執行 rubocop

### 步驟10: 將網站中的中文部分共用化

- 利用 Rails 的 i18n 功能，將 View / Controller / Model 中的語言部份共用化
	- [rails-i18n 提供的 locale 檔](https://github.com/svenfuchs/rails-i18n/tree/master/rails/locale)和自己專案的 model locale 檔請分開管理

※ i18n 化的好處是，之後的步驟中，各種訊息的處理會輕鬆很多

### 步驟11: 設定 Rails 的時區

- 將 Rails 的時區設為台灣（台北）

### 步驟12: 任務列表以建立時間排序

- 資料預設是以 id 進行排序，請試著讓它以建立時間排序
- 完成後，撰寫此功能 system test

### 步驟13: 資料驗證

- 開始設定資料驗證
	- 請思考需要在哪個欄位上加入哪種驗證比較好
	- 以 `rails generate` 指令產生 migration file
	- 與之配合的 DB 限制，請寫成 migration
- 在頁面上加入驗證的錯誤訊息
- 撰寫對應的 model 測試
- 在 GitHub 上發 PR 並請人 review

### 步驟14: 網站佈署

目的：將 main 分支上的簡易任務管理系統推上線

- 試著將網站 deploy 到 [Render](https://render.com/) 上
	- 沒有帳號的話，請建立帳號（用公司或個人的 email 都可以）
	- 佈署方式可參考官方文件 [Deploy a Rails App](https://render.com/docs/deploy-rails)，免費方案請使用 Deploy Manually 的方式
	- 資料庫請使用 [Neon](https://neon.tech/) 或 [Supabase](https://supabase.com/) 的免費 PostgreSQL（Render 免費方案的 PostgreSQL 只能使用 30 天，不建議使用）
		- 在 Render 上以 `DATABASE_URL` 環境變數設定連線字串
		- 藉此理解 app 和資料庫分開託管、以環境變數注入設定的實務做法
- 【選項】想順便學 Docker 的人，可以改部署到 [Hugging Face Spaces](https://huggingface.co/spaces)（Docker Space）
	- 直接使用 `rails new` 產生的 `Dockerfile`，但 HF 要求 app 聽 port 7860
	- 部署方式是把程式碼 push 到 HF 提供的 git remote
	- 免費方案 48 小時沒有流量會休眠，喚醒時有冷啟動延遲
- 看一下被推上 Render 的網站
  - 接下來就會在這裡建立任務並繼續開發
  - ※ 不過，推上 Render 後，就是在網路上公開了，請注意不要放敏感資料
    - 現階段，或許可以考慮加入 basic 認證
  - 今後，每個步驟完成後，就繼續將成品推上 Render
- 將佈署的方法和網站操作寫進 `README.md`
	- 也將使用的 framework 版號等資料記下來

### 步驟15: 用 Turbo Frames 實做行內編輯（inline editing）

- 在任務列表頁為每筆任務加上編輯按鈕，按下後該列變成可編輯狀態，按下更新後直接在列表上反映結果
- 步驟7 做的編輯功能（action、頁面）維持原樣，另外使用 [Turbo Frames](https://turbo.hotwired.dev/handbook/frames) 實做行內編輯與更新
- 最後，把重複的 view 盡可能整理成 partial
- 注意：Turbo Frames 無法用來更新 `<table>` 的一部分（如 `<tr>` 以下）。因為 `<turbo-frame>` 標籤夾在 `<table>` 和 `<tr>` 之間會讓瀏覽器無法正確解析表格。如果你的列表原本是用 `<table>` 排的，可能需要重新調整標籤結構
- 提示：在此之前你可能已經把新增頁和編輯頁的表單共用化了，但這次加入的行內編輯不必預設一定要共用。先想「新功能需要什麼」寫寫看，寫完後如果發現可以共用再來整理

### 步驟16: 加入結束時間，並以時間排序

- 任務可設定結束時間
- 列表頁可以結束時間排序
- 擴充測試
- PR/review 後佈署

### 步驟17: 加入狀態，並且能夠查詢

※ 本教材為了練習，不使用 Ransack 等查詢用 gem，請從零開始手刻 Form Object。第一次接觸 Form Object 的人，請參考本步驟最後的「[給第一次接觸 Form Object 的人](#給第一次接觸-form-object-的人)」

- 在任務上加入狀態（待處理、進行中、完成）
	- 使用 ActiveRecord 的 [enum](https://api.rubyonrails.org/classes/ActiveRecord/Enum.html) 來表現與管理狀態
- 在列表頁面，要能夠以標題和狀態進行查詢
	- 查詢功能請以 Form Object 實做
- 在設定條件查詢時，請觀察 log 並確認 SQL 的變化
	- 之後的步驟也需要這麼做，請養成習慣
- 建立 search index
	- 使用 [Factory Bot](https://github.com/thoughtbot/factory_bot_rails) 和 [Faker](https://github.com/faker-ruby/faker) 準備多筆資料
	- 準備一定程度的測試資料後，觀察 log/development.log 以確認加入 index 後對速度的改善
	- 補充：index 貼在常出現於查詢條件（WHERE）、關聯（JOIN）、排序（ORDER BY）的欄位上，可以大幅改善查詢速度；但不適合貼在更新頻繁、或值的種類很少（低選擇性）的欄位上。本教材中「結束時間」是比較適合練習貼 index 的欄位
	- 【選項】使用 PostgreSQL 的 explain 等功能，檢視資料庫端的 index 使用狀況
- 針對查詢功能增加 model test（system test 也要擴充）
- 【選項】把查詢條件和排序條件的所有組合整理成表格
	- 目的是掌握應用程式中較複雜的行為

#### 給第一次接觸 Form Object 的人

Rails 的 Form Object，指的是：畫面上以表單（form）形式出現、但無法直接對應到某個 model 的資料，為它建立一個專屬的 class 並與表單連動的做法（以及這個 class 本身）。為了體會 Form Object 帶來的好處，**建議一開始先用「把查詢、排序條件直接以 params 傳給 action」的方式實做看看**。這樣寫的話，你會發現 action 裡要逐一判斷各個參數再去操作 model，程式碼變得零散、難以整理。之後再重構（refactor）成 Form Object 的寫法，就更容易理解「用 Form Object 可以把依參數而異的處理整理得乾淨俐落」這個優點。

### 步驟18: 設定優先順序，並以優先順序排序

- 在任務上加入優先順序（高、中、低）
- 列表頁可依優先順序做排序
- 擴充 system test
- PR/review 後佈署

### 步驟19: 增加分頁功能

- 使用 [Pagy gem](https://rubygems.org/gems/pagy) 在列表頁面加入分頁功能

### 步驟20: 加入設計

- 使用 TailwindCSS，為目前的作品套入設計
	- 【選項】自己寫 CSS 來設計

### 步驟21: 支援多人使用

- 建立使用者 model
- 以 seed 建立第一個使用者
- 建立使用者和任務的關聯
	- 建立關聯所需的 index
	- 要避免 N+1 問題
	- ※ 需要考慮到此步驟前的任務尚未存在使用者，此時會發生什麼情況？要如何解決？
	- ※ 推上 Render 時，已經建立過的任務，要和使用者建立關係（資料維護）
- 試著以 `rails console` 方式建立使用者，並確認使用者與任務關聯，順利建立任務

### 步驟22: 註冊/登入/登出功能

- 這裡不使用任何 Gem 提供的認證功能，請自己實做
	- 不使用 devise 等便利的 Gem，是為了讓新人能更深入了解 Rails 中 HTTP cookie 和 session 的原理
	- **也不使用 Rails 內建的 `has_secure_password`**。請直接使用 [bcrypt gem](https://github.com/bcrypt-ruby/bcrypt-ruby) 提供的 `BCrypt::Password`，自己實做密碼的雜湊儲存與驗證（相當於自己刻出一個簡化版的 `has_secure_password`）
		- 藉此理解：為什麼密碼不能存明文？為什麼要用 bcrypt 這類專門的雜湊演算法而不是 MD5/SHA-256？什麼是 salt？
		- ※ 注意：是「不用現成的封裝」，不是「自己發明雜湊演算法」。雜湊本身請交給 bcrypt
	- 完成後，試著向導師說明你的認證流程：密碼如何被雜湊與驗證、session 如何建立與銷毀
- 實做註冊的功能與頁面
- 實做登入的功能與頁面
- 未登入時，不能進入任務管理頁面
- 請改成只能看到自己建立的任務
- 實做登出功能

### 步驟23: 使用者管理頁面

- 在頁面上新增管理選單
- 管理頁面的網址 `/admin`
	- 在修改 `routes.rb` 之前，請想一下 URL 以及 routing name（會變成 `*_path` 的部分）要怎麼設計
- 實做使用者的列表、新增、修改、刪除等功能
- 刪除使用者後，也一併刪除該使用者的任務
- 在使用者列表頁面，顯示使用者的任務數量
- 能夠看到每位使用者所建立的任務列表

### 步驟24: 為使用者加入角色

- 將使用者分為管理員和一般使用者
- 請改成只有管理員可以存取使用者管理頁面
	- 若一般使用者存取管理頁面時，需提示權限不足訊息無法存取，並轉向適當頁面
- 能在使用者管理頁面新增角色
- 管理者只剩下一個人時，不能再被刪除
	- 利用 model 的 callback 實做
- ※ 可以自己決定是否要使用 Gem

### 步驟25: 為任務加入標籤

- 一個任務可以設定多個的標籤
- 能夠以標籤進行搜尋

### 步驟26: 設定錯誤頁面

- 客制化 Rails 的預設錯誤頁面
- 根據不同狀況，設定適合的錯誤頁面
	- 至少需要做 404 和 500 這兩頁

## 後記

辛苦了，恭喜你已經完成本次教材！

另外，雖然沒有包括在教程中，以下這些主題也是必要的技能，希望各位能漸漸掌握（大部分會在專案開發的過程中學習到）。

- 加深對網站應用程式的基本理解
	- HTTP 與 HTTPS
- Rails 稍微進階一點的用法
	- STI
	- logging
	- explicit transactions
	- 非同步處理
	- asset pipeline（佈署方面）
- JavaScript、CSS 等 frontend 技術
- 資料庫
	- SQL
	- query 的效能
	- index
- Server 環境
	- Linux OS (CentOS)
	- web server（nginx）的設定
	- application server（Passenger）的設定
	- PostgreSQL 的設定
- 佈署工具
  - Capistrano

## （番外篇）選修課題

有別於前述的必修課題，任務管理系統還有以下選修課題。要做到什麼程度，請和導師一起討論決定。

### 選修課題1: 任務接近或超過結束時間時，顯示提示訊息

- 在登入時提醒有接近或超過結束時間的任務
- 如果能做出已讀、未讀狀態更好

### 選修課題2: 讓使用者之間可以共享任務

- 任務可讓多個的使用者檢視或進行修改
	- 例：在新人和導師之間共享
- 顯示任務作者

### 選修課題3: 群組

- 選修課題2的延續
- 新增群組設定的功能，並增加群組內分享的功能

### 選修課題4: 附加檔案

- 讓任務可以上傳附加檔案
- 使用 Render 的話，要能夠管理上傳到 S3 bucket 的檔案
- 請使用適合的 Gem

### 選修課題5: 使用者大頭照

- 讓使用者可以設定大頭照
- 由於上傳的檔案會被當成 icon 使用，請做成 thumbnail
- 請使用適合的 Gem

### 選修課題6: 任務日曆

- 為了將結束時間視覺化，在日曆上以結束時間來顯示任務
- 可以自己決定是否要使用其它套件

### 選修課題7: 以拖曳方式排序

- 在任務列表中，加入以拖曳方式排序的功能

### 選修課題8: 標籤使用率的圖表

- 來把統計資料視覺化吧
- 圖表的形式，要簡單易懂
- 可以自己決定是否要使用其它套件

### 選修課題9: 任務到期通知信

- 任務接近結束時間時，在背景以 email 進行通知
	- 背景寄信請以 ActiveJob + [Solid Queue](https://github.com/rails/solid_queue) 實做
- 使用雲端服務來發信
	- 例如 SendGrid、MailGun 或是公司的 Postal
- 以一天一次的頻率，批次發信
	- 請使用 Solid Queue 的 [recurring tasks](https://github.com/rails/solid_queue#recurring-tasks) 設定排程，不使用 Render Scheduler 或 cron

### 選修課題10: 用 Let's Encrypt 在 VPS 上加上 SSL 憑證

- 用 Certbot 申請 letsencrypt 憑證並設定在 Nginx 上
