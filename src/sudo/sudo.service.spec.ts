import { Test, TestingModule } from '@nestjs/testing';
import { SudoService } from './sudo.service';
import { NotFoundException } from '@nestjs/common';
import { Sudo } from '@prisma/client';
import { PrismaService } from '../prisma.service';

describe('SudoService', () => {
  let service: SudoService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SudoService, PrismaService],
    }).compile();

    service = module.get<SudoService>(SudoService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    const mockUser: Sudo = {
      id: 1,
      userName: 'aittorr',
      password: 'Aitt0rr!',
    };

    it('should return a user when valid credentials are provided', async () => {
      jest.spyOn(prismaService.sudo, 'findFirst').mockResolvedValue(mockUser);

      const result = await service.login({
        userName: 'aittorr',
        password: 'Aitt0rr!',
      });

      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException when user is not found', async () => {
      jest.spyOn(prismaService.sudo, 'findFirst').mockResolvedValue(null);

      await expect(
        service.login({ userName: 'nonexistent', password: 'invalid' }),
      ).rejects.toThrowError(NotFoundException);
    });

    it('should throw NotFoundException when password does not match', async () => {
      jest
        .spyOn(prismaService.sudo, 'findFirst')
        .mockResolvedValue({ ...mockUser, password: 'wrongPassword' });

      await expect(
        service.login({ userName: 'aittorr', password: 'invalidPassword' }),
      ).rejects.toThrowError(NotFoundException);
    });
  });
});
