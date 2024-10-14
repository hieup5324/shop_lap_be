import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity({ name: 'order-detail' })
export class OrderDetail {
  @PrimaryColumn({
    name: 'order_id',
    type: 'char',
    length: 26,
  })
  orderId: string;

  @Column({
    name: 'user_id',
    type: 'char',
    length: 26,
    nullable: false,
  })
  userId: string;

  @Column({
    name: 'is_paid',
    type: 'boolean',
    default: false,
  })
  isPaid: boolean;

  @Column({
    name: 'address_id',
    type: 'int',
  })
  addressId: number;

  @Column({
    name: 'ward_code',
    type: 'varchar',
    length: 10,
  })
  wardCode: string;

  @Column({
    name: 'note',
    type: 'varchar',
    nullable: true,
    length: 100,
  })
  note: string;

  @OneToMany(() => Order, (order) => order.orderDetail)
  orderDetail: OrderDetail[];

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt: Date;
}
