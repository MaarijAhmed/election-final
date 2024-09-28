import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { RoleType } from '../ennums/role-type.enum';

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'created_by' })
  createdBy: number;

  @Column({ name: 'role_name' })
  roleName: string;

  @OneToOne(() => UserEntity, (user) => user.role )
  user: UserEntity;

  @Column({type : "text"})
  roleType: RoleType;
}
