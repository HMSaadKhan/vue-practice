import { Role } from 'src/roles/entities';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export default class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  permission: string;

  @ManyToMany(() => Role, (role) => role.permissions, {
    onDelete: 'CASCADE'
  })
  @JoinTable({
    name: 'role_permission',
    joinColumn: { name: 'permission_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];

}