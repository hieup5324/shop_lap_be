import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderDetail } from '../cart/entities/order-detail.entity';

export enum PaymentTypeEnum {
  CASH = 'cash',
  VNPAY = 'vnpay',
  MOMO = 'momo',
  PAYPAL = 'paypal',
}

@Entity({ name: 'invoice' })
export class Invoice {
  @PrimaryColumn({
    name: 'invoice_id',
    type: 'char',
    length: 26,
  })
  invoiceId: string;

  @ManyToOne(() => OrderDetail)
  @JoinColumn({
    name: 'order_id',
    referencedColumnName: 'orderId',
  })
  order: OrderDetail;

  @Column()
  paymentType: PaymentTypeEnum;

  @Column({
    name: 'total_amount',
    type: 'int',
  })
  totalAmount: number;

  @Column({
    name: 'payment_status',
    type: 'varchar',
    length: 20,
  })
  paymentStatus: string;

  @Column({
    name: 'payment_date',
    type: 'timestamp',
    nullable: true,
  })
  paymentDate: Date;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
