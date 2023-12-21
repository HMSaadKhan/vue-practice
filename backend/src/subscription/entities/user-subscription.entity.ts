import User from 'src/users/entities/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export default class UserSubscription {
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() => User, user => user.subscriptions)
  // @JoinColumn({ name: 'user_id' })
  // user: User;

  @Column({ type: 'timestamp', length: 255 })
  start_date: Date;

  @Column({ type: 'timestamp' })
  end_date: Date;

  @Column({ type: 'integer' }) 
  subscription_type: number;
  
  @Column({ type: 'integer', default: null })
  coupon_id: number;

  @Column({ type: 'integer', default: null })
  coupon_uses: BigInteger;

  @Column({ type: 'float', default: null })
  amount: Float32Array;

  @Column({ type: 'float', default: null })
  delivery_amount: Float32Array;

  @Column({ type: 'float', default: null })
  discount_amount: Float32Array;

  @Column({ type: 'boolean', default: null })
  status: boolean;

  
}