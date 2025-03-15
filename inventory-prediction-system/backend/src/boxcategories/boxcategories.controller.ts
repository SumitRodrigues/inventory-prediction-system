import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { BoxCategoriesService } from './boxcategories.service';

@Controller('boxcategories')
export class BoxCategoriesController {
  constructor(private readonly boxCategoriesService: BoxCategoriesService) {}

  @Get('categories')
  async getDistinctBoxCategories() {
    return this.boxCategoriesService.getDistinctBoxCategories();
  }
  @Get('category')
  async getProductByCategoryName(@Query('categoryName') categoryName: string) {
    return this.boxCategoriesService.getProductByCategroyName(categoryName);
  }
  @Get('productForecast')
  productForecast(
    @Query('productId') productId: string,
    @Query('stockStatus') stockStatus: string,
  ) {
    return this.boxCategoriesService.productForecast(productId, stockStatus);
  }
  @Get('underStockCategories')
  fetchUnderStockCategories() {
    return this.boxCategoriesService.fetchUnderStockCategories();
  }
  @Get('overStockCategories')
  fetchOverStockCategories() {
    return this.boxCategoriesService.fetchOverStockCategories();
  }
  @Get('overStockProducts')
  overStockProducts() {
    return this.boxCategoriesService.fetchOverStockProducts();
  }
  @Get('underStockProducts')
  underStockProducts() {
    return this.boxCategoriesService.fetchUnderStockProducts();
  }
  @Get('getPiChart')
  getPiChart() {
    return this.boxCategoriesService.getPiChart();
  }
  @Get('productsByStore')
  getProductsByStore(@Query('productId') productId: string) {
    return this.boxCategoriesService.getStoreByProductId(productId);
  }
  @Get('getGraphData')
  getGraphData() {
    return this.boxCategoriesService.getGraphData();
  }
}
