import { IsInt, IsString, MinLength } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsInt()
  teamId: number;

  @IsString()
  @MinLength(1)
  role: string;
}
