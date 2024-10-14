import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../../../shared/share.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { ConfigurationModule } from './config/configuration.module';
import { CartModule } from './cart/cart.module';
import { GHNModule } from './delivery/delivery.module';
import { Category } from './category/entities/category.entity';
import { Invoice } from './invoice/invoice.entity';
import { OrderDetail } from './cart/entities/order-detail.entity';
import { Order } from './cart/entities/order.entity';
import { Review } from './reviews/review.entity';
import { Discount } from './discount/discount.entity';

@Module({
  imports: [
    ProductModule,
    CartModule,
    GHNModule,
    SharedModule,
    ConfigurationModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        entities: [
          Product,
          Order,
          OrderDetail,
          Category,
          Invoice,
          Review,
          Discount,
        ],
        synchronize: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
