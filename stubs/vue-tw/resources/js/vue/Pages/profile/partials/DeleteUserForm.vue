<template>
    <section class="space-y-6">
        <header>
            <h2 class="text-lg font-medium text-gray-900">
                Delete Account
            </h2>

            <p class="mt-1 text-sm text-gray-600">
                Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting
                your account, please download any data or information that you wish to retain.
            </p>
        </header>

        <DangerButton @click.prevent="showModal = true">
            Delete Account
        </DangerButton>

        <Modal :show="showModal" @close="closeModal">
            <form @submit.prevent="submitForm" class="p-6">
                <h2 class="text-lg font-medium text-gray-900">
                    Are you sure you want to delete your account?
                </h2>

                <p class="mt-1 text-sm text-gray-600">
                    Once your account is deleted, all of its resources and data will be permanently deleted. Please
                    enter your password to confirm you would like to permanently delete your account.
                </p>

                <div class="mt-6">
                    <InputLabel for="password" value="Password" class="sr-only" />

                    <TextInput id="password" v-model="password" type="password" class="mt-1 block w-3/4"
                        placeholder="Password" />

                    <InputError :messages="error.password || []" class="mt-2" />
                </div>

                <div class="mt-6 flex justify-end">
                    <SecondaryButton @click.prevent="closeModal">
                        Cancel
                    </SecondaryButton>

                    <DangerButton class="ml-3">
                        Delete Account
                    </DangerButton>
                </div>
            </form>
        </Modal>
    </section>
</template>

<script setup lang="ts">
import InputLabel from "@/components/InputLabel.vue"
import InputError from "@/components/InputError.vue"
import TextInput from "@/components/TextInput.vue"
import SecondaryButton from "@/components/SecondaryButton.vue"
import DangerButton from "@/components/DangerButton.vue"
import Modal from "@/components/Modal.vue"
import { ref } from "vue"
import type { Ref } from "vue"
import { useAuthStore } from "@/stores/auth"
import { useRouter } from "vue-router"

const showModal = ref(false);
const password = ref("");
const error: Ref<{ [key: string]: string[] }> = ref({});
const authStore = useAuthStore();
const router = useRouter();


const closeModal = () => {
    showModal.value = false;
    password.value = "";
}
const submitForm = async () => {
    if (await authStore.deleteAccount({
        password,
        error
    })) router.replace({ name: "base" })
}
</script>

<style scoped></style>