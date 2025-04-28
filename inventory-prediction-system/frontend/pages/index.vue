<template>
    <h1 class="text-xl py-4 font-semibold">Dashboard</h1>
    <div class="min-h-screen bg-[#e6fffa] p-6">
        <div class="p-6 rounded-2xl backdrop-blur-md bg-white/30 shadow-md mb-4">
            <h2 class="p-4 text-md font-semibold text-gray-800 border-b">Sales & Stocks In</h2>
            <div class="h-96 flex justify-center pb-8">
                <canvas id="invIqsalesStocks"></canvas>
            </div>
        </div>
        <div class="p-6 rounded-2xl backdrop-blur-md bg-white/30 shadow-md mb-4">
            <div class="rounded-lg">
                <h2 class="p-4 text-md font-semibold text-gray-800 border-b">Category wise Inventory Activity on weekly basis</h2>
                <div class="flex items-center justify-space-around p-4">
                    <div class="border py-3 px-6 rounded-lg">
                        <div class="flex items-center justify-between border-b p-2">
                            <span class="text-gray-500 font-medium pr-4">Over Stocks</span>
                            <span class="text-lg font-semibold text-black">{{ piChartCount.Overstock }}</span>
                        </div>
                        <div class="flex items-center justify-between border-b p-2">
                            <span class="text-gray-500 pr-4">Under Stocks</span>
                            <span class="text-lg font-semibold text-black">{{ piChartCount.Understock }}</span>
                        </div>
                        <div class="flex items-center justify-between border-b p-2">
                            <span class="text-gray-500 pr-4">Balanced</span>
                            <span class="text-lg font-semibold text-black">{{ piChartCount.Balanced}}</span>
                        </div>
                        <div class="flex items-center justify-between p-2 pb-0">
                            <span class="text-gray-500 pr-4">All</span>
                            <span class="text-lg font-semibold text-black">{{ piChartCount.Overstock + piChartCount.Understock + piChartCount.Balanced }}</span>
                        </div>
                    </div>
                    <div class="flex flex-col items-center">
                        <canvas id="invIqDonutChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div class="p-6 rounded-2xl backdrop-blur-md bg-white/30 shadow-md mb-4 data-table">
                <!--<v-container>
                    <v-data-table :items="topBroughtProducts" :items-per-page="5" :hide-default-footer="true">
                        <template #top>
                            <v-toolbar flat>
                                <v-toolbar-title><span class="text-sm font-semibold">Top Over Stock Products</span></v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                        </template>
                    </v-data-table>
                </v-container>-->
                <div>
                    <div class="text-md font-semibold p-4 border-b border-solid border-gray-800">Top Over Stock Products</div>
                    <div class="p-4">
                        <UTable :rows="topBroughtProducts">
                            <template #turnover-ratio-data="{ row }">
                                <b>{{ row['Turnover Time'] }}</b>
                            </template>
                        </UTable>
                    </div>
                </div>

            </div>
            <div class="p-6 rounded-2xl backdrop-blur-md bg-white/30 shadow-md mb-4">
                <!--<v-container>
                    <v-data-table :items="topUnderBroughtProducts" :items-per-page="5" :hide-default-footer="true">
                        <template #top>
                            <v-toolbar flat>
                                <v-toolbar-title><span class="text-sm font-semibold">Top Under Stock Products</span></v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                        </template>
                    </v-data-table>
                </v-container>-->
                <div>
                    <div class="text-md font-semibold p-4 border-b border-solid border-gray-800">Top Under Stock Products</div>
                    <div class="p-4">
                        <UTable :rows="topUnderBroughtProducts" />
                    </div>
                </div>
            </div>
            <div class="p-6 rounded-2xl backdrop-blur-md bg-white/30 shadow-md mb-4">
                <!--<v-container>
                    <v-data-table :items="mostDemandingProducts" :items-per-page="5" :hide-default-footer="true">
                        <template #top>
                            <v-toolbar flat>
                                <v-toolbar-title><span class="text-sm font-semibold">Top Over Stock categories</span></v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                        </template>
                    </v-data-table>
                </v-container>-->

                <div>
                    <div class="text-md font-semibold p-4 border-b border-solid border-gray-800">Top Over Stock categories</div>
                    <div class="p-4">
                        <UTable :rows="mostDemandingProducts" />
                    </div>
                </div>
            </div>
            <div class="p-6 rounded-2xl backdrop-blur-md bg-white/30 shadow-md mb-4">
                <!--<v-container>
                    <v-data-table :items="leastDemandingProducts" :items-per-page="5" :hide-default-footer="true">
                        <template #top>
                            <v-toolbar flat>
                                <v-toolbar-title><span class="text-sm font-semibold">Top Under Stock categories</span></v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                        </template>
                    </v-data-table>
                </v-container>-->

                <div>
                    <div class="text-md font-semibold p-4 border-b border-solid border-gray-800">Top Under Stock categories</div>
                    <div class="p-4">
                        <UTable :rows="leastDemandingProducts" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Chart from 'chart.js/auto';
// import { getRelativePosition } from 'chart.js/helpers';


definePageMeta({
    layout: 'inventory-iq-default'
})

const topBroughtProducts = ref([]);
const topUnderBroughtProducts = ref([]);
const mostDemandingProducts = ref();
const leastDemandingProducts = ref();
const dashboardGraph = ref([]);


const invIqDonutChartData = {
    labels: [
        'Red',
        'Blue',
        'Yellow'
    ],
    datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
            'rgb(230, 57, 70)',
            'rgb(168, 218, 220)',
            'rgb(29, 53, 87)'
        ],
        hoverOffset: 4
    }]
};
let piChartCount =ref({ Understock: 0, Overstock: 0, Balanced: 0 })
try {
  const [
    overStockCategoriesResponse,
    underStockCategoriesResponse,
    overStockProductsResponse,
    underStockProductsResponse,
    piChartResponse,
    graphDataResponse
  ] = await Promise.all([
    fetch(`http://localhost:3001/boxcategories/overStockCategories`),
    fetch(`http://localhost:3001/boxcategories/underStockCategories`),
    fetch(`http://localhost:3001/boxcategories/overStockProducts`),
    fetch(`http://localhost:3001/boxcategories/underStockProducts`),
    fetch(`http://localhost:3001/boxcategories/getPiChart`),
    fetch(`http://localhost:3001/boxcategories/getGraphData`)
  ]);

  const [
    overStockCategoriesData,
    underStockCategoriesData,
    overStockProductsData,
    underStockProductsData,
    piChartData,
    graphData
  ] = await Promise.all([
    overStockCategoriesResponse.json(),
    underStockCategoriesResponse.json(),
    overStockProductsResponse.json(),
    underStockProductsResponse.json(),
    piChartResponse.json(),
    graphDataResponse.json()
  ]);

  // Assigning data to reactive variables
  mostDemandingProducts.value = overStockCategoriesData.data;
  leastDemandingProducts.value = underStockCategoriesData.data;
  topBroughtProducts.value = overStockProductsData.data;
  topUnderBroughtProducts.value = underStockProductsData.data;
  dashboardGraph.value = graphData.data;
  console.log("GRAPH DATA")
  console.log(dashboardGraph.value);
  // Calculate stock counts from Pi Chart data
  const calculateStockCounts = (data) => {
    data.forEach(item => {
      const status = item.StockStatus;
      if (piChartCount.value[status] !== undefined) {
        piChartCount.value[status]++;
      }
    });
    console.log(piChartCount.value)
  };

  calculateStockCounts(piChartData.data);
} catch (error) {
  console.error('Failed to fetch box categories and products:', error);
}
const salesStockInData = {
    datasets: [{
        type: 'bar',
        label: 'Stocks',
        data: dashboardGraph.value.stocks,
        backgroundColor: [
            'rgba(69, 123, 157, 0.5)'
        ],
    }, {
        type: 'line',
        label: 'Sales',
        data: dashboardGraph.value.sales,
        backgroundColor: [
            'rgb(0, 0, 0)'
        ],
        bordrColor: [
            'rgb(0, 0, 0)'
        ],
        borderWidth: 2
    }],
    labels: dashboardGraph.value.labels
};
onMounted(async () => {
    const chart = new Chart('invIqsalesStocks', {
        data: salesStockInData,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: ''
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const donutChart = new Chart('invIqDonutChart', {
        type: "doughnut",
        data: {
            labels: [
                'Understock',
                'Overstock',
                'Balanced'
            ],
            datasets: [{
                label: 'My First Dataset',
                data: [piChartCount.value.Understock, piChartCount.value.Overstock, piChartCount.value.Balanced],
                backgroundColor: [
                    'rgb(230, 57, 70)',
                    'rgb(168, 218, 220)',
                    'rgb(29, 53, 87)'
                ],
                hoverOffset: 4,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top', // Position of the legend
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            let value = tooltipItem.raw;
                            return `${value}%`; // Show percentage in tooltip
                        }
                    }
                }
            },
            cutout: '50%' // Adjust the doughnut hole size (default is 50%)
        }
    });
})
</script>

<style scoped>
.data-table {

}
</style>