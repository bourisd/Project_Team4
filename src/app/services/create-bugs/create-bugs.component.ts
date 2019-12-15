import { Component, OnInit } from "@angular/core";
import { GetBugsService } from "../get-bugs.service";
import { tap } from "rxjs/operators";
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: "bug-reporting-system-create-bugs",
  templateUrl: "./create-bugs.component.html",
  styleUrls: ["./create-bugs.component.scss"]
})
export class CreateBugsComponent implements OnInit {  
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
        title: ['', Validators.required],
        priority: [null, Validators.required],
        reporter: ['', Validators.required],
        description: ['', Validators.required],
        status: ['', Validators.required],        
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
      this.form.patchValue(data);     
    })
  }

  getcomments() {
    return this.formBuilder.group({
      description: [],
      reporter: [],
      id: []
    });
  }

  get commentsArray() {
    return <FormArray>this.form.get('comments');
  }

  addComment() {
    this.commentsArray.push(this.getcomments());
  }
}
