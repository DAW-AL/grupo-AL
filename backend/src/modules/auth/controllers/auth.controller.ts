import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/input/login.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @ApiOperation({ summary: 'Iniciar sesión' })
  @Post()
  async login(@Body() dto: LoginDto): Promise<{ accessToken: string }> {
    return await this.authService.login(dto);
  }
}