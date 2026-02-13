# 🚀 Learn Playwright Automation – From Basics

This repository contains my hands-on learning journey with **Playwright Automation using JavaScript/TypeScript**.
It covers foundational concepts, real test implementations, and CI integration using GitHub Actions.

The goal of this project is to build strong automation fundamentals and understand how modern end-to-end testing works in real-world environments.

---

## 📌 What This Repository Covers

* ✅ Playwright installation & project setup
* ✅ Writing basic UI tests
* ✅ Locators and selectors
* ✅ Assertions & validations
* ✅ Page Object Model (POM) structure
* ✅ Handling waits and synchronization
* ✅ Running tests in headed & headless mode
* ✅ GitHub Actions CI integration
* ✅ Test reports & artifacts

---

## 🛠 Tech Stack

* **Playwright**
* **JavaScript / TypeScript**
* **Node.js**
* **GitHub Actions (CI/CD)**

---

## 📂 Project Structure

```
├── tests/                 # Test specifications
├── pages/                 # Page Object Models (if implemented)
├── playwright.config.js   # Playwright configuration
├── package.json
└── .github/workflows/     # GitHub Actions CI workflow
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Install Playwright Browsers

```bash
npx playwright install
```

---

## ▶️ Running Tests

### Run all tests

```bash
npx playwright test
```

### Run in headed mode

```bash
npx playwright test --headed
```

### Run specific test file

```bash
npx playwright test tests/example.spec.js
```

### Show HTML report

```bash
npx playwright show-report
```

---

## 🤖 CI Integration

This project uses **GitHub Actions** to automatically:

* Install dependencies
* Install Playwright browsers
* Run tests on every push / pull request
* Upload test reports as artifacts

Workflow file location:

```
.github/workflows/playwright.yml
```

---

## 🧠 Key Learning Objectives

* Understand end-to-end automation fundamentals
* Write stable and maintainable test scripts
* Handle real-world automation challenges
* Implement CI/CD for automated testing
* Follow industry best practices

---

## 📈 Future Enhancements

* API testing with Playwright
* Parallel execution optimization
* Cross-browser testing
* Docker integration
* Advanced reporting
* Environment-based configuration (.env setup)

---

## 🎯 Purpose

This repository is part of my structured learning process to build strong expertise in automation testing and modern QA engineering practices.

---

## 📬 Contributions

This is a personal learning repository, but suggestions and improvements are welcome.
