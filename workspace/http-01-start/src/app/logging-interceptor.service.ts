import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class LoggingInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Outgoing Request => '+req.url);
        console.log('Headers => ');
        console.log(req.headers);
        return next.handle(req).pipe(
            tap( event => {
                if(event.type === HttpEventType.Response) {
                    console.log('Incoming Response =>'+event.body);
                }
            })
        );
    }
    
}