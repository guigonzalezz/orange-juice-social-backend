import { Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/infraestructure/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/infraestructure/auth/local-auth.guard';
import { AuthService } from 'src/service/auth/auth.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request, @Response() response) {
    const result = await this.authService.login(request.user)
    if (await (result).data) response.status(result.code).send(result)
    else return response.status(result.code).send(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get('usuario')
  getProfile(@Request() req) {
    return req.user;
  }



}