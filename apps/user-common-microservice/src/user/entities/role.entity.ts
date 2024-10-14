import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { UserRole } from './user-role.entity';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryColumn({
    name: 'role_id',
    type: 'char',
    length: 26,
  })
  roleId: string;

  @Column({
    name: 'role_name',
    type: 'varchar',
    length: 100,
  })
  roleName: string;

  @OneToMany(() => UserRole, (userRole) => userRole.role, {
    cascade: true,
  })
  userRole: UserRole[];
}
