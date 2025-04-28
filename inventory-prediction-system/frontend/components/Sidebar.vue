<template>
    <aside id="default-sidebar" :class="[
        'min-h-screen bg-gradient-to-b from-[#d1f4f2] to-[#d7fbe8] backdrop-blur-md shadow-lg rounded-r-2xl p-4 flex flex-col transition-all duration-300',
        isSidebarVisible ? 'w-60' : 'w-20'
    ]" aria-label="Sidebar">
        <div class="px-3 py-4">
            <ul class="space-y-2 font-medium" :class="{ 'items-center': !isSidebarVisible }">
                <li>
                    <NuxtLink to="/dashboard"
                        class="flex items-center gap-4 h-10 py-2 px-3 text-gray-800 rounded-lg hover:bg-white/30 hover:backdrop-blur-sm transition-all">
                        <div class="flex-shrink-0">
                            <svg class="w-5 h-5" viewBox="0 0 24 24" id="meteor-icon-kit__solid-dashboard" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M2 0H7C8.10457 0 9 0.89543 9 2V7C9 8.10457 8.10457 9 7 9H2C0.89543 9 0 8.10457 0 7V2C0 0.89543 0.89543 0 2 0ZM2 11H7C8.10457 11 9 11.8954 9 13V22C9 23.1046 8.10457 24 7 24H2C0.89543 24 0 23.1046 0 22V13C0 11.8954 0.89543 11 2 11ZM13 0H22C23.1046 0 24 0.89543 24 2V13C24 14.1046 23.1046 15 22 15H13C11.8954 15 11 14.1046 11 13V2C11 0.89543 11.8954 0 13 0ZM13 17H22C23.1046 17 24 17.8954 24 19V22C24 23.1046 23.1046 24 22 24H13C11.8954 24 11 23.1046 11 22V19C11 17.8954 11.8954 17 13 17Z"
                                    fill="#b50802" />
                            </svg>
                        </div>
                        <transition name="fade">
                            <div v-if="isSidebarVisible" class="whitespace-nowrap">
                                <span>Dashboard</span>
                            </div>
                        </transition>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/stores"
                        class="flex items-center gap-4 h-10 py-2 px-3 text-gray-800 rounded-lg hover:bg-white/30 hover:backdrop-blur-sm transition-all">
                        <div class="flex-shrink-0">
                            <svg class="w-5 h-5" viewBox="0 0 24 24" id="meteor-icon-kit__solid-storefront" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M1 10.9003C1.75007 11.2837 2.59978 11.5 3.5 11.5C5.0303 11.5 6.41464 10.875 7.41167 9.86637C8.51229 11.1712 10.1594 12 12 12C13.8406 12 15.4877 11.1712 16.5883 9.86637C17.5854 10.875 18.9697 11.5 20.5 11.5C21.4002 11.5 22.2499 11.2837 23 10.9003V23C23 23.5523 22.5523 24 22 24H2C1.44772 24 1 23.5523 1 23V10.9003ZM7 15C6.44772 15 6 15.4477 6 16V24H11V15H7ZM13 15V24H18V16C18 15.4477 17.5523 15 17 15H13ZM16 6C16 8.20914 14.2091 10 12 10C9.79086 10 8 8.20914 8 6C8 5.72386 7.77614 5.5 7.5 5.5C7.22386 5.5 7 5.72386 7 6C7 7.933 5.433 9.5 3.5 9.5C1.567 9.5 0 7.933 0 6V4.35078C0 4.12371 0.0772807 3.9034 0.219131 3.72609L3.69976 0.375305C3.88953 0.13809 4.17684 0 4.48062 0H19.5194C19.8232 0 20.1105 0.13809 20.3002 0.375305L23.7809 3.72609C23.9227 3.9034 24 4.12371 24 4.35078V6C24 7.933 22.433 9.5 20.5 9.5C18.567 9.5 17 7.933 17 6C17 5.72386 16.7761 5.5 16.5 5.5C16.2239 5.5 16 5.72386 16 6Z"
                                    fill="#b50802" />
                            </svg>
                        </div>
                        <transition name="fade">
                            <div v-if="isSidebarVisible" class="whitespace-nowrap">
                                <span>Stores</span>
                            </div>
                        </transition>
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/products"
                        class="flex items-center gap-4 h-10 py-2 px-3 text-gray-800 rounded-lg hover:bg-white/30 hover:backdrop-blur-sm transition-all">
                        <div class="flex-shrink-0">
                            <svg class="w-5 h-5" viewBox="0 0 24 24" id="meteor-icon-kit__solid-products" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M10 7H21C22.6569 7 24 8.34315 24 10V21C24 22.6569 22.6569 24 21 24H10C8.34315 24 7 22.6569 7 21V10C7 8.34315 8.34315 7 10 7ZM17 5H10C7.23858 5 5 7.23858 5 10V17H3C1.34315 17 0 15.6569 0 14V3C0 1.34315 1.34315 0 3 0H14C15.6569 0 17 1.34315 17 3V5Z"
                                    fill="#b50802" />
                            </svg>
                        </div>
                        <transition name="fade">
                            <div v-if="isSidebarVisible" class="whitespace-nowrap">
                                <span>Products</span>
                            </div>
                        </transition>
                    </NuxtLink>
                </li>
                <!-- <li>
                    <NuxtLink to="/predictions"
                        class="flex items-center h-10 py-2 px-3 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                            viewBox="0 0 20 18">
                            <path
                                d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                        </svg>
                        <div v-if="isSidebarVisible">
                            <span class="flex-1 ms-3 whitespace-nowrap">
                                Predictions
                            </span>
                        </div>
                    </NuxtLink>
                </li> -->
                <li>
                    <NuxtLink to="/inventory-allocation"
                        class="flex items-center gap-4 h-10 py-2 px-3 text-gray-800 rounded-lg hover:bg-white/30 hover:backdrop-blur-sm transition-all">
                        <div class="flex-shrink-0">
                            <svg class="w-5 h-5" viewBox="0 0 24 24" id="meteor-icon-kit__solid-inventory" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_525_127)">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M1 0C1.55228 0 2 0.447715 2 1V8H5C4.44772 8 4 7.55228 4 7V5C4 4.44772 4.44772 4 5 4H9C9.55228 4 10 4.44772 10 5V7C10 7.55228 9.55228 8 9 8H13C12.4477 8 12 7.55228 12 7V3C12 2.44772 12.4477 2 13 2H19C19.5523 2 20 2.44772 20 3V7C20 7.55228 19.5523 8 19 8H22V1C22 0.447715 22.4477 0 23 0C23.5523 0 24 0.447715 24 1V23C24 23.5523 23.5523 24 23 24C22.4477 24 22 23.5523 22 23V22H2V23C2 23.5523 1.55228 24 1 24C0.447715 24 0 23.5523 0 23V1C0 0.447715 0.447715 0 1 0ZM22 20H19C19.5523 20 20 19.5523 20 19V15C20 14.4477 19.5523 14 19 14H14C13.4477 14 13 14.4477 13 15V19C13 19.5523 13.4477 20 14 20H10C10.5523 20 11 19.5523 11 19V13C11 12.4477 10.5523 12 10 12H5C4.44772 12 4 12.4477 4 13V19C4 19.5523 4.44772 20 5 20H2V10H22V20Z"
                                        fill="#b50802" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_525_127">
                                        <rect width="24" height="24" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <transition name="fade">
                            <div v-if="isSidebarVisible" class="whitespace-nowrap">
                                <span>Inventory Allocation</span>
                            </div>
                        </transition>
                    </NuxtLink>
                </li>
                <!-- <li>
                    <a href="#"
                        class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Sign In</span>
                    </a>
                </li>
                <li>
                    <a href="#"
                        class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                            viewBox="0 0 20 20">
                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                            <path
                                d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                            <path
                                d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Sign Up</span>
                    </a>
                </li> -->
            </ul>
        </div>
    </aside>

</template>

<script setup>
const props = defineProps({
    isSidebarVisible: {
        type: Boolean,
        required: true
    }
})
</script>
