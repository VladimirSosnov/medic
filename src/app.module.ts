import { Module } from '@nestjs/common';
import { ChatGateway } from './chat/chat.gateway';
import { AuthModule } from './user/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
	imports: [
		// PassportModule.register({ defaultStrategy: 'jwt' }),
		AuthModule,
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				type: 'postgres',
				host: configService.get('DB_HOST'),
				port: configService.get('DB_PORT'),
				username: configService.get('DB_USERNAME'),
				password: configService.get('DB_PASSWORD'),
				database: configService.get('DB_NAME'),
				synchronize: true,
				entities: [__dirname + '/**/*.entity{.js, .ts}'],
			}),
			inject: [ConfigService],
		}),
		// JwtModule.registerAsync({
		// 	imports: [ConfigModule],
		// 	useFactory: async (configService: ConfigService) => ({
		// 		secret: configService.get<string>('JWT_SECRET'), // берем секретный ключ из конфига сервиса
		// 		// signOptions: { expiresIn: '1h' },
		// 	}),
		// 	inject: [ConfigService],
		// }),
	],
	controllers: [],
	providers: [ChatGateway],
})
export class AppModule {}
