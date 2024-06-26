import { IsString, IsNotEmpty } from 'class-validator';

export class SudoDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
