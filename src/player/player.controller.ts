import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playerService.create(createPlayerDto);
  }

  @Get()
  findAll() {
    return this.playerService.findAll();
  }

  @Get(':id')
  findOnebyId(@Param('id') id: string) {
    return this.playerService.findOneById(+id);
  }

  @Get(':name')
  findOnebyName(@Param('name') name: string) {
    return this.playerService.findOneByName(name);
  }

  @Patch(':name')
  update(
    @Param('name') name: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ) {
    return this.playerService.update(name, updatePlayerDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.playerService.remove(name);
  }
}
