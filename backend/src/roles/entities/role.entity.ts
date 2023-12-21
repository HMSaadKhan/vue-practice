import Admin from 'src/admin/entities/admin.entity';
import { Permission } from 'src/permissions/entities';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export default class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false})
  role: string;

  @OneToMany(() => Admin, (admin) => admin.role_id)
  admin: Admin[];

  @ManyToMany(() => Permission, (permission) => permission.roles,{
    onDelete: 'CASCADE'
  })
  @JoinTable({
    name: 'role_permission',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions: Permission[];
}