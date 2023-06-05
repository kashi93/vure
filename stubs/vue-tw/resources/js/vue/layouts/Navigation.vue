<template>
    <nav class="bg-white border-b border-gray-100">
        <!-- Primary Navigation Menu -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex">
                    <!-- Logo -->
                    <div class="shrink-0 flex items-center">
                        <RouterLink :to="{ name: 'base' }">
                            <ApplicationLogo class="block h-9 w-auto fill-current text-gray-800" />
                        </RouterLink>
                    </div>

                    <!-- Navigation Links -->
                    <div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                        <nav-link :active="route.name == 'home'">
                            <RouterLink :to="{ name: 'home' }">
                                Dashboard
                            </RouterLink>
                        </nav-link>
                    </div>
                </div>

                <!-- Settings Dropdown -->
                <div class="hidden sm:flex sm:items-center sm:ml-6">
                    <DropDown align="right" width="48">
                        <template #trigger>
                            <button
                                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150">
                                <div v-if="authStore.user != null">
                                    {{ authStore.user.name }}
                                </div>

                                <div class="ml-1">
                                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </button>
                        </template>
                        <template #content>
                            <RouterLink :to="{ name: 'profile' }">
                                <DropDownLink>
                                    Profile
                                </DropDownLink>
                            </RouterLink>

                            <DropDownLink href="javascript:void(0)" @click.prevent="logout">
                                Log Out
                            </DropDownLink>
                        </template>
                    </DropDown>
                </div>

                <!-- Hamburger -->
                <div class="-mr-2 flex items-center sm:hidden">
                    <button @click="open = !open"
                        class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                        <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path :class="{ 'hidden': open, 'inline-flex': !open }" class="inline-flex"
                                stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                            <path :class="{ 'hidden': !open, 'inline-flex': open }" class="hidden" stroke-linecap="round"
                                stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Responsive Navigation Menu -->
        <div :class="`${!open ? 'hidden' : ''} sm:hidden`">
            <div class="pt-2 pb-3 space-y-1">
                <RouterLink :to="{ name: 'home' }">
                    <ResponsiveNavLink :active="route.name == 'home'">
                        Dashboard
                    </ResponsiveNavLink>
                </RouterLink>

            </div>

            <!-- Responsive Settings Options -->
            <div class="pt-4 pb-1 border-t border-gray-200">
                <div class="px-4" v-if="authStore.user">
                    <div class="font-medium text-base text-gray-800">{{ authStore.user.name }}</div>
                    <div class="font-medium text-sm text-gray-500">{{ authStore.user.email }}</div>
                </div>

                <div class="mt-3 space-y-1">
                    <RouterLink :to="{ name: 'profile' }">
                        <ResponsiveNavLink :active="route.name == 'profile'">
                            Profile
                        </ResponsiveNavLink>
                    </RouterLink>


                    <!-- Authentication -->
                    <ResponsiveNavLink href="javascript:void(0)" @click.prevent="logout">
                        Log Out
                    </ResponsiveNavLink>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref } from "vue"
import ApplicationLogo from "@/components/ApplicationLogo.vue"
import NavLink from "@/components/NavLink.vue"
import ResponsiveNavLink from "@/components/ResponsiveNavLink.vue"
import DropDown from "@/components/DropDown.vue"
import DropDownLink from "@/components/DropDownLink.vue"
import { useAuthStore } from "@/stores/auth"
import { RouterLink, useRoute, useRouter } from "vue-router"

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const open = ref(false)

const logout = async () => {
    if (await authStore.logout()) {
        router.replace({ name: "base" })
    }
}

</script>

<style scoped></style>