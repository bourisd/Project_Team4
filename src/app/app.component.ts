import { Component, OnInit } from '@angular/core';
import { GetBugsService } from './services/get-bugs.service';

@Component({
  selector: 'bug-reporting-system-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private getBugs: GetBugsService
  ) { }
  
  ngOnInit() {

    this.getBugs.getBugs().subscribe((response) => {
      console.log(response);        
    });
  }

}

