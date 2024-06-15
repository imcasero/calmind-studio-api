import { Test, TestingModule } from '@nestjs/testing';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { NotFoundException } from '@nestjs/common';

describe('TeamsController', () => {
  let controller: TeamsController;
  let service: TeamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamsController],
      providers: [
        {
          provide: TeamsService,
          useValue: {
            getAllTeams: jest.fn().mockReturnValue([]),
            getTeamById: jest
              .fn()
              .mockImplementation((id: number) => ({ id, name: `Team ${id}` })),
            createTeam: jest
              .fn()
              .mockImplementation((name: string) => ({ id: 1, name })),
            updateTeam: jest
              .fn()
              .mockImplementation((id: number, name: string) => ({ id, name })),
            deleteTeam: jest
              .fn()
              .mockImplementation((id: number) => ({ id, name: `Team ${id}` })),
          },
        },
      ],
    }).compile();

    controller = module.get<TeamsController>(TeamsController);
    service = module.get<TeamsService>(TeamsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all teams', () => {
    expect(controller.getAllTeams()).toEqual([]);
    expect(service.getAllTeams).toHaveBeenCalled();
  });

  it('should return a team by ID', () => {
    const id = '1';
    expect(controller.getTeamById(id)).toEqual({ id: 1, name: 'Team 1' });
    expect(service.getTeamById).toHaveBeenCalledWith(1);
  });

  it('should create a new team', () => {
    const name = 'Team 1';
    expect(controller.createTeam(name)).toEqual({ id: 1, name });
    expect(service.createTeam).toHaveBeenCalledWith(name);
  });

  it('should update a team by ID', () => {
    const id = '1';
    const name = 'Updated Team 1';
    expect(controller.updateTeam(id, name)).toEqual({ id: 1, name });
    expect(service.updateTeam).toHaveBeenCalledWith(1, name);
  });

  it('should delete a team by ID', () => {
    const id = '1';
    expect(controller.deleteTeam(id)).toEqual({ id: 1, name: 'Team 1' });
    expect(service.deleteTeam).toHaveBeenCalledWith(1);
  });

  it('should throw an error if team not found by ID', () => {
    const id = '999';
    jest.spyOn(service, 'getTeamById').mockImplementation(() => {
      throw new NotFoundException(`Team with ID ${id} not found`);
    });
    expect(() => controller.getTeamById(id)).toThrow(NotFoundException);
    expect(service.getTeamById).toHaveBeenCalledWith(999);
  });

  it('should throw an error if team to update not found', () => {
    const id = '999';
    const name = 'Updated Team 999';
    jest.spyOn(service, 'updateTeam').mockImplementation(() => {
      throw new NotFoundException(`Team with ID ${id} not found`);
    });
    expect(() => controller.updateTeam(id, name)).toThrow(NotFoundException);
    expect(service.updateTeam).toHaveBeenCalledWith(999, name);
  });

  it('should throw an error if team to delete not found', () => {
    const id = '999';
    jest.spyOn(service, 'deleteTeam').mockImplementation(() => {
      throw new NotFoundException(`Team with ID ${id} not found`);
    });
    expect(() => controller.deleteTeam(id)).toThrow(NotFoundException);
    expect(service.deleteTeam).toHaveBeenCalledWith(999);
  });
});
