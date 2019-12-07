import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetBugsComponent } from './get-bugs/get-bugs.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [GetBugsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  
  exports: [GetBugsComponent]
})
export class ServicesModule { }
