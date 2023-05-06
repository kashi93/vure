<template>
    <App header="Profile">
        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <div class="max-w-xl">
                       <UpdateProfileInformation/>
                    </div>
                </div>

                <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <div class="max-w-xl">
                        <UpdatePasswordForm/>
                    </div>
                </div>

                <div class="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <div class="max-w-xl">
                       <DeleteUserForm/>
                    </div>
                </div>
            </div>
        </div>
    </App>
</template>

<script setup lang="ts">
import App from "@/layouts/App.vue"
import UpdateProfileInformation from "@/Pages/profile/partials/UpdateProfileInformation.vue";
import UpdatePasswordForm from "@/Pages/profile/partials/UpdatePasswordForm.vue";
import DeleteUserForm from "@/Pages/profile/partials/DeleteUserForm.vue";
</script>

<style scoped></style>