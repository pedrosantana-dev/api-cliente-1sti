import { IsNotEmpty } from "class-validator";

export class UsuarioLoginDto {
    @IsNotEmpty()
    cpf: string;
}