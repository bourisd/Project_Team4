import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetBugsService {

  constructor(private  http: HttpClient) { 
    
  }

  getBugs(): Observable<any> {
    return this.http.get<any>('https://bug-report-system-server.herokuapp.com/bugs');
  }
}
