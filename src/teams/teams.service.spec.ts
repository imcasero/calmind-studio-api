import { TeamsService } from './teams.service';
import { NotFoundException } from '@nestjs/common';
import { CreateTeamDto, UpdateTeamDto } from './dto/teams.dto';

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
    const createTeamDto: CreateTeamDto = { name: 'Team 1', logo: 'Logo 1' };
    const team = service.createTeam(createTeamDto);
    expect(team).toEqual({ id: 1, name: 'Team 1', logo: 'Logo 1' });
    expect(service.getAllTeams()).toEqual([
      { id: 1, name: 'Team 1', logo: 'Logo 1' },
    ]);
  });

  it('should return a team by ID', () => {
    const createTeamDto: CreateTeamDto = { name: 'Team 1', logo: 'Logo 1' };
    service.createTeam(createTeamDto);
    const team = service.getTeamById(1);
    expect(team).toEqual({ id: 1, name: 'Team 1', logo: 'Logo 1' });
  });

  it('should throw an error if team not found by ID', () => {
    expect(() => service.getTeamById(999)).toThrow(NotFoundException);
  });

  it('should update a team by ID', () => {
    const createTeamDto: CreateTeamDto = { name: 'Team 1', logo: 'Logo 1' };
    service.createTeam(createTeamDto);
    const updateTeamDto: UpdateTeamDto = {
      name: 'Updated Team 1',
      logo: 'Updated Logo 1',
    };
    const updatedTeam = service.updateTeam(1, updateTeamDto);
    expect(updatedTeam).toEqual({
      id: 1,
      name: 'Updated Team 1',
      logo: 'Updated Logo 1',
    });
    expect(service.getAllTeams()).toEqual([
      { id: 1, name: 'Updated Team 1', logo: 'Updated Logo 1' },
    ]);
  });

  it('should throw an error if team to update not found', () => {
    const updateTeamDto: UpdateTeamDto = {
      name: 'Updated Team 999',
      logo: 'Updated Logo 999',
    };
    expect(() => service.updateTeam(999, updateTeamDto)).toThrow(
      NotFoundException,
    );
  });

  it('should delete a team by ID', () => {
    const createTeamDto: CreateTeamDto = { name: 'Team 1', logo: 'Logo 1' };
    service.createTeam(createTeamDto);
    const deletedTeam = service.deleteTeam(1);
    expect(deletedTeam).toEqual({ id: 1, name: 'Team 1', logo: 'Logo 1' });
    expect(service.getAllTeams()).toEqual([]);
  });

  it('should throw an error if team to delete not found', () => {
    expect(() => service.deleteTeam(999)).toThrow(NotFoundException);
  });
});
