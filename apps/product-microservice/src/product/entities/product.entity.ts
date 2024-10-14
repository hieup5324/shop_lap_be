import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { Review } from '../../reviews/review.entity';
import { Discount } from '../../discount/discount.entity';

@Entity({ name: 'product' })
export class Product {
  @PrimaryColumn({
    name: 'product_id',
    type: 'char',
    length: 26,
  })
  productId: string;

  @Column({
    name: 'product_name',
    type: 'varchar',
    length: 100,
  })
  productName: string;

  @Column({
    name: 'type',
    type: 'varchar',
    length: 100,
  })
  type: string;

  @Column({
    name: 'price',
    type: 'int',
  })
  price: number;

  @Column({
    name: 'final_price',
    type: 'int',
    nullable: true,
  })
  finalPrice: number; // Giá sau khi áp dụng giảm giá

  @Column({
    name: 'has_discount',
    type: 'boolean',
    default: false,
  })
  hasDiscount: boolean; // Sản phẩm có giảm giá hay không

  @Column({
    name: 'description',
    type: 'varchar',
    nullable: true,
    length: 100,
  })
  description: string;

  @Column({
    name: 'photoUrl',
    type: 'varchar',
    nullable: true,
    length: 1000,
  })
  photoUrl: string;

  @Column({
    name: 'quantity',
    type: 'int',
  })
  quantity: number;

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

  @ManyToOne(() => Category)
  @JoinColumn({
    name: 'category_id',
    referencedColumnName: 'id',
  })
  category: Category;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[]; // Liên kết với bảng Review

  @OneToMany(() => Discount, (discount) => discount.product)
  discounts: Discount[]; // Liên kết với bảng Discount
}
