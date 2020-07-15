import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {parseString} from 'xml2js';
import * as xml2js from 'xml2js';

@Injectable()
export class XmlToJsonService {

  parse(input: string): Observable<object> {
    return new Observable<object>(observer => {
        parseString(input, ((err, result) => {
          observer.next(result);
          observer.complete();
        }));
      }
    );
  }
}
