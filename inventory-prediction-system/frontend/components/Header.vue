<template>
    <header
      class="backdrop-blur-md bg-white/30 shadow-md flex items-center justify-between px-6 py-3 sticky top-0 z-50 border-b border-white/30"
    >
      <div class="flex items-center space-x-4">
        <button
          @click="handleHamburgerClick"
          type="button"
          class="inline-flex items-center justify-center p-2 rounded-lg hover:bg-white/40 transition-all"
        >
          <span class="sr-only">Open sidebar</span>
          <svg
            class="w-6 h-6 text-gray-700"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              fill-rule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
        <NuxtLink to="/dashboard" class="flex items-center">
          <img src="/Inventory_logo.png" alt="InventoryIQ Logo" class="h-12 w-12 object-contain" />
          <span class="self-center text-3xl font-bold tracking-wide text-gray-800 whitespace-nowrap">
              InventoryIQ
          </span>
        </NuxtLink>
      </div>
    </header>
  </template>
  
  <script setup>
  const emit = defineEmits()
  
  const handleHamburgerClick = () => {
    emit('toggle-sidebar')
  }
  </script>
  