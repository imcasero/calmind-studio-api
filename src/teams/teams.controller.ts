import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  getAllTeams() {
    return this.teamsService.getAllTeams();
  }

  @Get(':id')
  getTeamById(@Param('id') id: string) {
    const team = this.teamsService.getTeamById(+id);
    return team;
  }

  @Post()
  createTeam(@Body('name') name: string) {
    return this.teamsService.createTeam(name);
  }

  @Put(':id')
  updateTeam(@Param('id') id: string, @Body('name') name: string) {
    const updatedTeam = this.teamsService.updateTeam(+id, name);
    return updatedTeam;
  }

  @Delete(':id')
  deleteTeam(@Param('id') id: string) {
    const deletedTeam = this.teamsService.deleteTeam(+id);
    return deletedTeam;
  }
}
