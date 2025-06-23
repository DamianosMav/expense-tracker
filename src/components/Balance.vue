<script setup>
import { computed } from 'vue';


const props = defineProps({
    total: {
        type: Number,
        required: true,
    },
    currencySymbol: {
        type: String,
    }
});
const totalBalance = computed(() => {
    if(props.currencySymbol === "$"){
    return `$${props.total.toFixed(2)}`
    }
    else{
        return `${props.total.toFixed(2)}€`
    }
})

</script>

<template>
    <h4>Your Balance </h4>
    <h1 id="balance"> {{ totalBalance }}</h1>
</template>