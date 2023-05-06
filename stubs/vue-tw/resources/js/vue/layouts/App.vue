<template>
    <div class="min-h-screen bg-gray-100">
            <Navigation/>

            <!-- Page Heading -->
                <header class="bg-white shadow" v-if="(header || '').trim().length > 0">
                    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {{ header }}
                    </div>
                </header>
            
            <!-- Page Content -->
            <main>
                <slot/>
            </main>
        </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import Navigation from "@/layouts/Navigation.vue"

defineProps({
    header:{
        required:false,
        type:String,
        default:""
    }
})

</script>

<style scoped>

</style>