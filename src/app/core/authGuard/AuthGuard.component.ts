import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UtilService } from '../../common/services/util.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private utilService: UtilService,
        private router: Router
    ) {

    }

    canActivate(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const user = this.utilService.getUser()
            if (!user) {
                this.router.navigateByUrl('/login')
                resolve(false)
            }

            if (!!user.Funcao && (user.Funcao == 'baba' || user.Funcao == 'pais')) {
                resolve(true)
            } else {
                console.log('entro')
                this.router.navigateByUrl('/login')
                resolve(false)
            }
        })
    }

}
