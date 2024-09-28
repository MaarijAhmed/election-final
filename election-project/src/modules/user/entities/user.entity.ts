import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from '../../roles/entities/role.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_name' })
  userName: string;

  @OneToOne(() => RoleEntity, (role) => role.user)
  @JoinColumn({name : "role_id"})
  role: RoleEntity;

  @Column({type : "text", name : "role_id"})
  roleId: number;
}
