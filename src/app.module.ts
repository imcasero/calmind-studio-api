import { Module } from '@nestjs/common';
import { SudoModule } from './sudo/sudo.module';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [SudoModule, PlayersModule],
})
export class AppModule {}
