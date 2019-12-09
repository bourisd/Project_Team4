import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { compileDirectiveFromRender2 } from '@angular/compiler/src/render3/view/compiler';
import { BugModel } from '../Bug.model';

@Injectable({
  providedIn: 'root'
})
export class GetBugsService {
  private endpoint = 'https://bug-report-system-server.herokuapp.com/bugs'


  constructor(private http: HttpClient) {


  }

  getBugs(column: string, dir: string): Observable<any> {
    const endpointf = this.endpoint + '?sort=' + column + ',' + dir + '&page=0' + '&size=100';
    console.log(endpointf);
    return this.http.get(endpointf);
  }

  createBugs(bug: BugModel): Observable<any> {


    return this.http.post(this.endpoint,bug);
  }


}
