# Intern Engineer 上機考（AI Agent 時代版）

最後更新：2026-08-17

## 考試目的

在 LLM agent 已成為日常開發工具的前提下，本上機考不再測驗「手刻能力」，而是測驗：

1. **事前準備**：自帶開發環境、專案 template、AI 工具設定（CLAUDE.md、rules、MCP、skills）的成熟度
2. **任務拆解與指揮 agent**：prompt 品質、能驗收並修正 AI 產出而非照單全收
3. **應變力**：面對現場才公布的規格變更，如何拆解與消化
4. **成果**：3 小時內交出可 demo 的 prototype，並能解釋自己交出的每一段關鍵程式碼

## 基本規則

- Tech stack：**Rails 8+ / TailwindCSS**（資料庫、前端互動方式不限；建議 Hotwire）
- AI 工具：**自帶任何工具**（Claude Code、Cursor、Copilot 等皆可），全程可用、可上網
- **禁止真人遠端協助**（包含通訊軟體求助）
- 全程以 git 管理，**要求小步 commit**——commit 歷史是評分素材之一
- 考試開始時開啟 **VS Code Live Share** session，將 read-only guest 連結交給考官（見下方〈觀察與介入機制〉）

## 事前公告（考前 3–7 天寄給受試者）

> 上機考將以 **Rails 8 + TailwindCSS** 開發一個小型 web app，時間 3 小時。
>
> 你可以（也鼓勵）事先準備：
> - 已裝好 Ruby / Rails / PostgreSQL（或 SQLite）的開發機
> - `rails new` 好的專案 template（含 Tailwind、測試設定等）
> - 你慣用的 AI 工具與其設定（CLAUDE.md / rules / MCP / skills）
> - 請安裝 **VS Code Live Share** extension 並確認可登入（用其他編輯器者，現場改用螢幕分享）
>
> 現場才會公布題目規格。全程可使用 AI 工具與網路，但禁止真人協助。

「有備而來」是刻意設計的合法行為，準備程度列入評分。

## 現場題目

主題：**小型預約管理系統**（考官可依梯次替換同構題目：訂單、報名、借用登記等）。

### Part A — 環境啟動（0:00–0:30）

- 建立專案（`rails new` 或自帶 template）、初始化 git repo
- 專案能 boot、Tailwind 生效
- 第一個 commit

### Part B — 核心功能（0:30–2:00）

兩個 model 的 CRUD 加一條業務規則：

- `Room`（會議室）：名稱、容納人數
- `Booking`（預約）：所屬 Room、預約人姓名、起訖時間、狀態（`pending` / `confirmed` / `cancelled`）
- 業務規則（scaffold 生不出來的部分）：
  1. 同一 Room 的 `confirmed` 預約時段不可重疊
  2. 狀態流轉限制：`cancelled` 不可再變更；`pending` 可轉 `confirmed` 或 `cancelled`
  3. 列表頁可依 Room 與狀態篩選

### Part C — Figma 切版（1:40 起可並行，建議 40 分鐘）

- 依 Figma 設計稿還原其中一頁（設計稿連結：`TODO: 出題者填入 Figma 連結`，可沿用現有上機考稿或簡化版）
- 允許使用 Figma MCP、匯出截圖餵給 agent 等任何方式
- 評分重點是**還原度的驗收能力**：間距、字級、色彩、RWD 斷點是否經過受試者檢查與修正，而非 agent 一次產出就照收

### Twist — 規格變更（約 1:40 由考官口頭公布）

考官從下方題庫任選**一條**（避免題目外流失效），觀察受試者如何拆解與應變：

1. 新增「管理員」角色：只有管理員能將預約轉為 `confirmed`（簡單 session 概念即可，不要求完整認證）
2. 預約改為「人數制」：Booking 增加人數欄位，同時段 confirmed 總人數不得超過 Room 容納人數（取代原本的不可重疊規則）
3. Room 增加「維護中」狀態：維護中的 Room 不可新增預約，既有 `pending` 預約需一併轉為 `cancelled`
4. 起訖時間改為「場次制」：預約以固定場次（上午／下午／晚間）為單位，需處理既有資料的遷移思路（口頭說明即可，實作擇要）
5. 列表頁改為依日期分組顯示，並加上「今日預約」快速篩選

### Demo + Code Walkthrough（2:40–3:00）

- 受試者 demo 成果（5 分鐘）
- 考官任選 **2–3 段**（尤其是 AI 產出的）程式碼要求解釋：這段在做什麼、為什麼這樣寫、有沒有更好的做法
- 答不出自己交付的程式碼，直接反映在「程式碼理解」評分

## 時間表

| 時間 | 內容 |
|---|---|
| 0:00–0:30 | Part A 環境啟動 |
| 0:30–2:00 | Part B 核心功能 |
| 1:40 | Twist 公布（與 Part B/C 並行消化） |
| 1:40–2:40 | Part C 切版 ＋ Twist ＋ 收尾緩衝 |
| 2:40–3:00 | Demo ＋ code walkthrough |

未全部完成不代表不及格；完成度只佔評分的一部分。

## 評分 Rubric

| 面向 | 權重 | 看什麼 |
|---|---|---|
| 成果完成度 | 30% | 可 demo、功能正確、切版還原度 |
| Agent 運用 | 25% | 任務拆解、prompt 品質、驗收與修正 AI 產出、不盲信 |
| 程式碼理解 | 20% | walkthrough 能解釋關鍵段落、指出取捨 |
| 應變 | 15% | twist 的拆解速度與實作品質 |
| 事前準備 | 10% | 自帶環境／template／AI 設定的成熟度 |

## 觀察與介入機制

- 考試開始時受試者開啟 VS Code Live Share，考官以 **read-only guest** 加入；shared terminal 設為 read-only。考官可即時觀察編輯、terminal 與 agent 互動過程
- 用 Cursor 或其他不支援 Live Share 的編輯器者，改用螢幕分享（Meet / Zoom）觀察；兩種模式的觀察重點相同
- **介入時機**：受試者卡死超過約 15 分鐘，或遇到非戰之罪的環境問題時，考官可透過 Live Share 升級為可寫入協助。介入需記入評分備註——不倒扣，但受協助部分的產出權重打折

## 考官手冊

### 觀察重點（過程中記錄）

- 拿到規格後是先拆解規劃，還是直接把整段規格丟給 agent？
- agent 產出後有沒有驗收動作（跑起來看、讀 diff、寫或跑測試）？
- 發現 agent 產出錯誤時，是修 prompt 重來、手動修，還是沒發現？
- Twist 公布後的第一反應：重新排優先序，還是慌張硬做？
- commit 訊息與粒度是否反映工作節奏

### Walkthrough 提問範例

- 「時段重疊的檢查是在哪一層做的？為什麼？併發下有沒有漏洞？」
- 「這段 validation / scope 是 AI 寫的嗎？它少考慮了什麼情境？」
- 「如果資料量變大，這個篩選查詢會有什麼問題？」
- 「切版這頁和設計稿有哪些差異是你知道但決定先放掉的？」

### 常見不及格訊號

- 全程照收 AI 產出、demo 時無法解釋自己的程式碼
- 卡在環境問題超過 1 小時（事前準備不足）
- Twist 後完全無法調整計畫

---

本文件供 5xRuby 內部面試使用。
