import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BugList } from "../Bug.model";

@Injectable({
  providedIn: "root"
})
export class GetBugsService {
  private endpoint = "https://bug-report-system-server.herokuapp.com/bugs";
  editBugsData: BugList;

  constructor(private http: HttpClient) {}

  getBugs(column: string, dir: string): Observable<any> {
    const endpointf =
      this.endpoint + "?sort=" + column + "," + dir + "&page=0" + "&size=14";
    console.log(endpointf);
    return this.http.get(endpointf);
  }

  getBugsAfterDelete(): Observable<any> { 
    const endpointf =
      this.endpoint + "?sort=title,desc" + "&page=0" + "&size=14";
    console.log(endpointf);   
    return this.http.get(endpointf);
  }

  getBug(id: string): Observable<any> {
    return this.http.get(`${this.endpoint}/${id}`)
  }

  createBugs(bug: BugList): Observable<any> {
    return this.http.post(this.endpoint, bug);
  }

  editBug(id: string, bug: BugList) {
    return this.http.put(`${this.endpoint}/${id}`, bug)
  }

  setData(model: BugList): void {
    this.editBugsData = { ...model };
  }

  getData(): BugList {
    return this.editBugsData;
  }

  getPaging(i: number): Observable<any>{
    const endpointf =
      this.endpoint + "?sort=title,desc" + "&page=" + i + "&size=14";
      return this.http.get(endpointf);
  }

  deleteBug(id: string) {
    return this.http.delete(`${this.endpoint}/${id}`)
  }

  searchBug(title: string, priority:string, reporter: string, status: string): Observable<any>{
    const endpointf = 
    this.endpoint + "?sort=title,desc" + "&page=0"  + "&size=100" + "&title=" + title + "&priority=" + priority + "&reporter=" + reporter + "&status=" + status;
    return this.http.get(endpointf);
  }
}
