import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../product/entities/product.entity';

@Entity({ name: 'discount' })
export class Discount {
  @PrimaryGeneratedColumn({
    name: 'discount_id',
  })
  discountId: number;

  @Column({
    name: 'discount_percentage',
    type: 'decimal',
    precision: 5,
    scale: 2,
  })
  discountPercentage: number; // Phần trăm giảm giá (VD: 10.00, 20.50)

  @Column({
    name: 'start_date',
    type: 'timestamp',
  })
  startDate: Date; // Ngày bắt đầu khuyến mại

  @Column({
    name: 'end_date',
    type: 'timestamp',
    nullable: true, // cho phép null
  })
  endDate: Date;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  description: string; // Mô tả ngắn gọn về chương trình khuyến mại

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

  @ManyToOne(() => Product)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'productId',
  })
  product: Product; // Liên kết với sản phẩm có khuyến mại
}
