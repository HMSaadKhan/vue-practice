import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class Coupons {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ name: 'owner', type: 'varchar' })
  owner: string;

  @Column({ name: 'coupon_for', type: 'varchar' })
  couponFor: string;

  @Column({ name: 'coupon_count', type: 'integer' })
  couponCount: number;

  @Column({ name: 'limit_type', type: 'varchar' })
  limitType: string;

  @Column({ name: 'max_usable', type: 'integer' })
  maxUsable: number;

  @Column({ name: 'new_user', type: 'boolean', default: 0 })
  newUser: boolean;

  @Column({ name: 'discount_type', type: 'varchar' })
  discountType: string;

  @Column({ name: 'discount_value', type: 'integer' })
  discountValue: number;

  @Column({ name: 'start_date', type: 'timestamp' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'timestamp' })
  endDate: Date;

  @Column({ name: 'coupon_code', type: 'varchar' })
  couponCode:  string;

}
