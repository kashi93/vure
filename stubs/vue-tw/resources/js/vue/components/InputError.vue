<template>
    <ul class="text-sm text-red-600 space-y-1">
        <li v-for="message in messages">{{ message }}</li>
    </ul>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
    messages: {
        required: true,
        type: Array,
    }
})
</script>

<style scoped></style>