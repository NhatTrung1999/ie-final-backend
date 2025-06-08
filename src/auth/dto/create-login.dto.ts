import { IsNotEmpty } from 'class-validator';

export class CreateLoginDto {
  @IsNotEmpty({ message: 'Please do not it blank!' })
  account: string;

  @IsNotEmpty({ message: 'Please do not it blank!' })
  password: string;

  @IsNotEmpty({ message: 'Please do not it blank!' })
  factory: string;
}
