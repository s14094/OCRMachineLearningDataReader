import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppModel} from './app.model';

@Injectable({providedIn: 'root'})
export class AppService {

  constructor(private http: HttpClient) {
  }

  getData() {
    return this.http.get<AppModel[]>('http://localhost:8080/xml/');
  }
}
