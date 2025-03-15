import { Test, TestingModule } from '@nestjs/testing';
import { BoxcategoriesController } from './boxcategories.controller';

describe('BoxcategoriesController', () => {
  let controller: BoxcategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoxcategoriesController],
    }).compile();

    controller = module.get<BoxcategoriesController>(BoxcategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
