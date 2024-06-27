import { Module } from '@nestjs/common';
import { SudoModule } from './sudo/sudo.module';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [SudoModule, PlayerModule],
})
export class AppModule {}
