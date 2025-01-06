import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoadingService } from 'src/app/commons/services/loadingService.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    constructor(private loadingService: LoadingService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loadingService.show();
        return next.handle(request).pipe(
            tap({
                next: (event: HttpEvent<any>) => { },
                error: () => this.loadingService.hide(),
                complete: () => this.loadingService.hide()
            })
        );
    }
}
