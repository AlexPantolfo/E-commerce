import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UtilService } from '../../common/services/util.service';


@Injectable({
    providedIn: 'root'
})
export class LoadDataGuard {
    constructor(
        private utilService: UtilService,
    ) { }

    canActivate(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            resolve(true);
        });
    }
}
