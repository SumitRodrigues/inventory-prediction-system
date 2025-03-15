import { Module } from '@nestjs/common';
import { BoxCategoriesService } from './boxcategories.service';
import { BoxCategoriesController } from './boxcategories.controller';

@Module({
  controllers: [BoxCategoriesController],
  providers: [BoxCategoriesService],
})
export class BoxCategoriesModule {}
