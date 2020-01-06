import { Component, OnInit, ViewChild } from "@angular/core";
import { GetBugsService } from "../get-bugs.service";
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
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
  column :string;
  dir: string;
  byTitle = false;
  byPriority = false;
  byReporter = false;
  byCreationDate = false;
  byStatus = false;
  counter = 0;
  pageNumber = 0;
  isButtonNextDisabled = false;
  isButtonPreviousDisabled = false;
  public fireworks = false;
  constructor(private getBugs: GetBugsService,
    private router: Router,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        title: [''],
        priority: [''],
        reporter: [''],
        status: ['']
      }
    )
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
    //let dir: string;
    this.pageNumber = 0;
    this.column = "title";
    if (this.byTitle == true) {
      this.dir = "asc";
      this.columnSorting(false, false, false, false, false);
    } else {
      this.dir = "desc";
      this.columnSorting(true, false, false, false, false);
    }

    this.getBugs.getBugs("title", this.dir).subscribe(response => {
      console.log(response);
      this.listdata = response;
    });
  }

  sortByPriority() {
    //let dir: string;
    this.column = "priority";
    this.pageNumber = 0;
    if (this.byPriority == true) {
      this.dir = "asc";
      this.columnSorting(false, false, false, false, false);
    } else {
      this.dir = "desc";
      this.columnSorting(false, true, false, false, false);
    }

    this.getBugs.getBugs("priority", this.dir).subscribe(response => {
      console.log(response);
      this.listdata = response;
    });
  }

  sortByReporter() {
    //let dir: string;
    this.column = "reporter";
    this.pageNumber = 0;
    if (this.byReporter == true) {
      this.dir = "asc";
      this.columnSorting(false, false, false, false, false);
    } else {
      this.dir = "desc";
      this.columnSorting(false, false, true, false, false);
    }

    this.getBugs.getBugs("reporter", this.dir).subscribe(response => {
      console.log(response);
      this.listdata = response;
    });
  }

  sortByCreationDate() {
    //let dir: string;
    this.column = "createdAt";
    this.pageNumber = 0;
    if (this.byCreationDate == true) {
      this.dir = "asc";
      this.columnSorting(false, false, false, false, false);
    } else {
      this.dir = "desc";
      this.columnSorting(false, false, false, true, false);
    }

    this.getBugs.getBugs("createdAt", this.dir).subscribe(response => {
      console.log(response);
      this.listdata = response;
    });
  }

  sortByStatus() {
    //let dir: string;
    this.column = "status";
    this.pageNumber = 0;
    if (this.byStatus == true) {
      this.dir = "asc";
      this.columnSorting(false, false, false, false, false);
    } else {
      this.dir = "desc";
      this.columnSorting(false, false, false, false, true);
    }

    this.getBugs.getBugs("status", this.dir).subscribe(response => {
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
        this.fireworks = true;
        setTimeout(()=>{ this.fireworks = false; }, 5000);
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
        //this.getBugs.getPaging(this.pageNumber).subscribe(response => {
          this.getBugs.getPaging(this.pageNumber,this.column,this.dir).subscribe(response => {
          this.listdata = response;
        });
      }
  }

  getPreviousPage(){
    if(this.pageNumber > 0){
      this.pageNumber -= 1;
      //this.getBugs.getPaging(this.pageNumber).subscribe(response =>
      this.getBugs.getPaging(this.pageNumber,this.column,this.dir).subscribe(response =>
        {
          this.listdata = response;
        })
  }
}

searchBug(){
  console.log()
  const title = this.form.get('title').value;
  const priority = this.form.get('priority').value;
  const reporter = this.form.get('reporter').value;
  const status = this.form.get('status').value;
  console.log(title);

  this.getBugs.searchBug(title,priority,reporter,status).subscribe(response =>
    {
      this.listdata = response;
    })

    this.isButtonNextDisabled = true;
    this.isButtonPreviousDisabled = true;
    this.form.get('title').setValue('');
    this.form.get('priority').setValue('');
    this.form.get('reporter').setValue('');
    this.form.get('status').setValue('');
}
}
