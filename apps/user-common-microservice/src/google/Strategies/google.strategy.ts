import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '1011324815504-7dqgi3ifacjt5iuerboua3onvp6carmb.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3001/google/auth/google/callback',
      scope: ['email', 'profile', 'openid'],
      prompt: 'consent',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { id, name, emails, photos } = profile;
    const user = {
      googleId: id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
