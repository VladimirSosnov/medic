import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { JWTAuthGuard } from 'src/guards/jwt.guard';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('login')
	public async login(@Body() auth: UserDto) {
		return this.userService.login(auth);
	}

	// @UseGuards(JWTAuthGuard)uu87
	@Post('register')
	public async register(@Body() userData: UserDto) {
		return this.userService.register(userData);
	}
}
