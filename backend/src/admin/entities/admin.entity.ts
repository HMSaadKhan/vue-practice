import { Entity, PrimaryGeneratedColumn, Column, IntegerType, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import Roles from 'src/roles/entities/role.entity';

@Entity()
export default class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  phoneNo: string;

  @Column({ type: 'boolean', default: 1 })
  status: boolean;

  @Column({ type: 'varchar' }) 
  password: string;
  
  @Column({ type: 'varchar', default: null })
  resetToken: string;

  @Column({ type: 'timestamp', default: null })
  resetTokenExpiration: Date;

  @ManyToOne(() => Roles, (role_id) => role_id.admin)
  @JoinColumn({ name: 'role_id' })
  role_id: Roles;


  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}