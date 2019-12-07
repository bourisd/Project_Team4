import { Component, OnInit } from '@angular/core';
import { GetBugsService } from '../get-bugs.service';
import { FormGroup } from '@angular/forms';
import { VirtualTimeScheduler } from 'rxjs';


@Component({
  selector: 'bug-reporting-system-get-bugs',
  templateUrl: './get-bugs.component.html',
 
})
export class GetBugsComponent implements OnInit {
  form: FormGroup;  
  listdata: BugList[];
  byTitle = false;
  byPriority = false;
  byReporter = false;
  byCreationDate = false;
  byStatus = false;

  constructor(
    private getBugs: GetBugsService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({});
    this.sortByTitle();
  }

  columnSorting (byTitle: boolean, byPriority: boolean, byReporter: boolean, byCreationDate: boolean, byStatus: boolean)
  {
    this.byTitle = byTitle;
    this.byPriority = byPriority;
    this.byReporter = byReporter;
    this.byCreationDate = byCreationDate;
    this.byStatus = byStatus;
  }

  sortByTitle(){
    let dir: string;

    if (this.byTitle == true) {
       dir = 'asc';
       this.columnSorting(false, false, false, false, false);
    }
    else{
      dir = 'desc';
      this.columnSorting(true, false, false, false, false);    

    }
    
      this.getBugs.getBugs('title', dir).subscribe((response) =>
      {    
      console.log(response);
      this.listdata = response;
    })
    }   

    sortByPriority(){
      let dir: string;
  
      if (this.byPriority == true) {
        dir = 'asc';
        this.columnSorting(false, false, false, false, false);
     }
     else{
       dir = 'desc';
       this.columnSorting(false, true, false, false, false);    
 
     }
     
       this.getBugs.getBugs('priority', dir).subscribe((response) =>
       {    
       console.log(response);
       this.listdata = response;
     })
     }

      sortByReporter(){
        let dir: string;
    
     if (this.byReporter == true) {
        dir = 'asc';
        this.columnSorting(false, false, false, false, false);
     }
     else{
       dir = 'desc';
       this.columnSorting(false, false, true, false, false);    
 
     }
     
       this.getBugs.getBugs('reporter', dir).subscribe((response) =>
       {    
       console.log(response);
       this.listdata = response;
     })
     }   

        sortByCreationDate(){
          let dir: string;
      
          if (this.byCreationDate == true) {
            dir = 'asc';
            this.columnSorting(false, false, false, false, false);
         }
         else{
           dir = 'desc';
           this.columnSorting(false, false, false, true, false);    
     
         }
         
           this.getBugs.getBugs('createdAt', dir).subscribe((response) =>
           {    
           console.log(response);
           this.listdata = response;
         })
         }   

          sortByStatus(){
            let dir: string;
        
            if (this.byStatus == true) {
               dir = 'asc';
               this.columnSorting(false, false, false, false, false);
            }
            else{
              dir = 'desc';
              this.columnSorting(false, false, false, false, true);    
        
            }
            
              this.getBugs.getBugs('status', dir).subscribe((response) =>
              {    
              console.log(response);
              this.listdata = response;
            })
            }   
  

}

  


export interface BugList {
  id: number
  title: string
  priority: number
  reporter: string
  createdAt: Date
  status: string
}
