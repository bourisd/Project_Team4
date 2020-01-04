import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetBugsComponent } from './get-bugs/get-bugs.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateBugsComponent } from './create-bugs/create-bugs.component';
import { RouterModule } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';




@NgModule({
  declarations: [GetBugsComponent, CreateBugsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([]),
    AngularFontAwesomeModule


  ],

  exports: [GetBugsComponent, CreateBugsComponent]
})
export class ServicesModule { }
