import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ServicesModule } from './services/services.module';

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,    
    ReactiveFormsModule,
    ServicesModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
