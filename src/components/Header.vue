<script setup>

import RadioButton from 'primevue/radiobutton';
import {ref, watch} from "vue";


const emit = defineEmits(["currencySymbolChange"])
const selectedCurrency  = ref("euro")

 watch(selectedCurrency , (newValue)=> {
    emit("currencySymbolChange", newValue === "euro" ? "€": "$")
 }, { immediate: true })

</script>

<template>
    <div class="header">
        <h2>Expense Tracker</h2>
        
    </div>
    <div class="currency-switch">
        <RadioButton v-model="selectedCurrency" inputId="euro" name="currency" value="euro" />
        <label for="euro">€</label>
        <RadioButton v-model="selectedCurrency" inputId="usd" name="currency" value="usd" />
        <label for="usd">$</label>
    </div>
    
</template>