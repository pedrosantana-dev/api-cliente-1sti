import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UsuarioLoginDto {
    @ApiProperty({
        example: '01234567809',
        description: `O CPF é utilizado para gerar o token de autorização`,
    })
    @IsNotEmpty()
    cpf: string;
}