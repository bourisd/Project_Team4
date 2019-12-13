import { Component, OnInit } from "@angular/core";
import { BugList } from "src/app/Bug.model";
import { GetBugsService } from "../get-bugs.service";

@Component({
  selector: "bug-reporting-system-create-bugs",
  templateUrl: "./create-bugs.component.html",
  styleUrls: ["./create-bugs.component.scss"]
})
export class CreateBugsComponent implements OnInit {
  bug: BugList;

  constructor(private createBugs: GetBugsService) {}

  ngOnInit() {
    this.bug = new BugList();
    this.bug = this.createBugs.getData();
    console.log("create bugs component ", this.bug);
  }

  public async submitbug() {
    try {
      await this.createBugs.createBugs(this.bug).toPromise();
    } catch (error) {
      console.log(error);
    }
    console.log(this.bug);
  }
}
