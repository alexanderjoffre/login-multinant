import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

	@IsString()
	@IsNotEmpty()
  name: string;
	
	@IsString()
	@IsNotEmpty()
  lastname: string;

	@IsString()
	@IsNotEmpty()
  surname: string;

	@IsString()
	@IsNotEmpty()
  birthdate: string;

	@IsString()
	@IsNotEmpty()
  email: string;

	@IsString()
	@IsNotEmpty()
  password: string;
	
}