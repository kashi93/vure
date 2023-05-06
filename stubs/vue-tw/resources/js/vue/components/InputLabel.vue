<template>
    <label class="block font-medium text-sm text-gray-700">
        <template v-if="value != null">
            {{ value }}
        </template>
        <template v-else>
            <slot />
        </template>
    </label>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
    value: {
        required: false,
        type: String,
        default: null
    }
})
</script>

<style scoped></style>