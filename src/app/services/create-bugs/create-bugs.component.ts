import { Component, OnInit } from '@angular/core';
import { BugModel } from 'src/app/Bug.model';
import { GetBugsService } from '../get-bugs.service';


@Component({
  selector: 'bug-reporting-system-create-bugs',
  templateUrl: './create-bugs.component.html',
  styleUrls: ['./create-bugs.component.scss']
})
export class CreateBugsComponent implements OnInit {
  public bug : BugModel;
  constructor(private createBugs: GetBugsService) {
    this.bug = new BugModel();

   }

  ngOnInit() {
  }

  public async submitbug(){
    try {
      await this.createBugs.createBugs(this.bug).toPromise();

    } catch (error) {
      console.log(error);
    }
    console.log(this.bug);



  }

}
