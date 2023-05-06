<template>
    <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
        <div>
            <RouterLink :to="{name:'base'}">
                <ApplicationLogo class="w-20 h-20 fill-current text-gray-500"/>
            </RouterLink>
        </div>

        <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import {RouterLink} from "vue-router"
import ApplicationLogo from '@/components/ApplicationLogo.vue';
const body = document.body;
body.className = "font-sans text-gray-900 antialiased"
</script>

<style scoped></style>