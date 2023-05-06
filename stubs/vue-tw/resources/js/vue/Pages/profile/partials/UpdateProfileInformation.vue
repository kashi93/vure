<template>
    <section>
        <header>
            <h2 class="text-lg font-medium text-gray-900">
                Profile Information
            </h2>

            <p class="mt-1 text-sm text-gray-600">
                Update your account's profile information and email address.
            </p>
        </header>

        <form @submit.prevent="submitForm" class="mt-6 space-y-6">
            <div>
                <InputLabel for="name" value="Name" />
                <TextInput id="name" v-model="name" type="text" class="mt-1 block w-full" />
                <InputError class="mt-2" :messages="error.name || []" />
            </div>

            <div>
                <InputLabel for="email" value="Email" />
                <TextInput id="email" v-model="email" type="email" class="mt-1 block w-full" />
                <InputError class="mt-2" :messages="error.email || []" />
            </div>

            <div class="flex items-center gap-4">
                <PrimaryButton>
                    Save
                </PrimaryButton>

                <Transition enter-from-class="opacity-0" leave-to-class="opacity-0" class="transition ease-in-out">
                    <p v-if="isSuccess" class="text-sm text-gray-600">Saved.</p>
                </Transition>
            </div>
        </form>
    </section>
</template>

<script setup lang="ts">
import InputLabel from "@/components/InputLabel.vue"
import TextInput from "@/components/TextInput.vue"
import InputError from "@/components/InputError.vue"
import PrimaryButton from "@/components/PrimaryButton.vue"
import { ref } from "vue";
import type { Ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const isSuccess = ref(false);
const name = ref('');
const email = ref('');
const error: Ref<{ [key: string]: string[] }> = ref({});
const { user } = authStore

name.value = user.name;
email.value = user.email;

const submitForm = async () => {
    if (await authStore.updateProfile({
        name,
        email,
        error,
    })) {
        isSuccess.value = true;

        setTimeout(() => {
            isSuccess.value = false;
        }, 1000);
    }

}
</script>

<style scoped></style>