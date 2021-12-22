import { UsuarioLoginDto } from './../DTO/usuarioLogin.dto';
import { UsuarioEntity } from './../entity/usuario.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsuarioEntity) private repo: Repository<UsuarioEntity>,
        private jwt: JwtService
    ) { }

    async loginUsuario(usuarioLoginDTO: UsuarioLoginDto) {
        const { cpf } = usuarioLoginDTO;

        const usuario = await this.repo.findOne({ cpf });
        if (!usuario) {
            throw new UnauthorizedException('Usuário inválido');
        }

        const jwtPayload = { cpf };
        const jwtToken = await this.jwt.signAsync(jwtPayload);
        return { token: jwtToken };
    }
}
