import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto, UpdateTeamDto } from './dto/teams.dto';

@Injectable()
export class TeamsService {
  private teams: {
    id: number;
    name: string;
    logo: string;
    coachId?: number;
  }[] = [];

  getAllTeams() {
    return this.teams;
  }

  getTeamById(id: number) {
    const team = this.teams.find((t) => t.id === id);
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return team;
  }

  createTeam(createTeamDto: CreateTeamDto) {
    const newTeam = {
      id: this.teams.length + 1,
      ...createTeamDto,
    };
    this.teams.push(newTeam);
    return newTeam;
  }

  updateTeam(id: number, updateTeamDto: UpdateTeamDto) {
    const teamIndex = this.teams.findIndex((t) => t.id === id);
    if (teamIndex === -1) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    const updatedTeam = { ...this.teams[teamIndex], ...updateTeamDto };
    this.teams[teamIndex] = updatedTeam;
    return updatedTeam;
  }

  deleteTeam(id: number) {
    const teamIndex = this.teams.findIndex((t) => t.id === id);
    if (teamIndex === -1) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    const deletedTeam = this.teams.splice(teamIndex, 1);
    return deletedTeam[0];
  }
}
