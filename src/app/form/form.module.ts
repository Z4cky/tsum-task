import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormComponent } from "./form/form.component";
import { FormlyMatDatepickerModule } from "@ngx-formly/material/datepicker";
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatRadioModule,
  MatDatepickerModule,
  MatSelectModule,
  MatNativeDateModule,
} from "@angular/material";
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { FormlyModule } from "@ngx-formly/core";
import { FormlyMaterialModule } from "@ngx-formly/material";

const modules: any[] = [
  CommonModule,
  BrowserAnimationsModule,
  ReactiveFormsModule,
  FormlyMaterialModule,
  FormlyModule.forRoot({
    validationMessages: [
      { name: "required", message: "This field is required" },
    ],
  }),
  MatNativeDateModule,
  FormlyMatDatepickerModule,
];

@NgModule({
  imports:      [
    ...modules,
  ],
  declarations: [
    FormComponent,
  ],
  exports: [
    FormComponent,
  ],
})
export class FormModule { }
