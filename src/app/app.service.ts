import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppModel} from './output/app.model';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AppService {

  constructor(private http: HttpClient) {
  }

  getData() {
    return this.http.get<AppModel>('http://localhost:8080/ocrdataconverter/xml/');
  }


  checkData(body: string, header: string) {
    let headers = new HttpHeaders();
    headers = headers.append('DMS-Recipient-Id', header);

    return this.http.post<string>('http://localhost:8080/ocrdataconverter/xml/uploadFromWeb', body, {headers, observe: 'response'}).pipe(
      map((data: any) => {
        return data;
      }), catchError(err => {
        return throwError('Something went wrong! ', err);
      })
    );
  }
}
