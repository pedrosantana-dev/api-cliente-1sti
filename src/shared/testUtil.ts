import { InternalServerErrorException } from '@nestjs/common';
import { UsuarioEntity } from './../entity/usuario.entity';
export class TestUtil {
    static obterUsuarioValido(): UsuarioEntity {
        const usuario = new UsuarioEntity();
        usuario.id = 1;
        usuario.nome = 'Pedro Santana';
        usuario.telefone = '61981291456';
        usuario.cpf = '01425462305';
        usuario.cep = '71250120';
        usuario.logradouro = 'SCIA Quadra 14 Conjunto 7';
        usuario.cidade = 'Brasília';
        usuario.uf = 'DF'
        return usuario;
    }
}