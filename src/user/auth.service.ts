import {
	BadRequestException,
	HttpException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { User } from './auth.model';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
		private readonly jwtService: JwtService,
	) {}

	public async login(user: LoginDto) {
		const { id } = await this.validateUser(user);
		const jwtToken = await this.createToken(id);
		return { token: jwtToken };
	}

	public async register(userData: RegisterDto) {
		if (userData.email && userData.phone) {
			throw new UnauthorizedException(
				`Запрос должен иметь email: ${userData.email} или phone_number: ${userData.phone}`,
			);
		}
		const where: any = {};
		if (userData.email) where.email = userData.email;
		else where.phone = userData.phone;

		const existsUser = await this.userRepository.findOne({
			where,
		});

		if (existsUser) {
			throw new UnauthorizedException(`Пользователь уже существует`);
		}
		const user = await new User(userData.email, userData.phone, userData.name, '').setPassword(
			userData.password,
		);
		const newUser = await this.userRepository.save(user);
		const result = newUser.email ? { email: newUser.email } : { phone: newUser.phone };
		return result;
	}

	async createToken(id: number): Promise<string> {
		const payload = { id };
		return this.jwtService.signAsync(payload);
	}

	async validateUser(user) {
		if (user.email && user.phone) {
			throw new UnauthorizedException(
				`Запрос должен иметь email: ${user.email} или phone_number: ${user.phone}`,
			);
		}
		const where: any = {};
		if (user.email) where.email = user.email;
		else where.phone = user.phone;
		const existsUser = await this.userRepository.findOne({
			where,
		});
		if (!existsUser) {
			throw new UnauthorizedException(`Ошибка! Неверный логин или пароль`);
		}
		const isCorrectPassword = await new User(
			existsUser.email,
			existsUser.phone,
			existsUser.name,
			existsUser.passwordHash,
		).validatePassword(user.password);
		if (!isCorrectPassword) {
			throw new UnauthorizedException(`Ошибка! Неверный логин или пароль`);
		}
		return { id: existsUser.id };
	}
}
