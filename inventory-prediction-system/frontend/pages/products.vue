<template>
    <h1 class="text-2xl py-6 font-bold text-gray-800">Products</h1>
  
    <div class="rounded-2xl backdrop-blur-md bg-white/30 shadow-md p-6 m-4 transition-all">
      <div class="text-md font-semibold text-center text-gray-700 pt-4 pb-2">
        Please Select Following Items:
      </div>
  
      <div class="p-4 flex flex-col lg:flex-row items-center justify-center gap-4 border-b border-white/40">
        <!-- Category Select -->
        <USelectMenu
          searchable
          searchable-placeholder="Search Category..."
          class="w-full lg:w-48"
          placeholder="Select Category"
          :options="categories"
          v-model="selectedCategory"
          @change="fetchProducts"
          size="md"
        />
  
        <!-- Product Select -->
        <USelectMenu
          searchable
          searchable-placeholder="Search Product..."
          class="w-full lg:w-48"
          placeholder="Select Product"
          :options="products"
          v-model="selectedProducts"
          size="md"
        />
  
        <!-- Stock Level Select -->
        <USelectMenu
          class="w-full lg:w-48"
          placeholder="Select Stock Level"
          :options="stockLevels"
          v-model="selectedstockLevels"
          size="md"
        />
  
        <!-- Search Button -->
        <UButton
          color="red"
          size="md"
          variant="solid"
          @click="handleProductForecast"
        >
          Search
        </UButton>
      </div>
  
      <!-- Store Wise Inventory Table -->
      <div v-if="productId" class="text-md font-semibold p-4 border-b border-white/40 text-gray-700">
        Store Wise Inventory of <strong>{{ productId }}</strong>
      </div>
  
      <div class="p-4">
        <UTable :rows="topBroughtProductsData[page - 1]">
          <template #stockStatus-data="{ row }">
            <p>{{ row['Stock Status'] }}</p>
          </template>
        </UTable>
  
        <div
          v-if="topBroughtProductsData[page - 1]"
          class="flex justify-end px-3 py-3.5 border-t border-white/40"
        >
          <UPagination
            v-model="page"
            :page-count="pageCount"
            :total="topBroughtProducts.length"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    layout: 'inventory-iq-default'
  });
  
  const categories = ref([]);
  const selectedCategory = ref();
  const products = ref([]);
  const productId = ref('');
  const selectedProducts = ref();
  const stockLevels = ref(['All', 'Understock', 'Overstock', 'Balanced']);
  const selectedstockLevels = ref('All');
  const topBroughtProducts = ref([]);
  const topBroughtProductsData = ref([]);
  const page = ref(1);
  const pageCount = 20;
  
  const response = await fetch('http://localhost:3001/boxcategories/categories');
  const resp = await response.json();
  categories.value = resp.data;
  
  const fetchProducts = async () => {
    const response = await fetch(`http://localhost:3001/boxcategories/category?categoryName=${selectedCategory.value}`);
    const res = await response.json();
    products.value = res.data;
  };
  
  const handleProductForecast = async () => {
    productId.value = selectedProducts.value;
    const response = await fetch(`http://localhost:3001/boxcategories/productForecast?productId=${selectedProducts.value}&stockStatus=${selectedstockLevels.value}`);
    const res = await response.json();
    topBroughtProducts.value = res.data;
    page.value = 1;
    setProductPages();
  };
  
  const setProductPages = () => {
    topBroughtProductsData.value = [];
    for (let i = 0; i < topBroughtProducts.value.length; i += pageCount) {
      topBroughtProductsData.value.push(topBroughtProducts.value.slice(i, i + pageCount));
    }
  };
  </script>
  