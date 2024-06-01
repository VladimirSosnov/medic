import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../user.interface';

@Entity({ name: 'User' })
export class UserEntity implements IUser {
	@PrimaryGeneratedColumn('increment')
	id: number;

	@Column({ type: 'text', nullable: true })
	email: string;

	@Column({ type: 'text', nullable: true })
	phone: string;

	@Column({ type: 'text' })
	passwordHash: string;

	@Column({ type: 'text' })
	name: string;
}
