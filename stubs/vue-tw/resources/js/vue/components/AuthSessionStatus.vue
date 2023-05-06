<template>
    <div class="font-medium text-sm text-green-600">
        {{ status }}
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
    status: {
        required: true,
        type:String
    }
})
</script>

<style scoped></style>