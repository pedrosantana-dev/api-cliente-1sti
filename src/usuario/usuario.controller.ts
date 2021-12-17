import { UsuarioDto } from './../DTO/usuario.dto';
import { UsuarioService } from './usuario.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';

@Controller('usuarios')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService) { }

    @Get()
    todosOsUsuarios() {
        return this.usuarioService.todosOsUsuarios();
    }

    @Get(':cpf')
    usuarioPorCPF(@Param('cpf') cpf: string) {
        return this.usuarioService.usuarioPorCpf(cpf);
    }

    @Post()
    cadastrarUsuario(@Body(ValidationPipe) data: UsuarioDto) {
        return this.usuarioService.cadastrar(data);
    }

    @Patch(':id')
    autalizarUsuario(@Body(ValidationPipe) data: UsuarioDto,
        @Param('id') id: number) {
        return this.usuarioService.atualizar(id, data);
    }

    @Delete(':id')
    removerUsuario(@Param('id') id: number) {
        return this.usuarioService.remover(id);
    }

}
