import { BadRequestException, Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { UserRepository } from '../../user/repositories/user.repository';
import { ulid } from 'ulid';
import * as bcrypt from 'bcrypt';
import { Auth0UserDto } from '../../user/dtos/auth0-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GoogleService {
  private readonly googleOAuth2Client: OAuth2Client;

  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {
    this.googleOAuth2Client = new OAuth2Client({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      redirectUri: 'http://localhost:3001/google/auth/google/callback',
    });
  }

  async googleLogin(req) {
    const user = req.user;
    const hashedPw = await bcrypt.hash(user.email, 10);
    const newUser: Auth0UserDto = {
      userId: ulid(),
      auth0userId: user.googleId,
      email: user.email,
      password: hashedPw,
      firstName: user.firstName,
      lastName: user.lastName,
      photoUrl: user.picture,
      phone: user.phoneNumber || null,
      auth0user_token: user.accessToken,
      userRole: [],
    };
    await this.addUser(newUser);
    const token = await this.generateToken(newUser);
    return { ...newUser, ...token };
  }

  private async addUser(user: Auth0UserDto) {
    const userdb = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (userdb) throw new BadRequestException('User already exists');
    await this.userRepository.save(user);
  }

  async logout(token: string) {
    await this.revokeAccessToken(token);
  }

  private async revokeAccessToken(accessToken: string): Promise<void> {
    await this.googleOAuth2Client.revokeToken(accessToken);
  }

  private async generateToken(user: any) {
    const access_token = await this.jwtService.signAsync(user, {
      secret: process.env.JWT_SECRET,
    });
    const refresh_token = await this.jwtService.signAsync(user, {
      secret: process.env.JWT_SECRET_REFRESH,
      expiresIn: '7d',
    });
    return { access_token, refresh_token };
  }
}
