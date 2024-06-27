import { IsInt, IsString, IsDate, MinLength } from 'class-validator';

export class Player {
  @IsInt()
  id: number;

  @IsString()
  @MinLength(1)
  name: string;

  @IsInt()
  teamId: number;

  @IsString()
  @MinLength(1)
  role: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
