# 🧪 Parabank Automation with Playwright

This project automates functional testing for the [Parabank demo application](https://parabank.parasoft.com/) using **Playwright**.  
It was created as part of my learning journey to move from **manual QA** to **automation** and to gain hands-on experience with **CI/CD pipelines** using **GitHub Actions**.

---

## 🚀 Project Overview

- **Framework:** [Playwright](https://playwright.dev/)  
- **Language:** JavaScript / TypeScript *(update based on what you’re using)*  
- **CI/CD:** GitHub Actions  
- **Purpose:** Learn and demonstrate automated UI testing and integration into a CI workflow.

---

## 🧰 Features

- End-to-end tests for Parabank web flows (e.g., login, account overview, transfers)  
- Cross-browser testing (Chromium, Firefox, WebKit)  
- Headless and headed execution modes  
- Automatic test execution on every push or pull request via GitHub Actions  

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/IZ-KS/parabank-automation-playwright.git
cd parabank-automation-playwright
```

### 2. Clone the repository
```bash
npm install
```

### 3. Run tests locally
```bash
npx playwright test
```

### 4. View test report
```bash
npx playwright show-report
```

##  🔁 Continuous Integration (GitHub Actions)

This project uses GitHub Actions to automatically:

- *Install dependencies*

- *Run Playwright tests*

- *Generate reports on each commit or pull request*

You can view the workflow file here:
.github/workflows/playwright.yml
