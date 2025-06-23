# Expense Tracker

A small, personal Vue 3 finance tracker built for fun and practice.

- **Add** income & expense transactions  
- **See** current balance, total income, and total expenses  
- **Switch** between € and $ (using live exchange rates)  
- **Persist** data in browser storage so it stays after reloads  
- **Deploy** easily to GitHub Pages

---

## 🛠 Local Setup

1. **Clone** this repo and enter it:
  ```
  bash
  git clone https://github.com/<your-username>/expense-tracker.git
  cd expense-tracker
  ```


## Install dependencies:
``` npm install ```

## Configure your API key:
Rename the **.env.example** from the project root to **.env**.

Edit .env and set:

VITE_API_KEY=your_exchange_rate_api_key
(You can get one for free at the ExchangeRate-API website.)

## Run the development server:
``` npm run dev ```

Then open http://localhost:3000 in your browser.

## 📦 Build & Deploy
Make sure vite.config.js has the correct base:
```
export default defineConfig({
  base: '/expense-tracker/',
  // ...
})
```

## Run the deploy command:
``` npm run deploy ```

That builds the app and pushes the dist/ folder to the gh-pages branch.
Your live site will be at
https://<your-username>.github.io/expense-tracker/

## ✅ Tests
Unit tests have been performed with Vitest & Vue Test Utils. 

To run them:
``` npm run test ```

## 📝 Notes
All transactions are stored internally in € and only converted at display time.
LocalStorage is used so data survives reloads, but it’s just a simple demo — there’s no backend.
Feel free to fork, tweak, or just read through how it works!

This project is licensed under the MIT License. See [LICENSE] for details.
Built by Damianos Mav Feel free to ⭐ the repo if you find it useful.

