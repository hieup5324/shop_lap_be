import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { OrderDetail } from '../entities/order-detail.entity';

@Injectable()
export class CartRepository extends Repository<OrderDetail> {
  constructor(private dataSource: DataSource) {
    super(OrderDetail, dataSource.createEntityManager());
  }

  async getCartIds(cartIds: string[]): Promise<OrderDetail[]> {
    const queryBuilder = this.createQueryBuilder('carts').where(
      'carts.cartId IN (:cartIds)',
      { cartIds: cartIds },
    );
    return await queryBuilder.getMany();
  }
}
