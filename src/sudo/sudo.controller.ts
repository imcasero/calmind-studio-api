import { Controller, Post, Body, Get } from '@nestjs/common';
import { SudoService } from './sudo.service';
import { SudoDto } from './dto/sudo.dto';

@Controller('sudo')
export class SudoController {
  constructor(private readonly sudoService: SudoService) {}

  @Post('login')
  async login(@Body() sudoDto: SudoDto) {
    return this.sudoService.login(sudoDto);
  }
}
