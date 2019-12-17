import { Component, OnInit, ViewChild } from "@angular/core";
import { GetBugsService } from "../get-bugs.service";
import { FormGroup, FormControl } from "@angular/forms";
import { BugList } from "./../../Bug.model";
import { Router } from "@angular/router";

@Component({
  selector: "bug-reporting-system-get-bugs",
  templateUrl: "./get-bugs.component.html",
  styleUrls: ["./get-bugs.component.scss"]
})
export class GetBugsComponent implements OnInit {
  form: FormGroup;
  listdata: BugList[];
  byTitle = false;
  byPriority = false;
  byReporter = false;
  byCreationDate = false;
  byStatus = false;
  counter = 0;
  pageNumber = 0;

  constructor(private getBugs: GetBugsService, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({});
    this.sortByTitle();
  }

  columnSorting(
    byTitle: boolean,
    byPriority: boolean,
    byReporter: boolean,
    byCreationDate: boolean,
    byStatus: boolean
  ) {
    this.byTitle = byTitle;
    this.byPriority = byPriority;
    this.byReporter = byReporter;
    this.byCreationDate = byCreationDate;
    this.byStatus = byStatus;
  }

  sortByTitle() {
    let dir: string;

    if (this.byTitle == true) {
      dir = "asc";
      this.columnSorting(false, false, false, false, false);
    } else {
      dir = "desc";
      this.columnSorting(true, false, false, false, false);
    }

    this.getBugs.getBugs("title", dir).subscribe(response => {
      console.log(response);
      this.listdata = response;
    });
  }

  sortByPriority() {
    let dir: string;

    if (this.byPriority == true) {
      dir = "asc";
      this.columnSorting(false, false, false, false, false);
    } else {
      dir = "desc";
      this.columnSorting(false, true, false, false, false);
    }

    this.getBugs.getBugs("priority", dir).subscribe(response => {
      console.log(response);
      this.listdata = response;
    });
  }

  sortByReporter() {
    let dir: string;

    if (this.byReporter == true) {
      dir = "asc";
      this.columnSorting(false, false, false, false, false);
    } else {
      dir = "desc";
      this.columnSorting(false, false, true, false, false);
    }

    this.getBugs.getBugs("reporter", dir).subscribe(response => {
      console.log(response);
      this.listdata = response;
    });
  }

  sortByCreationDate() {
    let dir: string;

    if (this.byCreationDate == true) {
      dir = "asc";
      this.columnSorting(false, false, false, false, false);
    } else {
      dir = "desc";
      this.columnSorting(false, false, false, true, false);
    }

    this.getBugs.getBugs("createdAt", dir).subscribe(response => {
      console.log(response);
      this.listdata = response;
    });
  }

  sortByStatus() {
    let dir: string;

    if (this.byStatus == true) {
      dir = "asc";
      this.columnSorting(false, false, false, false, false);
    } else {
      dir = "desc";
      this.columnSorting(false, false, false, false, true);
    }

    this.getBugs.getBugs("status", dir).subscribe(response => {
      console.log(response);
      this.listdata = response;
    });
  }

  editSelectedBug(bugId: number) {    
    this.router.navigate(["/bugcreation", bugId]);
  }

  deleteBug(bugId: string, index: number){
     this.getBugs.deleteBug(bugId).subscribe(response =>
      {
        console.log(response);
        if (response){
          let afterDeleteArray = [...this.listdata];
          afterDeleteArray.splice(index, 1);
          this.listdata = [...afterDeleteArray];
          this.getBugs.getBugsAfterDelete().subscribe(response =>
            {
              this.listdata = response;
            });          
        }
      })
  }

  getNextPage() {        
      if(this.listdata.length == 14){        
        this.pageNumber += 1
        this.getBugs.getPaging(this.pageNumber).subscribe(response => {          
          this.listdata = response;
          if(this.listdata.length < 14){
           this.form.get('next').disable();
          }                      
        });
      }    
  }

  getPreviousPage(){
    if(this.pageNumber > 0){
      this.pageNumber -= 1;
      this.getBugs.getPaging(this.pageNumber).subscribe(response =>
        {
          this.listdata = response;
        })
  }
}
}
