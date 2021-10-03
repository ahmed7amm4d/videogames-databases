import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler 
    ): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
                'x-rapidapi-key': 'a97b731490msh4a1d1002c6e047dp154121jsn8b060bfd7cb6'
            },
            setParams: {
                key: 'aeb769f739f9487d890126980ea568f5'
            }
        });
        return next.handle(req);
    }
}