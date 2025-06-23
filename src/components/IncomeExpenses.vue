<script setup>
import { computed } from 'vue';

const props = defineProps({
  income: {
    type: Number,
    required: true,
  },
  expenses: {
    type: Number,
    required: true,
  },
  currencySymbol: {
    type: String,
  },
});

const totalIncomeBalance = computed(() => {
    if(props.currencySymbol === "$"){
    return `$${props.income.toFixed(2)}`
    }
    else{
      return `${props.income.toFixed(2)}€`
    }
})

const totalExpensesBalance = computed(() => {
    if(props.currencySymbol === "$"){
    return `$${props.expenses.toFixed(2)}`
    }
    else{
      return `${props.expenses.toFixed(2)}€`
    }
})

</script>

<template>
    <div class="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p id="money-plus" class="money plus">{{totalIncomeBalance}}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p id="money-minus" class="money minus">{{totalExpensesBalance}}</p>
        </div>
      </div>
</template>