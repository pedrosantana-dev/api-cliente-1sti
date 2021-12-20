import { UsuarioDto } from './../DTO/usuario.dto';
import { UsuarioEntity } from './../entity/usuario.entity';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {

    constructor(@InjectRepository(UsuarioEntity) private repo: Repository<UsuarioEntity>) { }

    async cadastrar(usuarioDto: UsuarioDto) {
        const { nome, telefone, cpf, cep, logradouro, cidade, uf } = usuarioDto;

        const usuario = await this.repo.findOne({ cpf });
        if (usuario) {
            throw new BadRequestException('Usuário já cadastrado');
        }
        else {
            const novoUsuario: UsuarioEntity = new UsuarioEntity();
            novoUsuario.nome = nome;
            novoUsuario.telefone = telefone;
            novoUsuario.cpf = cpf;
            novoUsuario.cep = cep;
            novoUsuario.logradouro = logradouro;
            novoUsuario.cidade = cidade;
            novoUsuario.uf = uf;

            this.repo.create(novoUsuario);
            try {
                return await this.repo.save(novoUsuario);
            } catch (error) {
                throw new InternalServerErrorException(error, 'Erro interno do servidor');
            }
        }
    }

    async atualizar(id: number, usuarioDto: UsuarioDto) {
        delete usuarioDto.cpf;
        try {
            const resultado = await this.repo.update({ id }, usuarioDto);
            if (resultado.affected === 0) {
                throw new NotFoundException('Usuário não atualizado');
            }
            return await this.repo.findOne({ id });
        }
        catch (error) {
            throw new InternalServerErrorException(error, 'Erro interno do servidor');
        }
    }

    async remover(id: number) {
        const deletado = await this.repo.delete({ id });

        if (!deletado) {
            return { success: false };
        }
        return { success: true };
    }

    async todosOsUsuarios() {
        return await this.repo.find({});
    }

    async usuarioPorCpf(cpf: string) {
        try {
            const usuario = await this.repo.findOne({ cpf });
            if (!usuario) {
                throw new NotFoundException('Usuário não encontrado');
            }
            return usuario;
        } catch (error) {
            throw new InternalServerErrorException(error, 'Erro interno do servidor');
        }
    }
}
