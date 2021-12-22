import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, length, MaxLength, MinLength } from "class-validator";

export class UsuarioDto {

    @ApiProperty({
        example: 'Pedro Santana',
        description: `Nome completo do usuário`,
    })
    @IsNotEmpty()
    nome: string;

    @ApiProperty({
        example: '61999280665',
        description: `Telefone do usuário`,
    })
    @IsNotEmpty()
    @MinLength(10) @MaxLength(11)
    telefone: string;

    @ApiProperty({
        example: '01234567809',
        description: `O CPF do usuário`,
    })
    @IsNotEmpty()
    @Length(11, 11)
    cpf: string;

    @ApiProperty({
        example: '72922677',
        description: `O CEP do usuário`,
    })
    @IsNotEmpty()
    @Length(8)
    cep: string;

    @ApiProperty({
        example: 'Quadra',
        description: `O logradouro`,
    })
    @IsNotEmpty()
    logradouro: string;

    @ApiProperty({
        example: 'Brasília',
        description: `A cidade do usuário`,
    })
    @IsNotEmpty()
    cidade: string;

    @ApiProperty({
        example: 'DF',
        description: `O estado do usuário`,
    })
    @IsNotEmpty()
    @Length(2, 2)
    uf: string;
}