import { Component, OnInit } from "@angular/core";
import { BugList } from "src/app/Bug.model";
import { GetBugsService } from "../get-bugs.service";
import { tap } from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: "bug-reporting-system-create-bugs",
  templateUrl: "./create-bugs.component.html",
  styleUrls: ["./create-bugs.component.scss"]
})
export class CreateBugsComponent implements OnInit {
  // bug: BugList;
  form: FormGroup
  bugId: string

  constructor(private createBugs: GetBugsService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.bugId = this.activatedRoute.snapshot.params["id"]
    this.getBug(this.bugId)
    // this.bug = new BugList();
    // this.bug = this.createBugs.getData();
    this.initializeFormState();
  }

  initializeFormState() {
    this.form = new FormGroup(
      {
        title: new FormControl(),
        priority: new FormControl(),
        reporter: new FormControl(),
        description: new FormControl(),
        status: new FormControl(),
        freeText: new FormControl(),
        nameOfReporter: new FormControl()
      }
    )
  }

  submitbug() {
    if (this.form.invalid) {
      return
    }

    const actionToInvoke = this.bugId
      ? this.createBugs.editBug(this.bugId, this.form.value)
      : this.createBugs.createBugs(this.form.value)


    actionToInvoke.pipe(
      tap(() => this.router.navigate([""]))
    ).subscribe()

  }

  private getBug(id) {
    if (!id) {
      return
    }
    this.createBugs.getBug(id).subscribe(data => {
      this.form.patchValue(data)
    })
  }
}
