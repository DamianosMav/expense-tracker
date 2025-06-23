<script setup>
import {ref} from "vue";
import {useToast} from "vue-toastification";
import InputText from 'primevue/inputtext';
import IftaLabel from 'primevue/iftalabel';
import Button from 'primevue/button';


const text = ref("");
const amount = ref("");


// Matches positive or negative decimal numbers (e.g., -123, 45.67)
const regexPattern = /^-?\d+(\.\d+)?$/;

const emit = defineEmits(["transactionSubmitted"]);

const toast = useToast();

const onSubmit = () => {
  if(!text.value || !amount.value)
  {
    toast.error("Both field's must be filled");
    return;
  }

  if(!regexPattern.test(amount.value))
  {
    toast.error("Please enter a valid positive or negative number (decimals allowed).");
    return;
  }

  const transactionData = {
    text: text.value,
    amount: parseFloat(amount.value),
  }

  emit("transactionSubmitted", transactionData);
  toast.success("Transaction added");
  text.value = "";
  amount.value = "";
}
</script>


<template>
  <h3>Add new transaction</h3>
  <form id="form" autocomplete="off" @submit.prevent="onSubmit" class="flex justify-center flex-col gap-4">
    <div class="form-control">
      <IftaLabel>
        <InputText id="text" v-model="text" autocomplete="off" />
        <label for="text">Enter text...</label>
      </IftaLabel>
    </div>
    <div class="form-control">
      <IftaLabel>
        <InputText id="amount" v-model="amount" autocomplete="off" />
        <label for="amount">Amount (negative - expense, positive - income)</label>
      </IftaLabel>
    </div>
    <Button class="btn" type="submit" severity="secondary" label="Add Transaction" />
  </form>
</template>