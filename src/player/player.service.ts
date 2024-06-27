import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from 'src/prisma.service';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayerService {
  constructor(private prisma: PrismaService) {}

  private playerDB = this.prisma.player;

  async playerExists(name: string): Promise<boolean> {
    const player = await this.playerDB.findUnique({
      where: { name },
    });
    return !!player;
  }

  async create(data: CreatePlayerDto): Promise<string> {
    const { name, teamId, role } = data;

    const playerExists = await this.playerExists(name);
    if (playerExists)
      throw new ConflictException(`Player with name '${name}' already exists`);
    await this.playerDB.create({
      data: {
        name,
        teamId,
        role,
      },
    });

    return 'Player created successfully';
  }

  async findAll(): Promise<Player[]> {
    return await this.playerDB.findMany();
  }

  async findOneById(id: number): Promise<Player> {
    const player = await this.playerDB.findUnique({
      where: { id },
    });

    if (!player) throw new NotFoundException(`Player with ID ${id} not found`);

    return player;
  }

  async findOneByName(name: string): Promise<Player | null> {
    const player = await this.playerDB.findUnique({
      where: { name },
    });

    if (!player)
      throw new NotFoundException(`Player with name '${name}' not found`);

    return player;
  }

  async update(name: string, data: UpdatePlayerDto): Promise<string> {
    const playerExists = await this.playerExists(name);
    if (!playerExists)
      throw new NotFoundException(`Player with name '${name}' not found`);
    await this.playerDB.update({
      where: { name },
      data,
    });

    return `Player '${name}' updated successfully`;
  }

  async remove(name: string): Promise<string> {
    const playerExists = await this.playerExists(name);
    if (!playerExists)
      throw new NotFoundException(`Player with name '${name}' not found`);

    await this.playerDB.delete({
      where: { name },
    });

    return `Player '${name}' removed successfully`;
  }
}
