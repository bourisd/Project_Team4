import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetBugsComponent } from './get-bugs/get-bugs.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateBugsComponent } from './create-bugs/create-bugs.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [GetBugsComponent, CreateBugsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild([])

  ],
  
  exports: [GetBugsComponent, CreateBugsComponent]
})
export class ServicesModule { }
