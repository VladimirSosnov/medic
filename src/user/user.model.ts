import { compare, genSalt, hash } from 'bcryptjs';
import { IUser } from './user.interface';

export class User implements IUser {
	email?: string;
	phone?: string;
	name: string;
	passwordHash: string;

	constructor(email: string, phone: string, name: string, password: string) {
		this.email = email;
		this.name = name;
		this.passwordHash = password;
		this.phone = phone;
	}

	public async setPassword(password: string) {
		const salt = await genSalt(10);
		this.passwordHash = await hash(password, salt);
		return this;
	}

	public async validatePassword(password: string) {
		return compare(password, this.passwordHash);
	}
}
