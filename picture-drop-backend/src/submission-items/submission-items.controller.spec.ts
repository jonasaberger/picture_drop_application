/* eslint-disable*/
import { Test, TestingModule } from '@nestjs/testing';
import { SubmissionItemsController } from './submission-items.controller';
import { SubmissionItemsService } from './submission-items.service';

describe('SubmissionItemsController', () => {
  let controller: SubmissionItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubmissionItemsController],
      providers: [SubmissionItemsService],
    }).compile();

    controller = module.get<SubmissionItemsController>(SubmissionItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
