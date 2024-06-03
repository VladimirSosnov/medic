import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JWTAuthGuard } from 'src/guards/jwt.guard';
import { RegisterDto } from './dto/register.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	@ApiOperation({ summary: 'Вход в личный кабинет' })
	@ApiBody({
		type: LoginDto,
		required: true,
		description: 'Данные пользователя для входа в аккаунт',
	})
	@ApiResponse({ status: 200, description: 'Успешная авторизация' })
	@ApiResponse({ status: 401, description: 'Ошибки авторизации и доступа' })
	@ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
	public async login(@Body() user: LoginDto) {
		return this.authService.login(user);
	}

	// @UseGuards(JWTAuthGuard)uu87
	@Post('register')
	@ApiOperation({ summary: 'Регистрация пользователя' })
	@ApiBody({
		type: RegisterDto,
		required: true,
		description: 'Данные пользователя для входа в аккаунт',
	})
	@ApiResponse({ status: 200, description: 'Успешная регистрация' })
	@ApiResponse({ status: 401, description: 'Ошибки регистрации' })
	@ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
	public async register(@Body() user: RegisterDto) {
		return this.authService.register(user);
	}
}
