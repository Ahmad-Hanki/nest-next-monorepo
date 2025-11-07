import {
  Controller,
  Get,
  Request,
  Res,
  Response,
  UseGuards,
} from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Request() req, @Res() res) {
    const userData = await this.authService.login(req.user);
    res.redirect(
      `http://localhost:3000/api/auth/google/success?accessToken=${userData.accessToken}&role=${userData.role}`,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify')
  verifyUser() {
    return 'ok';
  }
}
