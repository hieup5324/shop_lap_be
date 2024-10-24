import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common';
import { GoogleService } from '../services/google.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get('logout-google')
  async logOut(@Req() req, @Res() res) {
    const token = req.headers.authorization?.split(' ')[1];
    await this.googleService.logout(token);
    res.redirect('http://localhost:3001/login-google');
  }

  @Get('login-google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    // Đây sẽ là điểm vào cho Google xác thực
  }

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.googleService.googleLogin(req);
  }
}
