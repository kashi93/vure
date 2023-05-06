<template>
    <input :disabled="disabled" class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
        @input="emit('update:modelValue', $event.target.value)" :value="modelValue">
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps({
    disabled: {
        required: false,
        type: Boolean,
        default: false
    },
    modelValue: {
        type: String,
        required: true,
    }
})

const emit = defineEmits([
    "update:modelValue"
]);
</script>

<style scoped></style>