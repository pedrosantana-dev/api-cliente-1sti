import { IsNotEmpty, Length, length, MaxLength, MinLength } from "class-validator";

export class UsuarioDto {

    @IsNotEmpty()
    nome: string;

    @IsNotEmpty()
    @MinLength(10) @MaxLength(11)
    telefone: string;

    @IsNotEmpty()
    @Length(11, 11)
    cpf: string;

    @IsNotEmpty()
    @Length(8)
    cep: string;

    @IsNotEmpty()
    logradouro: string;

    @IsNotEmpty()
    cidade: string;

    @IsNotEmpty()
    @Length(2, 2)
    uf: string;
}