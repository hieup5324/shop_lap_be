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
    res.redirect('http://localhost:3001/google/login-google');
  }

  @Get('login-google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    return await this.googleService.googleLogin(req);

    // // Sau khi đăng nhập thành công, gửi thông tin người dùng và access token về frontend
    // const frontendUrl = 'http://localhost:3000'; // Frontend URL
    // res.send(`
    //   <html>
    //     <script>
    //       window.opener.postMessage(${JSON.stringify(
    //         userData,
    //       )}, "${frontendUrl}");
    //       window.close();
    //     </script>
    //   </html>
    // `);
  }
}
