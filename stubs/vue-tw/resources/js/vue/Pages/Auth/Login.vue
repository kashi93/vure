<template>
    <Guest>
        <form @submit.prevent="submitForm">
            <!-- Email Address -->
            <div>
                <input-label for="email" value="Email" />
                <text-input id="email" class="block mt-1 w-full" type="email" name="email"  autofocus
                    autocomplete="username" v-model="email" />
                <input-error :messages="error.email || []" class="mt-2" />
            </div>

            <!-- Password -->
            <div class="mt-4">
                <input-label for="password" value="Password" />

                <text-input id="password" class="block mt-1 w-full" type="password" name="password" 
                    autocomplete="current-password" v-model="password" />

                <input-error :messages="error.password || []" class="mt-2" />
            </div>

            <!-- Remember Me -->
            <div class="block mt-4">
                <label for="remember_me" class="inline-flex items-center">
                    <input id="remember_me" type="checkbox"
                        class="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500" name="remember">
                    <span class="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
            </div>

            <div class="flex items-center justify-end mt-4">
                <RouterLink class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    :to="{name:'register'}">
                    Register Membership
                </RouterLink>
                <primary-button class="ml-3">
                    Log in
                </primary-button>
            </div>
        </form>
    </Guest>
</template>

<script setup lang="ts">
import { useRouter,RouterLink } from 'vue-router';
import { ref } from 'vue';
import type { Ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import Guest from '@/layouts/Guest.vue';
import InputLabel from "@/components/InputLabel.vue"
import TextInput from "@/components/TextInput.vue"
import InputError from "@/components/InputError.vue"
import PrimaryButton from "@/components/PrimaryButton.vue"

const router = useRouter();
const authStore = useAuthStore();
const email = ref("");
const password = ref("");
const error: Ref<{ [key: string]: string[] }> = ref({});

const submitForm = async () => {
    if (await authStore.login({
        email,
        password,
        error,
    })) router.replace({ name: "home" });
}
</script>

<style scoped></style>