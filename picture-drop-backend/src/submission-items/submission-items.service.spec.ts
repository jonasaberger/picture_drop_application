/* eslint-disable*/
import { Test, TestingModule } from '@nestjs/testing';
import { SubmissionItemsService } from './submission-items.service';

describe('SubmissionItemsService', () => {
  let service: SubmissionItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubmissionItemsService],
    }).compile();

    service = module.get<SubmissionItemsService>(SubmissionItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
