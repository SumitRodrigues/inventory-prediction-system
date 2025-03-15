import { Controller, Get, Query } from '@nestjs/common';
import { StoresService } from './stores.service';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}
  @Get('list')
  async getAllStores() {
    return this.storesService.getStores();
  }
  @Get('storeForecast')
  async getProductByCategoryName(@Query('storeId') storeId: string) {
    return this.storesService.getStoreForecastbyStoreId(storeId);
  }
  @Get('inventorystoresByStoreId')
  async getInventoryStoresbyProductId(@Query('productId') productId: string) {
    return this.storesService.inventoryStocksByProductId(productId);
  }
  @Get('inventorystores')
  async getInventoryStores(
    @Query('productId') productId: string,
    @Query('stockStatus') stockStatus: string,
    @Query('storeId') storeId: string,
  ) {
    return this.storesService.getInventoryStores(
      productId,
      stockStatus,
      storeId,
    );
  }
}
