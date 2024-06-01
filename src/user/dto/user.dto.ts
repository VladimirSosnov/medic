import { IsString } from 'class-validator';

export class UserDto {
	@IsString()
	email?: string;

	@IsString()
	phone?: string;

	@IsString()
	password: string;

	@IsString()
	name: string;
}