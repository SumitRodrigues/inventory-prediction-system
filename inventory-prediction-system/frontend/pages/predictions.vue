<template>
    <h1 class="text-xl py-4 font-semibold">Predictions</h1>
    <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg">
        <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 ">
            <h2 class="text-xl py-4">Predictions</h2>
        </div>
        <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="flex items-center justify-center rounded bg-gray-50 ">
                Grid 1
            </div>
            <div class="flex items-center justify-center rounded bg-gray-50 ">
                Grid 2
            </div>
        </div>
    </div>
</template>
<script setup>
definePageMeta({
    layout: 'inventory-iq-default'
})
</script>
