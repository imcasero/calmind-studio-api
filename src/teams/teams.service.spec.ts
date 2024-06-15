import { TeamsService } from './teams.service';
import { NotFoundException } from '@nestjs/common';

describe('TeamsService', () => {
  let service: TeamsService;

  beforeEach(() => {
    service = new TeamsService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all teams', () => {
    expect(service.getAllTeams()).toEqual([]);
  });

  it('should create a new team', () => {
    const team = service.createTeam('Team 1');
    expect(team).toEqual({ id: 1, name: 'Team 1' });
    expect(service.getAllTeams()).toEqual([{ id: 1, name: 'Team 1' }]);
  });

  it('should return a team by ID', () => {
    service.createTeam('Team 1');
    const team = service.getTeamById(1);
    expect(team).toEqual({ id: 1, name: 'Team 1' });
  });

  it('should throw an error if team not found by ID', () => {
    expect(() => service.getTeamById(999)).toThrow(NotFoundException);
  });

  it('should update a team by ID', () => {
    service.createTeam('Team 1');
    const updatedTeam = service.updateTeam(1, 'Updated Team 1');
    expect(updatedTeam).toEqual({ id: 1, name: 'Updated Team 1' });
    expect(service.getAllTeams()).toEqual([{ id: 1, name: 'Updated Team 1' }]);
  });

  it('should throw an error if team to update not found', () => {
    expect(() => service.updateTeam(999, 'Updated Team 999')).toThrow(
      NotFoundException,
    );
  });

  it('should delete a team by ID', () => {
    service.createTeam('Team 1');
    const deletedTeam = service.deleteTeam(1);
    expect(deletedTeam).toEqual({ id: 1, name: 'Team 1' });
    expect(service.getAllTeams()).toEqual([]);
  });

  it('should throw an error if team to delete not found', () => {
    expect(() => service.deleteTeam(999)).toThrow(NotFoundException);
  });
});
