// team.dto.ts

import {
  IsOptional,
  IsString,
  IsInt,
  IsArray,
  ArrayMinSize,
} from 'class-validator';

export class CreateTeamDto {
  @IsString()
  name: string;

  @IsString()
  logo: string;

  @IsOptional()
  @IsInt()
  coachId?: number;
}

export class UpdateTeamDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  logo?: string;

  @IsOptional()
  @IsInt()
  coachId?: number;
}

export class TeamDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsString()
  logo: string;

  @IsArray()
  @ArrayMinSize(1)
  players: PlayerDto[];

  @IsOptional()
  coachId?: number;
}

export class PlayerDto {
  @IsInt()
  id: number;
}
