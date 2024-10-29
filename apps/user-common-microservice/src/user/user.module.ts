import { UserAuthorityRepository } from './repositories/user-authority.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { Auth0Service } from './services/auth0.service';
import { ConfigService } from '@nestjs/config';
import { RoleService } from './services/role.service';
import { RoleRepository } from './repositories/role.repository';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { UserRole } from './entities/user-role.entity';
import { HttpRequestModule } from '../../../../shared/http-requests/http-request.module';
import { PaypalService } from './services/paypal.service';
import { HttpModule } from '@nestjs/axios';
import { S3Module } from '../s3/s3.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    Auth0Service,
    ConfigService,
    RoleService,
    PaypalService,
    UserRepository,
    RoleRepository,
    UserAuthorityRepository,
  ],
  imports: [
    HttpRequestModule,
    HttpModule,
    S3Module,
    TypeOrmModule.forFeature([User, Role, UserRole]),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  exports: [UserService, RoleService],
})
export class UserModule {}
