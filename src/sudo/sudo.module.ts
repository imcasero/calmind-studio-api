import { Module } from '@nestjs/common';
import { SudoService } from './sudo.service';
import { SudoController } from './sudo.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SudoController],
  providers: [SudoService, PrismaService],
})
export class SudoModule {}
