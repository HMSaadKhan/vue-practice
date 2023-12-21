import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import UserSubscription from 'src/subscription/entities/user-subscription.entity';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15 })
  username: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'varchar', length: 15 })
  phoneNo: string;

  @Column({ type: 'boolean', default: 1 })
  status: boolean;

  @Column({ type: 'float', default: 0.0 })
  points: Float32Array; 

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', default : null })
  confirmPassword: string;

  @Column({ type: 'varchar', default: null })
  resetToken: string;

  @Column({ type: 'timestamp', default: null })
  resetTokenExpiration: Date;

  // @OneToMany(() => UserSubscription, subscription => subscription.user)
  // subscriptions: UserSubscription[];

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}