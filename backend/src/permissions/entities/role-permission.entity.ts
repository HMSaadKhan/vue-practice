// // meal-nutrition.entity.ts
// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
// import { Permission, Role } from './';
// import { NutritionFact } from 'src/nutrition-fact/entities';


// @Entity()
// export default class RolePermission {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(type => Role, role => role.nutrition)
//   @JoinColumn({ name: 'role_id' })
//   role: Role;

//   @ManyToOne(type => NutritionFact, nutrition => nutrition.nutrition)
//   @JoinColumn({ name: 'permission_id' })
//   permission: Permission;

//   @Column({ type: 'float', nullable: true })
//   value: number;
  
// }