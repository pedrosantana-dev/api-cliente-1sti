import { UsuarioLoginDto } from './../DTO/usuarioLogin.dto';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    login(@Body(ValidationPipe) loginDTO: UsuarioLoginDto) {
        return this.authService.loginUsuario(loginDTO);
    }
}
