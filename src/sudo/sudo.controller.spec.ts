import { Test, TestingModule } from '@nestjs/testing';
import { SudoController } from './sudo.controller';
import { SudoService } from './sudo.service';
import { SudoDto } from './dto/sudo.dto';
import { NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Sudo } from '@prisma/client';

describe('SudoController', () => {
  let controller: SudoController;
  let sudoService: SudoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SudoController],
      providers: [SudoService, PrismaService],
    }).compile();

    controller = module.get<SudoController>(SudoController);
    sudoService = module.get<SudoService>(SudoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    const adminUser: Sudo = {
      id: 1,
      userName: 'admin',
      password: 'admin',
    };

    const mockSudoDto: SudoDto = {
      userName: 'admin',
      password: 'admin',
    };

    it('should return a user when valid admin credentials are provided', async () => {
      jest.spyOn(sudoService, 'login').mockResolvedValue(adminUser);

      const result = await controller.login(mockSudoDto);

      expect(result).toEqual(adminUser);
    });

    it('should throw NotFoundException when user is not found', async () => {
      jest.spyOn(sudoService, 'login').mockImplementation(() => {
        throw new NotFoundException('Usuario no encontrado');
      });

      try {
        await controller.login({
          userName: 'nonexistent',
          password: 'invalid',
        });
        fail('Expected NotFoundException to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Usuario no encontrado');
      }
    });

    it('should throw NotFoundException when password does not match', async () => {
      jest.spyOn(sudoService, 'login').mockImplementation(() => {
        throw new NotFoundException('Usuario no encontrado');
      });

      try {
        await controller.login({
          userName: 'admin',
          password: 'invalidPassword',
        });
        fail('Expected NotFoundException to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Usuario no encontrado');
      }
    });
  });
});
