# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 這是什麼

這**不是程式碼專案**，是五倍紅寶石的內部教育訓練教材（純 Markdown 文件），改編自日本株式会社万葉的 el-training（`~/ghq/github.com/everyleaf/el-training` 有原版可對照）。沒有 build、test、lint 指令可執行。

## 結構

- `README.md` — 教程總覽與角色定義（mentee／mentor）
- `backend.md` — 後端 & DevOps 教程（主要教材，26 個必修步驟＋選修課題）：以 Rails 8.2+／Ruby 4.0+／PostgreSQL 最新穩定版開發任務管理系統（測試用 Minitest、Ruby 以 mise 安裝）
- `topics.md` — 開發技巧集（Git／GitHub／Rails 開發環境），譯自 el-training
- `design.md` — 設計教程：Sketch 設計稿 + Rails/Bootstrap 切版

## backend.md 的技術棧要點

- 前端：TailwindCSS v4 + Hotwire（含 Turbo Frames 行內編輯步驟）、View Component + Lookbook
- 開發環境以 Overmind（非 foreman）跑 `Procfile.dev`
- 背景工作：ActiveJob + Solid Queue
- 部署主線：Render 免費 web service + Neon/Supabase 免費 PostgreSQL；選項為 Hugging Face Spaces（Docker）
- 手刻原則：禁用 AASM、acts_as_tag；查詢功能手刻 Form Object（不用 Ransack）；認證完全手刻（不用 Devise，也不用 `has_secure_password`，直接用 bcrypt gem）

## 編輯注意

- 全部內容為繁體中文（台灣），修改時維持一致語言與用詞
- 教材描述的技術需求是給受訓者的規格，更新時需保持文件內部一致（backend.md 開頭有更新日期標記，修改時記得更新）
- 授權為 CC BY-NC-SA 4.0
