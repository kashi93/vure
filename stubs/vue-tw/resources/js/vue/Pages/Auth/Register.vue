<template>
    <Guest>
        <form @submit.prevent="submitForm">
        <!-- Name -->
        <div>
            <InputLabel for="name" value="Name" />
            <TextInput id="name" class="block mt-1 w-full" type="text" name="name" v-model="name"  autofocus autocomplete="name" />
            <InputError :messages="error.name || []" class="mt-2" />
        </div>

        <!-- Email Address -->
        <div class="mt-4">
            <InputLabel for="email" value="Email" />
            <TextInput id="email" class="block mt-1 w-full" type="email" name="email" v-model="email"  autocomplete="username" />
            <InputError :messages="error.email || []" class="mt-2" />
        </div>

        <!-- Password -->
        <div class="mt-4">
            <InputLabel for="password" value="Password" />

            <TextInput id="password" class="block mt-1 w-full"
                            type="password"
                            v-model="password"
                             autocomplete="new-password" />

            <InputError :messages="error.password || []" class="mt-2" />
        </div>

        <!-- Confirm Password -->
        <div class="mt-4">
            <InputLabel for="password_confirmation" value="Confirm Password" />

            <TextInput id="password_confirmation" class="block mt-1 w-full"
                            type="password"
                            v-model="password_confirmation"  autocomplete="new-password" />

            <InputError :messages="error.password_confirmation || []" class="mt-2" />
        </div>

        <div class="flex items-center justify-end mt-4">
            <RouterLink :to="{name:'login'}" class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Already registered?
            </RouterLink>

            <PrimaryButton class="ml-4">
                Register
            </PrimaryButton>
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
const name = ref("");
const email = ref("");
const password = ref("");
const password_confirmation = ref("");
let error: Ref<{ [key: string]: string }> = ref({});


const submitForm = async () => {
    if (await authStore.register({
        name,
        email,
        password,
        password_confirmation,
        error,
    })) {
        if (await authStore.login({ email, password, error })) {
            router.replace({ name: "home" })
        }
    }

}
</script>