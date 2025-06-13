/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { WorkspacesService } from './workspaces.service';
import { getRepositoryToken } from "@nestjs/typeorm";
import { Workspaces } from "./entities/workspaces.entity";


describe('calculator', () => {
  it('should add two numbers', () => {
    const res : number = 6;
    expect(res).toBe(6);
  });
})

describe('WorkspacesService', () => {
  let service: WorkspacesService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let mockRepos : {
    find: jest.Mock;
  }

  beforeEach(async () => {
    mockRepos = {
      find: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WorkspacesService,
        {
          provide: getRepositoryToken(Workspaces),
          useValue: mockRepos,
        }
      ],
    }).compile();

    service = module.get<WorkspacesService>(WorkspacesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sumFunction', () => {
    it('should add number', () => {
      const res : number = service.sumFunction(2, 4);
      expect(res).toBe(6);
    });
  })
});
