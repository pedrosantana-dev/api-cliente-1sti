import { UsuarioEntity } from './../../entity/usuario.entity';
import { UsuarioService } from './../../usuario/usuario.service';
import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from '@nestjs/common';
import { from, Observable, map } from 'rxjs';


@Injectable()
export class UserIsUserGuard implements CanActivate {
    constructor(
        @Inject(forwardRef(() => UsuarioService))
        private usuarioService: UsuarioService
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        const params = request.params;
        const user: UsuarioEntity = request.user;

        return from(this.usuarioService.usuarioPorCpf(user.cpf))
            .pipe(
                map((user: UsuarioEntity) => {
                    let hasPermission = false;

                    if (user.id === Number(params.id)) {
                        hasPermission = true;
                    }

                    return user && hasPermission;
                })
            )
    }
}