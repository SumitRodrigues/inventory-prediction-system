<template>
  <h1 class="text-xl py-4 font-semibold">Inventory Allocation</h1>
  <div class="border border-gray-200 bg-gray-50 rounded-lg">
    <div class="flex justify-between p-4 border-b">
      <div>
        <div class="p-2 pb-0 flex items-center">
          <div class="text-md font-semibold">
            Please Select following options to get Inventory Allocations
          </div>
        </div>
        <div class="p-2 pb-4 flex items-center justify-center">
          <div class="pr-4">
            <USelectMenu searchable searchable-placeholder="Search Category..." class="w-full lg:w-48"
              placeholder="Please Select Category" :options="categories" v-model="selectedCategory" size="md"
              @change="fetchProducts" />
          </div>
          <div class="pr-4">
            <USelectMenu searchable searchable-placeholder="Search Product..." class="w-full lg:w-48"
              placeholder="Select Product" :options="products" v-model="selectedProducts" size="md"
              @change="fetchStoreByProductId" />
          </div>
          <div class="pr-4">
            <USelectMenu searchable searchable-placeholder="Search Stores..." class="w-full lg:w-48"
              placeholder="Select Stores" :options="storeArr" size="md" v-model="selectedStore" />
          </div>
          <div class="pr-4">
            <UButton color="red" variant="solid" @click="handleInventoryAllocation" size="md">Search</UButton>
          </div>
        </div>
      </div>

      <!-- <div class="flex items-center">
        <div class="pr-2 text-sm">Map View:</div>
        <UToggle v-model="selected" size="md" class="flex items-center" color="red" />
      </div> -->
    </div>
    
    <div v-show="selected" class="m-2 rounded-lg border">
      <InvAllocGmap :invStores="invetoryStoresByProductId" :invShifts="inventoryShifts" />
    </div>
    <div v-show="!selected" class="m-2 rounded-lg border">
      <InvAllocVisRep :stores="invetoryStoresByProductId" :transfers="inventoryShifts" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'inventory-iq-default'
});
const categories = ref([])
const selectedCategory = ref()
const selected = ref(true);
const products = ref([])
const selectedProducts = ref()
const selectedStore = ref()
const response = await fetch('http://localhost:3001/boxcategories/categories')
const resp = await response.json();
const storeList = ref([])
const storeArr = ref([])
const stores = ref([])
const invetoryStoresByProductId = ref([])
const inventoryShifts = ref([])
categories.value = resp.data

const fetchProducts = async () => {
  selectedProducts.value = '';
  products.value = [];
  selectedStore.value = '';
  storeList.value = [];
  storeArr.value = [];
  stores.value = [];

  const response = await fetch(`http://localhost:3001/boxcategories/category?categoryName=${(selectedCategory.value)}`)
  const res = await response.json()
  console.log(res)
  products.value = res.data
}

const fetchStoreByProductId = async () => {
  selectedStore.value = '';
  storeList.value = [];
  storeArr.value = [];
  stores.value = [];

  const response = await fetch(`http://localhost:3001/stores/inventorystoresByStoreId?productId=${(selectedProducts.value)}`)
  const res = await response.json()
  stores.value = res.data
  res.data.map((store) => {
    storeList.value[store.BranchName] = store.StoreId
  })
  storeArr.value = Object.keys(storeList.value)
}

const handleInventoryAllocation = async () => {
  let singleStore = stores.value.find((item) => item.StoreId == storeList.value[selectedStore.value]);
  console.log(storeList.value);
  console.log(selectedStore.value)
  console.log(stores.value)
  console.log(singleStore)

  let response = await fetch(`http://localhost:3001/stores/inventorystores?productId=${selectedProducts.value}&storeId=${storeList.value[selectedStore.value]}&stockStatus=${(singleStore.StockStatus == 'Understock' ? 'Overstock' : 'Understock')}`)
  response = await response.json()
  console.log(response)

  // let storeInventory = response.data.map((store)=>{
  //     return {
  //         id: store.StoreId,
  //         name: store.Name,
  //         address: `
  //           Stock Status : ${store['Stock Status']}
  //         `,
  //         position: {
  //             lat: parseFloat(store.lat),
  //             lng: parseFloat(store.lng)
  //         }
  //     }
  // })

  // console.log(singleStore);
  // console.log(response.data)
  // storeInventory.unshift(
  //     {
  //         id: singleStore.StoreId,
  //         name: singleStore.BranchName,
  //         address: "",
  //         position: {
  //             lat: parseFloat(singleStore.Latitude),
  //             lng: parseFloat(singleStore.Longitude)
  //         }
  //     }
  // )

  const singleStoreStock = (singleStore.StockStatus == 'Overstock') ? (parseInt(singleStore['Available Stock']) - (parseInt(singleStore['Expected Forecast']) + 2)) : (parseInt(singleStore['Expected Forecast']) + 2) - (parseInt(singleStore['Available Stock']));
  const storeInventory = [
    {
      id: singleStore.StoreId,
      name: singleStore.BranchName,
      address: '',
      stockStatus: singleStore.StockStatus,
      availableStock: singleStoreStock,
      stock: [`${(singleStore.StockStatus == 'Overstock') ? 'Available Stock' : 'Requirement'}`, singleStoreStock],
      position: {
        lat: parseFloat(singleStore.Latitude),
        lng: parseFloat(singleStore.Longitude)
      }
    }
  ];
  const inventoryShiftsArray = [];

  response.data.forEach((store, index) => {

    if (storeInventory.length == 3) {
      return false;
    }

    if (store['Stock Status'] == 'Overstock') {
      const selectedStoreNeed = (parseInt(singleStore['Expected Forecast']) + 2) - parseInt(singleStore['Available Stock'])
      const storeBalanceStock = parseInt(store['Available Stock']) - (parseInt(store['Expected Forecast']))
      if (storeBalanceStock > 0) {
        inventoryShiftsArray.push({
          from: index + 1,
          to: 0,
          count: ((storeBalanceStock - selectedStoreNeed) > 0) ? selectedStoreNeed : storeBalanceStock
        });
        storeInventory.push({
          id: store.StoreId,
          name: store.Name,
          address: '',
          stockStatus: store['Stock Status'],
          availableStock: storeBalanceStock,
          stock: ['Available Stock', storeBalanceStock],
          position: {
            lat: parseFloat(store.lat),
            lng: parseFloat(store.lng)
          }
        })
      }
    } else {
      const selectedStoreExcessStock = parseInt(singleStore['Available Stock']) - (parseInt(singleStore['Expected Forecast']) + 2)
      const storeReq = (parseInt(store['Expected Forecast'])) - parseInt(store['Available Stock'])
      if (selectedStoreExcessStock > 0) {
        inventoryShiftsArray.push({
          from: 0,
          to: index + 1,
          count: ((selectedStoreExcessStock - storeReq) > 0) ? storeReq : selectedStoreExcessStock
        });
        storeInventory.push({
          id: store.StoreId,
          name: store.Name,
          address: '',
          stockStatus: store['Stock Status'],
          requirement: storeReq,
          stock: ['Requirement', storeReq],
          position: {
            lat: parseFloat(store.lat),
            lng: parseFloat(store.lng)
          }
        })
      }
      // return  { from: 0, to: index+1, count: store['Available Stock'] }
    }
  })

  invetoryStoresByProductId.value = storeInventory
  inventoryShifts.value = inventoryShiftsArray
}
</script>
