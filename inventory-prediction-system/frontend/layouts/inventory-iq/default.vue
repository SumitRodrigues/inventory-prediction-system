<template>
    <div class="flex flex-col min-h-screen bg-gradient-to-br from-[#d1f4f2] to-[#d7fbe8]">
      <Header @toggle-sidebar="toggleSidebar" />
      <div class="flex w-full">
        <Sidebar :isSidebarVisible="isSidebarVisible" />
        
        <div class="flex-auto p-6 m-4 rounded-2xl backdrop-blur-md bg-white/30 shadow-md transition-all duration-300">
          <slot />
        </div>
      </div>
      <Footer class="mt-auto" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const isSidebarVisible = ref(true)
  
  const toggleSidebar = () => {
    isSidebarVisible.value = !isSidebarVisible.value
  }
  </script>
  