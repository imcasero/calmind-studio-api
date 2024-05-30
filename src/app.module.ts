import { Module } from '@nestjs/common';
import { TeamsModule } from './teams/temas.module';

@Module({
  imports: [TeamsModule],
})
export class AppModule {}
