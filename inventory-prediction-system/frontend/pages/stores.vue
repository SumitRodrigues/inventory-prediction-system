<template>
    <h1 class="text-2xl py-6 font-bold text-gray-800">Stores</h1>
  
    <div class="rounded-2xl backdrop-blur-md bg-white/30 shadow-md p-6 m-4 transition-all">
      <div class="p-4 flex flex-col lg:flex-row items-center justify-center gap-4 border-b border-white/40">
        <div class="font-semibold text-md text-gray-700">Please select stores:</div>
        <USelectMenu
          searchable
          searchable-placeholder="Search..."
          class="w-full lg:w-48"
          placeholder="Select a Store"
          :options="Object.keys(storeArr)"
          v-model="selectedStore"
          @change="fetchStoreForecast"
          size="md"
        />
      </div>
  
      <div v-if="selectedStore" class="text-md font-semibold p-4 border-b border-white/40 text-gray-700">
        Store Wise Inventory: {{ selectedStore }}
      </div>
  
      <div class="p-4">
        <UTable :rows="storeList" />
      </div>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    layout: 'inventory-iq-default'
  });
  
  const response = await fetch('http://localhost:3001/stores/list');
  const resp = await response.json();
  const storeArr = ref([]);
  
  resp.data.map((store) => {
    storeArr.value[store.BranchName] = store.BranchID;
  });
  
  let selectedStore = ref();
  const storeList = ref();
  
  const fetchStoreForecast = async () => {
    const response = await fetch(`http://localhost:3001/stores/storeForecast?storeId=${storeArr.value[selectedStore.value]}`);
    const res = await response.json();
    storeList.value = res.data;
  };
  </script>
  