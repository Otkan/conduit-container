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
  const normalizedUrl = req.url.endsWith("/") ? req.url.slice(0, -1) : req.url;
  const apiReq = req.clone({ url: `${environment.apiUrl}${normalizedUrl}` });
  return next.handle(apiReq);
}
}
