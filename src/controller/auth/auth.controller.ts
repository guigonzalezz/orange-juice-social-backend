import { Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/infraestructure/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/infraestructure/auth/local-auth.guard';
import { AuthService } from 'src/service/auth/auth.service';
import { BasicResponseDto } from './dto/BasicResponse.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request, @Response() response): Promise<any> {
    const result = await this.authService.login(request.user)
    if (result.data) response.status(result.code).send(result.data)
    else return response.status(result.code).send(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get('usuario')
  getProfile(@Request() req) {
    return req.user;
  }



}