import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRole } from './user-role.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryColumn({
    name: 'user_id',
    type: 'char',
    length: 26,
  })
  userId: string;

  @Column({
    type: 'varchar',
    length: 128,
    name: 'password',
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 128,
    name: 'auth0user_id',
    nullable: true,
  })
  auth0userId?: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'first_name',
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 255,
    charset: 'utf8mb4',
    collation: 'utf8mb4_unicode_ci',
    name: 'last_name',
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'phone',
    nullable: true,
  })
  phone?: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'type',
    nullable: true,
  })
  type?: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'address',
    nullable: true,
  })
  address?: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'photo_url',
    nullable: true,
  })
  photoUrl?: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'email',
  })
  email: string;

  @Column({
    type: 'date',
    name: 'date_of_birth',
    nullable: true,
  })
  dateOfBirth?: Date;

  @Column({ type: 'varchar', nullable: true })
  auth0user_token?: string;

  @OneToMany(() => UserRole, (userRole) => userRole.user, {
    cascade: true,
  })
  userRole: UserRole[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt?: Date;
}
