import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  In,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { OrderDetail } from './order-detail.entity';

@Entity({ name: 'order' })
export class Order {
  @PrimaryColumn({
    type: 'char',
    length: 26,
    name: 'order_id',
  })
  orderId: string;

  @PrimaryColumn({
    type: 'char',
    length: 26,
    name: 'product_id',
  })
  productId: string;

  @ManyToOne(() => OrderDetail)
  @JoinColumn({
    name: 'order_id',
    referencedColumnName: 'orderId',
  })
  orderDetail: OrderDetail;

  @ManyToOne(() => Product)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'productId',
  })
  product: Product;

  @Column({
    name: 'amount',
    type: 'int',
  })
  amount: number;

  @Column({
    name: 'price',
    type: 'int',
  })
  price: number;
}
