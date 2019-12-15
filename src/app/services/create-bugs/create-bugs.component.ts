import { Component, OnInit } from "@angular/core";
import { BugList } from "src/app/Bug.model";
import { GetBugsService } from "../get-bugs.service";
import { tap } from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: "bug-reporting-system-create-bugs",
  templateUrl: "./create-bugs.component.html",
  styleUrls: ["./create-bugs.component.scss"]
})
export class CreateBugsComponent implements OnInit {
  // bug: BugList;
  form: FormGroup
  commentForm: FormGroup
  bugId: string

  constructor(private createBugs: GetBugsService,
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.bugId = this.activatedRoute.snapshot.params["id"]
    this.getBug(this.bugId)    
    this.initializeFormState();    
  }

  initializeFormState() {
    this.form = this.formBuilder.group(
      {
        title: [],
        priority: [],
        reporter: [],
        description: [],
        status: [],
        freeText: [],
        nameOfReporter: [],
        comments: this.formBuilder.array([this.getcomments()])
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

  getcomments(){
    return this.formBuilder.group({
      description: [],
      reporter: []
    });
  }

  get commentsArray(){
    return <FormArray>this.form.get('comments');
  }

  addComment() { 
    this.commentsArray.push(this.getcomments()); 
  }  
}
