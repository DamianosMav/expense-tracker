<script setup>
import Header from "./Header.vue";
import Balance from "./Balance.vue";
import IncomeExpenses from "./IncomeExpenses.vue";
import TransactionList from "./TransactionList.vue";
import AddTransaction from "./AddTransaction.vue";

import { useToast } from "vue-toastification";
import { ref, computed, onMounted } from "vue";

const apiKey = import.meta.env.VITE_API_KEY;

const toast = useToast();

const transactions = ref([]); 
const rates = ref({ usdToEur: 1, eurToUsd: 1 });

const currencySymbol = ref("€");

// Fetch exchange rates once on mount
async function fetchExchangeRates() {
  const eurURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
  try {
    const res = await fetch(eurURL);
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    const data = await res.json();

    const usdToEur = data.conversion_rates.EUR;
    const eurToUsd = 1 / usdToEur;

    return { usdToEur, eurToUsd };
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}

onMounted(async () => {
  // Load transactions from localStorage (stored always in EUR)
  const saved = localStorage.getItem("transactions");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      transactions.value = Array.isArray(parsed) ? parsed : [];
    } catch {
      transactions.value = [];
    }
  }

  // Load cached rates or fetch new rates
  const cachedRates = JSON.parse(localStorage.getItem("exchangeRates"));
  const now = Date.now();

  if (cachedRates && now - cachedRates.timestamp < 3600000) {
    rates.value = cachedRates.data;
  } else {
    try {
      const fetchedRates = await fetchExchangeRates();
      localStorage.setItem(
        "exchangeRates",
        JSON.stringify({ timestamp: now, data: fetchedRates })
      );
      rates.value = fetchedRates;
    } catch (error) {
      toast.error("Failed to fetch exchange rates");
    }
  }
});

// Computed totals in EUR
const total = computed(() =>
  transactions.value.reduce((acc, t) => acc + t.amount, 0)
);

const income = computed(() =>
  transactions.value
    .filter(t => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0)
);

const expenses = computed(() =>
  transactions.value
    .filter(t => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0)
);

// Computed converted transactions for display
const convertedTransactions = computed(() => {
  const rate = currencySymbol.value === "$" ? rates.value.eurToUsd : 1;
  return transactions.value.map(t => ({
    ...t,
    amount: +(t.amount * rate).toFixed(2),
  }));
});

// Converted totals for display
const convertedTotal = computed(() => {
  const rate = currencySymbol.value === "$" ? rates.value.eurToUsd : 1;
  return +(total.value * rate).toFixed(2);
});

const convertedIncome = computed(() => {
  const rate = currencySymbol.value === "$" ? rates.value.eurToUsd : 1;
  return +(income.value * rate).toFixed(2);
});

const convertedExpenses = computed(() => {
  const rate = currencySymbol.value === "$" ? rates.value.eurToUsd : 1;
  return +(expenses.value * rate).toFixed(2);
});

// Handle new transaction (always store amounts in EUR)
const handleTransactionSubmitted = (transactionData) => {
  // If user entered $ amount, convert back to EUR before storing
  // But here we assume user inputs EUR always for simplicity

  const newTransaction = {
    id: generateUniqueId(),
    text: transactionData.text,
    amount: transactionData.amount, // assumed EUR
  };

  transactions.value = [...transactions.value, newTransaction];
  saveTransactionsToLocalStorage();
};

// Save all transactions (in EUR) to localStorage
const saveTransactionsToLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions.value));
};

// Generate unique ID
const generateUniqueId = () =>
  Date.now().toString() + Math.floor(Math.random() * 1000).toString();

// Delete transaction
const handleTransactionDeleted = (id) => {
  transactions.value = transactions.value.filter(t => t.id !== id);
  saveTransactionsToLocalStorage();
  toast.success("Transaction deleted");
};

// Change currency symbol, no amount mutation here
const handleCurrencyConversion = (symbol) => {
  currencySymbol.value = symbol;
};

</script>

<template>
  <Header @currencySymbolChange="handleCurrencyConversion" />
  <div class="container">
    <Balance :total="convertedTotal" :currencySymbol="currencySymbol" />
    <IncomeExpenses
      :income="convertedIncome"
      :expenses="convertedExpenses"
      :currencySymbol="currencySymbol"
    />
    <TransactionList
      :transactions="convertedTransactions"
      :currencySymbol="currencySymbol"
      @transactionDeleted="handleTransactionDeleted"
    />
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
  </div>
</template>