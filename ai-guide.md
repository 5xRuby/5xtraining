# AI 輔助學習與開發指引

本文件說明在進行[後端 & DevOps 教程](backend.md)時，如何使用 coding agent（Claude Code、Gemini CLI、Copilot 等）、LLM chat 與 NotebookLM。工具不限定廠牌，用你手上有的。

本教程有很多地方刻意要求「手刻」——不用 Devise、不用 Ransack、自己實做認證。這不是守舊，而是這些步驟的**學習價值就在於自己寫過一次**。把這些步驟丟給 AI 生成，程式碼會動，但你什麼也沒學到，而這正是研習的唯一目的。

反過來說，環境設定、log 解讀、佈署除錯這些「知道就好、不知道很浪費時間」的部分，請盡量用 AI，把時間留給真正要學的東西。

---

## 1. 大原則

### 一句話規則

> **你要能對導師口頭解釋你交出的每一行程式碼。**

做不到，就是還沒學會——不管那行是誰寫的。教程中好幾個步驟（步驟 8、22 等）本來就明文要求「試著向導師說明」，這條規則只是把它擴大到全部。

### 三種使用情境

| | 情境 | 內容 |
|---|---|---|
| 🟢 | **代勞** | 環境設定與指令、錯誤訊息解讀、log 解讀、rubocop 修正、commit message、PR 描述、CI 設定、佈署設定、測試資料（Faker/Factory Bot） |
| 🟡 | **陪練** | 自己先寫完，再請 AI review、解釋自己的寫法和慣例寫法的差異、針對這段程式碼出題考自己 |
| 🔴 | **禁區** | 教材要求手刻的部分：步驟 8 的 SQL、步驟 17 的 Form Object、步驟 22 的認證。可以問觀念，不可以要程式碼 |

禁區的界線很簡單：**問「這是什麼、為什麼」可以，問「幫我寫」不行。** 你可以問 AI「什麼是 salt、為什麼密碼不能用 SHA-256 存」，但不能問「幫我用 bcrypt 寫一個登入功能」。

### 反模式

- **接受看不懂的 diff。** 只要有一行你說不出它在幹嘛，就不要 commit。回去問到懂為止，或直接自己重寫。
- **憑 AI 記憶用 gem。** LLM 的訓練資料通常落後好幾個版本，本教程用的 Rails 8.2 / Ruby 4.0 又特別新。API 一律照下一節的優先序查證。
- **一次讓 AI 做完一整個步驟。** 步驟拆得夠小是有原因的，PR 也有 15 個檔案的上限。
- **卡住三十秒就問 AI。** 先自己想、自己讀 log、自己讀官方文件，想不出來再問。你在職場上的價值是「能解決沒人解過的問題」，那是練出來的。

---

## 2. 工具設定（一次性）

### 用哪個 agent 都可以

本教程不指定 coding agent。Claude Code、Gemini CLI、GitHub Copilot、opencode、Cursor 等都行，用你手上有的、付得起的。下面講的東西刻意挑跨工具通用的做法，只有少數幾項是某個工具專屬，會另外標註。

### `AGENTS.md`：專案規範的共同基準

在專案根目錄放一份 [`AGENTS.md`](https://agents.md/)，寫下這個專案的規範。這是目前多數 agent 都會自動讀取的格式，換工具不用重寫。內容至少包含：

- 版本與工具鏈：Ruby 4.0 / Rails 8.2 / PostgreSQL、以 mise 安裝、用 Overmind 跑 `Procfile.dev`
- 測試用 Minitest，不要裝 RSpec
- **禁止事項**：不准引入 Devise、Ransack、AASM 等；認證與查詢功能必須手刻
- commit 前對變更的 Ruby 檔案跑 `rubocop -A`

把禁區明寫進去，agent 就不會「好心」幫你裝 gem 把課題做掉。

工具專屬的設定檔（Claude Code 的 `CLAUDE.md`、Gemini CLI 的 `GEMINI.md` 等）如果需要，做成指向 `AGENTS.md` 的 symlink 就好，不要維護兩份：

```bash
ln -s AGENTS.md CLAUDE.md
```

### 把重複流程包起來（選項）

各家 agent 都有自訂指令／流程的機制（Claude Code 的 skill、Gemini CLI 與 Copilot 的 custom command、opencode 的 command）。名稱不同，概念一樣：把一段你會重複交代的流程寫成檔案，之後一句話叫用。

建議自己寫一個當練習，例如把「跑測試 → rubocop → 開 PR」的流程包起來。這也順便讓你理解 agent 到底是怎麼被指揮的。

### 查文件的優先序

遇到不確定的 API，照這個順序查，**不要憑記憶寫**：

1. **`ri`** — 查本機實際安裝版本的文件，跟你專案跑的版本一致，最可信。指令列直接用 `ri String#gsub`、`ri ActiveRecord::Base`（gem 的文件需要 `gem rdoc` 產生過）。在 `AGENTS.md` 裡寫明「查 API 請用 `ri`，不要憑記憶」，任何 agent 都能照做。
   - Claude Code 使用者可裝 [claude-ruby-plugin](https://github.com/elct9620/claude-ruby-plugin)，提供 `/info` 指令與 `ruby:ri` skill 把這件事包好。
2. **[`agent-context`](https://github.com/ioquatix/agent-context) gem** — 執行 `bake agent:context:install` 會把各 gem 自帶的 `context/` 文件安裝到專案的 `.context/`，並更新 `AGENTS.md` 加上索引。agent 之後就直接讀專案內的文件，不需要連外。`.context/` 和 `AGENTS.md` 都要 commit 進版控，CI 上的 agent 才讀得到。
3. **context7 MCP server** — 前兩者沒有時（gem 沒附 context、也沒裝 RDoc 文件）的備援。注意它給的是**上游最新版**，未必等於你裝的版本。MCP 是跨工具的協定，Claude Code、Gemini CLI、Copilot、opencode 都能接。
4. **官方網站 / GitHub README** — 最終依據。前面三者有疑義時以此為準。

### 其他 MCP server

MCP（Model Context Protocol）是給 agent 接外部工具的標準協定，各家 agent 通用，設定檔格式略有差異但 server 本身可共用。

- **chrome-devtools**：讓 agent 直接看你的頁面、讀 console 與 network。做步驟 15 的 Turbo Frames、步驟 20 的設計時很有用。
- MCP server 不是裝越多越好。裝一堆用不到的，只會佔掉 context、讓 agent 變慢變笨。

### GitHub CLI（`gh`）

搭配步驟 2 之後的 Git/GitHub 流程使用：

```bash
gh repo create 5xtraining-yourname --private   # 步驟 2
gh pr create --fill                            # 步驟 5 之後每個步驟
gh pr view --comments                          # 看 review 意見
gh run watch                                   # 步驟 9 之後盯 CI
gh run view --log-failed                       # CI 掛掉時直接抓失敗的 log
```

`gh run view --log-failed` 的輸出可以直接丟給 agent 問「為什麼掛」——這是 🟢 代勞的典型場景。

---

## 3. 用 NotebookLM 學

NotebookLM 是「只根據你餵的來源回答」的工具。它的答案會附上出處引用，比一般 chat 不容易亂編，適合拿來讀官方文件。

### 一個主題一本

不要開一本大雜燴。理由：

1. Audio Overview（podcast）、study guide、心智圖這些產出是**整本層級**的。一本混了 Rails、SQL、Hotwire 的 notebook，生出來的 podcast 東拉西扯，聽了學不到東西。
2. 問答是對**全部來源**做檢索，來源越雜越容易引到不相干的段落——例如問 session，結果被 Turbo 文件裡的 session 字樣干擾。
3. 免費版每本有來源數上限，一本一主題才塞得下該主題的完整文件。

反過來說，跨主題整合的問題（「認證跟 Turbo Frame 一起用會怎樣」）本來就不是 NotebookLM 的強項，那種問題請問 LLM chat 或導師。

### 建議建立的 notebook

| Notebook | 來源 | 對應步驟 |
|---|---|---|
| Rails 基礎 | Rails Guides 的 Getting Started、Routing、Action Controller、Action View | 3–7 |
| ActiveRecord & SQL | Active Record Basics / Query Interface / Migrations、PostgreSQL 官方文件的 index 與 EXPLAIN 章節 | 6、8、17 |
| 測試 | Rails Guides Testing、Minitest、factory_bot 與 Faker 的 README | 9 之後 |
| Hotwire | Turbo Handbook、Stimulus Handbook | 15 |
| 認證與 HTTP | MDN 的 HTTP cookies、Rails Guides Security、bcrypt-ruby README | 21–24 |

### 用法

- **Audio Overview**：通勤時聽。適合「還沒讀過、先建立輪廓」的階段。
- **提問**：讀文件讀到不懂的段落，直接問 notebook，答案會指回原文哪一段。
- **Study guide / 時間軸**：做完一個階段後生成，當作自我檢核清單。
- 把 [backend.md](backend.md) 本身也加進來當來源，可以直接問「這個步驟要我做什麼」。

---

## 4. 用 LLM chat 學

### 三個提問模板

**1. 概念澄清**
> 用一個比喻解釋 Rails 的 session 是什麼，然後給我一個「這個比喻不成立」的反例。

要求反例很重要——它會逼模型講出比喻的邊界，你也順便學到邊界在哪。

**2. 費曼檢驗**
> 以下是我對 CSRF token 的理解：⋯⋯。請指出哪裡是錯的、哪裡是對但不完整的，不要重寫一份正確版本給我。

這是最有效的一種。先自己寫過一次理解，再讓它挑錯。

**3. 出題**
> 針對 ActiveRecord 的 N+1 問題，出 5 題會考倒我的問題。先不要給答案，我回答完再批改。

做完每個步驟都可以用這招自我檢核，也是準備「向導師說明」的好方法。

### 兩條規則

- 在 prompt 裡明講：**「不要給我完整程式碼，只給方向和關鍵字」**。禁區步驟一定要加這句。
- **版本要覆核。** 模型很可能給你 Rails 6 的寫法。任何 API 一律用第 2 節的優先序查證。

---

## 5. 各步驟的使用方式

以下依 [backend.md](backend.md) 的步驟分組。每組列出重點與 AI 的可／不可。

### A. 環境與專案起手（步驟 1–5）

- 🟢 mise 裝 Ruby、PostgreSQL、Overmind、`rails new` 的參數選擇，全部可以讓 AI 帶著做。
- 但每下一個指令，要能複述它做了什麼。安裝過程若卡住，把錯誤訊息完整貼給 AI——這是 AI 最強的場景。
- 步驟 2、5 的 Git/GitHub 流程用 `gh` 處理。分支命名、PR 標題可以請 AI 建議，但 PR 內容要自己寫，因為那是你要跟導師溝通的東西。
- 步驟 4「想像網站成品」和 ER 圖：可以請 AI 當討論對象丟想法，但**不要讓它幫你決定 schema**，那是步驟 6 要跟導師討論的重點。

### B. Model 與 CRUD（步驟 6–7）

- 🔴 controller 與 view 至少自己完整寫過一次，包含 `rails generate` 產生了什麼、each 檔案的用途。
- 寫完之後 🟡：請 AI review，問「Rails 的慣例寫法跟我這樣寫差在哪、為什麼」。
- NotebookLM 用「Rails 基礎」那本，重點讀 Routing 與 Action Controller。
- 提問範例：「strong parameters 如果不寫會怎樣？請給我一個具體的攻擊情境。」

### C. SQL 與測試（步驟 8–9）

**步驟 8（SQL）是本教程最重要的禁區之一。**

- 🔴 `rails db` 裡的每一句 SQL 自己手打，不准請 AI 產生。打錯是正常的，錯誤訊息就是在教你語法。
- 🟢 可以做的：把 log 裡的 SQL 貼給 AI 問「這句在幹嘛」、把 `EXPLAIN` 的輸出貼給 AI 問「怎麼讀」。
- 教材要求你向導師說明 SQL injection。用第 4 節的「出題」模板先自己考自己：「針對 SQL injection 在 Rails 中的防護，出 5 題考我」。
- 步驟 9 測試：可以讓 agent 產生測試檔案骨架，但**「要斷言什麼」必須自己想**——想不出來測什麼，代表你不清楚這個功能的規格。
- 🟢 GitHub Actions 的 workflow YAML、rubocop 設定，讓 AI 寫。這是設定檔不是程式邏輯。CI 掛掉時 `gh run view --log-failed` 貼給它。

### D. 上線前打磨（步驟 10–13）

- i18n 的 locale 檔案翻譯、`config.time_zone` 設定：🟢 代勞比重可以拉高。
- 但兩件事要能解釋：**時區是存什麼、顯示什麼**（DB 存 UTC、顯示轉當地），以及**你設的每條 validation 為什麼需要**。步驟 13 的 validation 是規格決策，不是 AI 猜的。

### E. 佈署（步驟 14）

- 🟢 這是 AI 投報率最高的一步。Render / Neon 的設定、環境變數、`DATABASE_URL`、build command，全部可以問。
- 唯一要求：**佈署失敗時，先自己讀完 log 再問。** 讀不懂哪一段，貼那一段問。不要整份 log 丟過去說「幫我修」——你會失去這一步最值錢的技能。

### F. 功能擴充（步驟 15–20）

- 步驟 15 Turbo Frames：🟡 概念（frame 怎麼決定要換哪一塊 DOM）先問清楚，程式碼自己寫。chrome-devtools MCP 對除錯很有幫助。
- **步驟 17 是最大的禁區。** 教材明文要求手刻 Form Object，而且要求你「先用 params 直接傳的爛寫法做一次，再重構」。這個「先寫爛的再重構」的過程就是學習本身，AI 一步到位反而毀掉它。
  - 🟢 可以問：「什麼是 Form Object、解決什麼問題」「index 為什麼能加速查詢、什麼欄位不適合加」。
  - 🔴 不可以問：「幫我寫一個查詢用的 Form Object」。
  - 觀察 index 效果時，Faker 的假資料產生腳本 🟢 可以請 AI 寫。
- 步驟 18–19（優先順序、分頁）：🟡 一般難度，自己寫完請 AI review。
- 步驟 20 設計：🟢 TailwindCSS 的 class 組合、View Component 的拆法可以大量借助 AI，但版面要長怎樣是你的決定。

### G. 多人與權限（步驟 21–26）

- **步驟 22 認證是最嚴格的禁區。** 教材連 `has_secure_password` 都不准用，就是要你自己接 bcrypt。
  - 🟢 可以問（而且應該問）：「為什麼密碼不能存明文」「為什麼不能用 MD5/SHA-256」「salt 是什麼、防的是哪種攻擊」「cookie 和 session 的關係」。這些用 NotebookLM 的「認證與 HTTP」那本問，有出處更可靠。
  - 🔴 不可以問：任何形式的登入／註冊實做程式碼，包含「幫我看看這樣寫對不對」時順手貼給你的完整版本。
  - 完成後用「出題」模板考自己一輪，再去向導師說明。
- 步驟 23–26（管理頁面、角色、標籤、錯誤頁面）：🟡 回到一般難度。步驟 24「不能刪掉最後一個管理員」這種規則，自己想清楚要在哪一層擋（validation？callback？）再動手。

---

## 6. 給導師

- Code review 時問兩個問題：「這段為什麼這樣寫？」「不這樣寫會怎樣？」答不出來就退回。
- 要求 PR 描述中自述：**哪些部分用了 AI、用在哪、為什麼**。這不是為了抓人，是讓新人自己意識到界線在哪。
- 禁區步驟（8、17、22）建議安排口頭說明的時間，教材本來就有這個要求。
- 發現無法解釋的程式碼，退回重做該步驟——不是重寫，是重做。
