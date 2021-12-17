import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuarios')
export class UsuarioEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    telefone: string;

    @Column()
    cpf: string;

    @Column()
    cep: string;

    @Column()
    logradouro: string;

    @Column()
    cidade: string;

    @Column()
    uf: string;

}