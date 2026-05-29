import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/input/login.dto';

// Endpoint público, no lleva @UseGuards ni @ApiBearerAuth
// porque es el que genera el token, no lo consume.
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /auth/login
  // Recibe nombre y clave, devuelve el accessToken JWT.
  // El token incluye { nombre, sub, rol } en el payload,
  // que el AuthGuard va a leer en cada request posterior.
  @ApiOperation({ summary: 'Iniciar sesión' })
  @Post()
  async login(@Body() dto: LoginDto): Promise<{ accessToken: string }> {
    return await this.authService.login(dto);
  }
}