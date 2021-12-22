import { UserIsUserGuard } from './../auth/guards/UserIsUser.guard';
import { JwtAuthGuard } from './../auth/guards/jwt-guard';
import { UsuarioDto } from './../DTO/usuario.dto';
import { UsuarioService } from './usuario.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    todosOsUsuarios() {
        return this.usuarioService.todosOsUsuarios();
    }

    @Get(':cpf')
    @UseGuards(JwtAuthGuard)
    usuarioPorCPF(@Param('cpf') cpf: string) {
        return this.usuarioService.usuarioPorCpf(cpf);
    }

    @Post()
    cadastrarUsuario(@Body(ValidationPipe) data: UsuarioDto) {
        return this.usuarioService.cadastrar(data);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, UserIsUserGuard)
    autalizarUsuario(@Body(ValidationPipe) data: UsuarioDto,
        @Param('id') id: number) {
        return this.usuarioService.atualizar(id, data);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, UserIsUserGuard)
    removerUsuario(@Param('id') id: number) {
        return this.usuarioService.remover(id);
    }

}
