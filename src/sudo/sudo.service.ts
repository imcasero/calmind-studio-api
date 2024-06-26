import { Injectable, NotFoundException } from '@nestjs/common';
import { SudoDto } from './dto/sudo.dto';
import { PrismaService } from '../prisma.service';
import { Sudo } from '@prisma/client';

@Injectable()
export class SudoService {
  constructor(private prisma: PrismaService) {}

  returnNotFound() {
    throw new NotFoundException('Usuario no encontrado');
  }

  async login(sudo: SudoDto): Promise<Sudo | null> {
    const { userName, password } = sudo;

    const user = await this.prisma.sudo.findFirst({ where: { userName } });

    if (!user) this.returnNotFound();
    if (user?.password !== password) this.returnNotFound();

    return user;
  }
}
