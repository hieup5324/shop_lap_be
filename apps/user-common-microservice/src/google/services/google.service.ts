import { BadRequestException, Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { User } from '../../user/entities/user.entity';
import { UserRepository } from '../../user/repositories/user.repository';
import { ulid } from 'ulid';
import { plainToInstance } from 'class-transformer';
import { UserOutput } from '../../user/dtos/user-output.dto';

@Injectable()
export class GoogleService {
  private readonly googleOAuth2Client: OAuth2Client;

  constructor(private readonly userRepository: UserRepository) {
    this.googleOAuth2Client = new OAuth2Client({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      redirectUri: 'http://localhost:3001/google/auth/google/callback',
    });
  }

  async googleLogin(req) {
    const user = req.user;
    const newUser = plainToInstance(User, {
      userId: ulid(),
      email: user.email,
      password: user.email, // Mật khẩu không nên lưu trữ, hãy xem xét cách khác
      firstName: user.firstName,
      lastName: user.lastName,
      photoUrl: user.picture,
      auth0userId: user.email,
      phone: user.phoneNumber || null,
    });

    // await this.addUser(newUser);
    const token = this.generateToken(user); // Tạo token JWT cho người dùng
    return { userdb: newUser, token };
  }

  private async addUser(user: User) {
    const userdb = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (userdb) throw new BadRequestException('User already exists');
    const newUser = plainToInstance(User, user);
    await this.userRepository.save(newUser);
  }

  async logout(token: string) {
    await this.revokeAccessToken(token);
  }

  private async revokeAccessToken(accessToken: string): Promise<void> {
    await this.googleOAuth2Client.revokeToken(accessToken);
  }

  private generateToken(user: any): string {
    // Implement your JWT token generation logic here
    // Example: return this.jwtService.sign(user);
    return 'JWT_TOKEN'; // Placeholder
  }
}
