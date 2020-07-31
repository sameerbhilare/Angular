import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const modifiedReq = req.clone({headers: req.headers.append('Auth','TestAuth')});
        return next.handle(modifiedReq);
    }
    
}