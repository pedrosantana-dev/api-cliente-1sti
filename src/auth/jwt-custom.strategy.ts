import { UnauthorizedException } from '@nestjs/common';
import { UsuarioEntity } from './../entity/usuario.entity';
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from 'typeorm';

export class JwtCustomStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(UsuarioEntity) private repo: Repository<UsuarioEntity>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload: { cpf: string }) {
        const { cpf } = payload;
        const usuario = await this.repo.findOne({ cpf });

        if (!usuario) {
            throw new UnauthorizedException();
        }
        return usuario;
    }
}