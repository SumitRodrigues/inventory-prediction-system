<template>
  <div class="app-container">
    <h1 class="title">Inventory Prediction Dashboard</h1>
    <div class="controls">
      <input v-model="storeId" placeholder="Enter Store ID" />
      <input v-model="productId" placeholder="Enter Product ID" />
      <button @click="fetchForecast">Get Forecast</button>
    </div>
    <div v-if="forecast.length" class="forecast-table">
      <h2>Sales Forecast</h2>
      <table>
        <thead>
          <tr>
            <th>Order Date</th>
            <th>Store ID</th>
            <th>Product ID</th>
            <th>Predicted Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in forecast" :key="item.OrderDate">
            <td>{{ item.OrderDate }}</td>
            <td>{{ item.StoreId }}</td>
            <td>{{ item.ProductID }}</td>
            <td>{{ item.Quantity }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      storeId: '',
      productId: '',
      forecast: [],
    };
  },
  methods: {
    async fetchForecast() {
      try {
        const response = await axios.get(`http://localhost:3000/forecast`, {
          params: { storeId: this.storeId, productId: this.productId },
        });
        this.forecast = response.data;
      } catch (error) {
        console.error('Error fetching forecast:', error);
      }
    },
  },
};
</script>

<style scoped>
.app-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}
.title {
  font-size: 24px;
  margin-bottom: 20px;
}
.controls input {
  margin-right: 10px;
  padding: 5px;
}
button {
  padding: 5px 10px;
}
.forecast-table {
  margin-top: 20px;
}
.forecast-table table {
  width: 100%;
  border-collapse: collapse;
}
.forecast-table th, .forecast-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}
</style>

// NestJS API (src/forecast/forecast.controller.ts)
import { Controller, Get, Query } from '@nestjs/common';
import { ForecastService } from './forecast.service';

@Controller('forecast')
export class ForecastController {
  constructor(private readonly forecastService: ForecastService) {}

  @Get()
  async getForecast(
    @Query('storeId') storeId: string,
    @Query('productId') productId: string,
  ) {
    return this.forecastService.getForecast(storeId, productId);
  }
}

// NestJS Service (src/forecast/forecast.service.ts)
import { Injectable } from '@nestjs/common';
import { createConnection } from 'mysql2/promise';

@Injectable()
export class ForecastService {
  async getForecast(storeId: string, productId: string) {
    const connection = await createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root%401234',
      database: 'dev_days',
    });

    const [rows] = await connection.execute(
      `SELECT * FROM sales_forecast WHERE StoreId = ? AND ProductID = ?`,
      [storeId, productId]
    );

    await connection.end();
    return rows;
  }
}

// NestJS Module (src/forecast/forecast.module.ts)
import { Module } from '@nestjs/common';
import { ForecastController } from './forecast.controller';
import { ForecastService } from './forecast.service';

@Module({
  controllers: [ForecastController],
  providers: [ForecastService],
})
export class ForecastModule {}

// NestJS Main App Module (src/app.module.ts)
import { Module } from '@nestjs/common';
import { ForecastModule } from './forecast/forecast.module';

@Module({
  imports: [ForecastModule],
})
export class AppModule {}
