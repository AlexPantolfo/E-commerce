import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Verificar se a requisição deve ser ignorada
        if (req.headers.has('Skip-Auth-Interceptor')) {
            const headers = req.headers.delete('Skip-Auth-Interceptor');
            const clonedRequest = req.clone({ headers });
            return next.handle(clonedRequest);
        }

        // Pegue o token do armazenamento local ou qualquer outro local onde você o tenha armazenado
        const token = sessionStorage.getItem('tokenJwt');

        // Clone a requisição para adicionar o cabeçalho de autorização
        let authReq = req;
        if (token) {
            authReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });
        }

        // Passe a requisição modificada para o próximo handler
        return next.handle(authReq);
    }
}
