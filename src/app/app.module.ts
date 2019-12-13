import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ServicesModule } from "./services/services.module";
import { RouterModule, Routes } from "@angular/router";
import { CreateBugsComponent } from "./services/create-bugs/create-bugs.component";
import { GetBugsComponent } from "./services/get-bugs/get-bugs.component";

const routes: Routes = [
  { path: "bugcreation", component: CreateBugsComponent },
  { path: "", component: GetBugsComponent }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    ServicesModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
