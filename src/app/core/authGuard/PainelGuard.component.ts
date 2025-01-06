import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UtilService } from 'src/app/commons/services/util.service';

@Injectable({
    providedIn: 'root'
})
export class PainelGuard implements CanActivate {

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

            if (user.UserID == 80) {
                resolve(true)
            } else {
                this.router.navigateByUrl('/login')
                resolve(false)
            }
        })
    }

}
