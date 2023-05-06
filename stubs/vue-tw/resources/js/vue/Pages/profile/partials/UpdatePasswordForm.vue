<template>
    <section>
        <header>
            <h2 class="text-lg font-medium text-gray-900">
                Update Password
            </h2>

            <p class="mt-1 text-sm text-gray-600">
                Ensure your account is using a long, random password to stay secure.
            </p>
        </header>

        <form @submit.prevent="submitForm" class="mt-6 space-y-6">
            <div>
                <InputLabel for="current_password" value="Current Password" />
                <TextInput id="current_password" v-model="current_password" type="password" class="mt-1 block w-full"
                    autocomplete="current-password" />
                <InputError :messages="error.current_password || []" class="mt-2" />
            </div>

            <div>
                <InputLabel for="new_password" value="New Password" />
                <TextInput id="new_password" v-model="password" type="password" class="mt-1 block w-full"
                    autocomplete="new-password" />
                <InputError :messages="error.password || []" class="mt-2" />
            </div>

            <div>
                <InputLabel for="new_password_confirmation" value="Confirm Password" />
                <TextInput id="new_password_confirmation" v-model="password_confirmation" type="password" class="mt-1 block w-full"
                    autocomplete="new-password" />
                <InputError :messages="error.password_confirmation || []" class="mt-2" />
            </div>

            <div class="flex items-center gap-4">
                <PrimaryButton>Save</PrimaryButton>
                <Transition enter-from-class="opacity-0" leave-to-class="opacity-0" class="transition ease-in-out">
                    <p v-if="isSuccess" class="text-sm text-gray-600">Saved.</p>
                </Transition>
            </div>
        </form>
    </section>
</template>

<script setup lang="ts">
import InputLabel from "@/components/InputLabel.vue"
import InputError from "@/components/InputError.vue"
import TextInput from "@/components/TextInput.vue"
import PrimaryButton from "@/components/PrimaryButton.vue"
import { ref } from "vue";
import type { Ref } from "vue";
import {useAuthStore} from "@/stores/auth"

const isSuccess = ref(false);
const current_password = ref("");
const password = ref("");
const password_confirmation = ref("");
const error:Ref<{[key:string]:string[]}> = ref({});
const authStore = useAuthStore();

const submitForm = async ()=>{
    if(await authStore.updatePassword({
        current_password,
        password,
        password_confirmation,
        error
    })){
        current_password.value = "";
        password.value = "";
        password_confirmation.value = "";

        isSuccess.value = true;

        setTimeout(() => {
            isSuccess.value = false;
        }, 1000);
    }
}
</script>

<style scoped></style>