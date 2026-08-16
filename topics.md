# 開發技巧集

本文件整理了一些沒有納入教材特定步驟、但希望大家知道的實用主題（譯自 [el-training 的 topics.md](https://github.com/everyleaf/el-training/blob/master/docs/topics.md)，並依本教材調整）。研習過程中請視需要隨時參考。

## Git 相關

Git 的詳細解說請參考官方書籍：

https://git-scm.com/book/zh-tw/

以下主題是針對常見使用情境的補充。

### 關於 Git 的 hash 值

Git 會為每個 commit 附上一個（幾乎）唯一的 hash 值，執行 `git log` 就可以看到：

```
commit a1d859d085125016938a1c25862474a15973d740 (HEAD -> add_tips)
Author: ...
Date:   ...

xxxx
```

`a1d859d...` 就是 hash 值。以下是幾個常見用途：

- 確認本機的 commit 狀態和 GitHub 上工作分支的 commit 狀態是否一致
- 想借用其它分支的某個 commit 時，用 `git cherry-pick <hash>` 把特定 commit 拿到目前分支
- 想回到特定 commit 的狀態時，用 `git checkout <hash>`

### 發 PR 前，先把 main 分支的最新狀態納入

發 Pull Request（PR）之前，一般會先把 PR 目標分支（本教材中是 main）的最新狀態反映到自己的工作分支上。

在你開發的期間，別的分支被 merge 進 main 是常有的事。如果不先把這些變更納入，可能會發生程式碼衝突、或彼此影響導致應用程式行為異常。

研習過程中也會發生「等待 review 時先在別的分支繼續開發」的情況，同樣可能遇到這個問題，請養成把 main 最新狀態納入工作分支的習慣。

納入變更可以用 `git rebase` 或 `git merge`。以 `git rebase` 為例：

```sh
$ git fetch origin
$ git rebase origin/main # ※ 程式碼有衝突的話會發生 conflict
```

### 用 git rebase -i 整理 commit

開發過程中，常會因為各種原因，在功能做到一半時就得先 commit；或是 commit 之後才發現小錯誤又補修一筆。

這樣一來 commit 記錄會變得零碎、難以追蹤。把 commit 整理成有意義的單位，可以讓歷史更好讀、更方便 cherry-pick、也更容易 review，請養成發 PR 前先整理 commit 的習慣。整理 commit 使用 `git rebase -i`。

`git rebase -i` 可以調換 commit 的順序，也可以把多個 commit 合併成一個（squash）。例如有以下的 commit 記錄：

- 實做功能 A 的 commit -- (1)
- 實做功能 B 的 commit -- (2)
- 修正功能 A 小錯誤的 commit -- (3)

用 `git rebase -i` 調換順序：

- 實做功能 A 的 commit -- (1)
- 修正功能 A 小錯誤的 commit -- (3)
- 實做功能 B 的 commit -- (2)

再把相關的 commit 合併：

- 實做功能 A 的 commit -- (1, 3)
- 實做功能 B 的 commit -- (2)

### 好用的 Git GUI 工具

Git 官方網站整理了一些不用直接下指令的 GUI 工具，可以試試看：

https://git-scm.com/download/gui/mac

## GitHub 相關

### 以 WIP（Draft）狀態建立 Pull Request

PR 在尚未完成時就可以先建立。GitHub 可以將這種未完成的 PR 建立為 Draft PR（免費方案的 public repo 也可以使用；無法使用 Draft 的情況，可以在 PR 標題加上 `[WIP]` 來運作。WIP = Work in Progress）。

以 WIP（Draft）發 PR 有以下好處：

- 可以讓其他開發者看到進度
- 讓程式碼早點出現在其他開發者眼前，可以及早發現認知落差或實作上的問題
- 可以邊看著 WIP（Draft）的 PR 邊討論開發方向

實際工作中也很常用，研習時請實際練習以 WIP（Draft）發 PR。

功能完成、要轉為正式 PR 時：WIP 的話把 `[WIP]` 從標題移除，Draft 的話按下 Ready for review 按鈕。

### 關於 Pull Request 的粒度

把 PR 保持在適當的粒度，對於 code review 和專案管理的效率都很重要。請注意以下兩點：

- **聚焦在單一目的**：PR 聚焦在單一目的，reviewer 才容易掌握這個變更帶來的影響
- **保持容易 review 的大小**：PR 的 diff 太大會提高 review 難度，容易發生遺漏或疏失

這兩點都是為了讓 PR 的修改內容容易被理解。不只是 review 時，例如發生 bug 時要追蹤過去的變更、找出原因，適當的 PR 粒度也會很有幫助。

例如遇到以下情境時，請考慮像最後一步那樣分割 PR：

1. 為了新增某個功能而開發並建立了 PR
2. 想順手修正程式碼格式，所以跑了 RuboCop 的自動修正
3. RuboCop 的自動修正波及到與原本功能無關的檔案，PR 的 diff 變得很大
4. 格式修正只保留功能開發有碰到的範圍，其餘的修正另開一個專門處理格式的 PR

## Rails 開發環境相關

### 使用 rails console

Rails 內建了名為 `rails console` 的互動式執行環境（REPL）。相當於 Ruby 的 irb，但 `rails console` 會載入 Rails 環境後執行，所以用 Rails 開發時主要使用它。

常見用途是確認實做好的功能。例如在 model 加了 method 之後，用 `rails console` 確認通常比開瀏覽器確認更有效率。

在 Rails 專案目錄下這樣啟動：

```sh
$ rails c
```

### 使用 debug gem

使用 debug 這個 gem，可以在應用程式執行中的任意位置打開互動式執行環境（REPL），查看當下變數的狀態或執行結果，也可以做遠端除錯。

官方文件：https://github.com/ruby/debug/blob/master/README.md

#### 在 Rails 中的安裝方式

在 Gemfile 加入以下內容（只在開發時使用，所以只裝在 development 和 test 環境）：

```ruby
group :development, :test do
  gem 'debug'
end
```

執行 `bundle install` 之後就可以使用。

#### 使用範例

1. 在想除錯的檔案中載入 debug：
```ruby
require 'debug'
```
2. 在想確認狀態的地方寫上 `binding.break`：
```ruby
def parse(str)
  binding.break
  str.split(',')
end
```

執行應用程式時，處理一到達 `binding.break` 的位置就會啟動 REPL，可以查看已宣告變數的內容、執行 method 等。

### 查看本機上 Gem 的原始碼

開發中常會需要了解應用程式所使用的 Gem 的詳細行為。這時候常見的做法是直接看安裝在自己機器上的 Gem 原始碼，或在 Gem 裡面寫 `binding.break` 來觀察詳細的資料流。另外，閱讀 Gem 的程式碼作為參考，對磨練 coding 能力也很有幫助。

bundler 提供了幾個方便操作 Gemfile 所管理 Gem 的指令。

#### bundle show

`bundle show` 可以取得 Gem 安裝的路徑：

```sh
$ bundle show rails
/Users/you/.rbenv/versions/3.3.0/lib/ruby/gems/3.3.0/gems/rails-7.1.3
```

#### bundle open

`bundle open` 可以用指定的編輯器打開 Gem，編輯器以環境變數 `BUNDLER_EDITOR` 指定：

```sh
$ export BUNDLER_EDITOR=code
$ bundle open rails
```

接著就可以細讀想了解的程式碼，或加入 `binding.break` 等除錯碼來觀察詳細行為。

#### gem pristine

在 Gem 內部加了除錯碼之後，常會忘記改回來。這時候用 `gem pristine` 可以把 Gem 還原成剛安裝時的狀態：

```sh
$ gem pristine rails
```

想還原所有 Gem 的話：

```sh
$ gem pristine --all
```

用 `bundle pristine` 則可以還原 Gemfile 內的所有 Gem：

```sh
$ bundle pristine
```
