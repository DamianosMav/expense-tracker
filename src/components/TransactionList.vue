<script setup>

const emit = defineEmits(["transactionDeleted"]);

const props = defineProps({
  transactions: {
    type: Array,
    required: true,
  },
  currencySymbol: {
      type: String,
  }
});

const formatCurrency = (amount) => {
  return props.currencySymbol === '$' ? `$${amount}` : `${amount}€`
};

const deleteTransaction = (id) => {
  emit("transactionDeleted", id);
}
</script>

<template>
    <h3>History</h3>
      <ul id="list" class="list">
        <li class="transaction-item"
          v-for="transaction in transactions"
          :key="transaction.id"
          :class="transaction.amount < 0 ? 'minus': 'plus'">
          {{ transaction.text }} <span>{{ formatCurrency(transaction.amount)}}</span>
          <button class="delete-btn" @click="deleteTransaction(transaction.id)">x</button>
        </li>
      </ul>
</template>