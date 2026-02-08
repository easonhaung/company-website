# Git 設定指南 - 讓專案可以在多台電腦工作

## 步驟一：安裝 Git（如果還沒裝）

1. **下載 Git for Windows**  
   前往：https://git-scm.com/download/win  
   下載並安裝（全部用預設選項即可）

2. **確認安裝成功**  
   開啟 PowerShell 或 CMD，執行：
   ```powershell
   git --version
   ```
   應該會顯示版本號（例如：`git version 2.xx.x`）

---

## 步驟二：初始化 Git（在這台電腦）

在專案資料夾 `c:\Users\eason\company-website` 開啟 PowerShell，依序執行：

```powershell
# 1. 初始化 Git
git init

# 2. 設定你的名字和 email（第一次用 Git 才需要）
git config user.name "你的名字"
git config user.email "你的email@gmail.com"

# 3. 加入所有檔案
git add .

# 4. 建立第一個 commit
git commit -m "Initial commit: EZeeTech company website"
```

---

## 步驟三：建立 GitHub 遠端倉庫（選一個方法）

### 方法 A：用 GitHub 網頁建立（最簡單）

1. **登入 GitHub**  
   前往 https://github.com，登入（沒有帳號就註冊一個）

2. **建立新倉庫**  
   - 點右上角 `+` → `New repository`
   - Repository name：`company-website`（或你喜歡的名字）
   - 選擇 **Private**（私人）或 **Public**（公開）
   - **不要**勾選「Initialize this repository with a README」
   - 點 `Create repository`

3. **複製倉庫網址**  
   建立後會看到一個網址，例如：  
   `https://github.com/你的帳號/company-website.git`  
   複製這個網址

4. **連到遠端並推送**  
   回到 PowerShell，執行：
   ```powershell
   git remote add origin https://github.com/你的帳號/company-website.git
   git branch -M main
   git push -u origin main
   ```
   會要求輸入 GitHub 帳號密碼（或 Personal Access Token）

---

### 方法 B：用 GitHub Desktop（圖形介面，更簡單）

1. **下載 GitHub Desktop**  
   https://desktop.github.com/

2. **安裝並登入 GitHub 帳號**

3. **在 GitHub Desktop 中**  
   - `File` → `Add Local Repository`
   - 選擇 `c:\Users\eason\company-website`
   - 點 `Publish repository` → 輸入名稱 → `Publish`

---

## 步驟四：在新電腦繼續工作

### 在新電腦上：

1. **安裝 Node.js**（如果還沒裝）  
   https://nodejs.org/ 下載 LTS 版

2. **安裝 Git**（如果還沒裝）  
   同步驟一

3. **安裝 Cursor**（或 VS Code）  
   https://cursor.com/

4. **克隆專案**  
   開啟 PowerShell，執行：
   ```powershell
   git clone https://github.com/你的帳號/company-website.git
   cd company-website
   ```

5. **安裝依賴並啟動**  
   ```powershell
   npm install
   npm run dev
   ```

---

## 之後在兩台電腦之間切換工作

### 在 A 電腦改完程式後：

```powershell
cd c:\Users\eason\company-website
git add .
git commit -m "說明你改了什麼"
git push
```

### 在 B 電腦開始工作前：

```powershell
cd c:\Users\eason\company-website
git pull
```

然後繼續編輯，改完再 `git add .` → `git commit` → `git push`。

---

## 常見問題

**Q: 推送時要求輸入密碼？**  
A: GitHub 現在要用 Personal Access Token 代替密碼：
- 到 GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
- Generate new token → 勾選 `repo` → Generate
- 複製 token，推送時密碼欄位貼上這個 token

**Q: 不想用 GitHub？**  
A: 可以用 GitLab (https://gitlab.com) 或 Bitbucket，步驟類似。

**Q: 只想用本機，不用遠端？**  
A: 可以只做「步驟二」，但這樣新電腦要用 USB 或雲端同步才能拿到專案。

---

完成後，你的專案就會有版本控制，可以在任何電腦繼續開發！
