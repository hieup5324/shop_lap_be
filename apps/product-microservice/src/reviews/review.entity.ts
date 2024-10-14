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

@Entity({ name: 'review' })
export class Review {
  @PrimaryGeneratedColumn({
    name: 'review_id',
  })
  reviewId: number;

  @Column({
    name: 'rating',
    type: 'int',
  })
  rating: number;

  @Column({
    name: 'comment',
    type: 'varchar',
    nullable: true,
    length: 1000,
  })
  comment: string;

  @Column({
    name: 'user_id',
    type: 'varchar',
    length: 255,
  })
  userId: string;

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
  product: Product;
}
