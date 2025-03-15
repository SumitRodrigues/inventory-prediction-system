import { Test, TestingModule } from '@nestjs/testing';
import { BoxcategoriesService } from './boxcategories.service';

describe('BoxcategoriesService', () => {
  let service: BoxcategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoxcategoriesService],
    }).compile();

    service = module.get<BoxcategoriesService>(BoxcategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
