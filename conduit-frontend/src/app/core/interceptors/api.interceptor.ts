import { environment } from "../../../environments/environment";
import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class ApiInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let url = req.url;

    //feed endpoint needs trailing slash
    if (url.startsWith("/articles/feed")) {
      url = url.replace("/articles/feed", "/articles/feed/");
    }

    //remove trailing slash (except feed)
    else if (url.endsWith("/")) {
      url = url.slice(0, -1);
    }

    const apiReq = req.clone({
      url: `${environment.apiUrl}${url}`,
    });

    return next.handle(apiReq);
  }
}
