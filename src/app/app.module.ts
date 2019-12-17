import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";

import { DataService } from "./services/data-service";
import { FormModule } from "./form/form.module";
import { MatNativeDateModule } from "@angular/material";


@NgModule({
  imports:      [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    FormModule,
    MatNativeDateModule
    // BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    // FoldersResolver,
    DataService,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
