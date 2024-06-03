import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
	@ApiProperty({
		description: 'Email пользователя',
		required: true,
		type: 'string',
		example: 'igorsasalybrata@list.ru',
	})
	@IsEmail()
	email?: string;

	@ApiProperty({
		description: 'Номер телефона пользователя',
		required: true,
		type: 'string',
		example: '89134064578',
	})
	@IsString()
	phone?: string;

	@ApiProperty({
		description: 'Пароль пользователя',
		required: true,
		type: 'string',
		example: 'qwert12345',
	})
	@IsString()
	password: string;

	@ApiProperty({
		description: 'Имя пользователя',
		required: true,
		type: 'string',
		example: 'Igor Sasalov',
	})
	@IsString()
	name: string;
}
