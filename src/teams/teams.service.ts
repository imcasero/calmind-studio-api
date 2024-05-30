import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TeamsService {
  private teams: { id: number; name: string }[] = [];

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

  createTeam(name: string) {
    const newTeam = { id: this.teams.length + 1, name };
    this.teams.push(newTeam);
    return newTeam;
  }

  updateTeam(id: number, newName: string) {
    const teamIndex = this.teams.findIndex((t) => t.id === id);
    if (teamIndex === -1) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    this.teams[teamIndex].name = newName;
    return this.teams[teamIndex];
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
