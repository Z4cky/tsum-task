import { Component, OnChanges, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormlyFormOptions, FormlyFieldConfig } from "@ngx-formly/core";
import { IUser } from "../form.model";
import * as moment from "moment";
import { of, Observable } from "rxjs";
import { tap, startWith, map, flatMap } from "rxjs/operators";
@Component({
  selector: "app-form",
  styleUrls: ["./form.component.scss"],
  templateUrl: "./form.component.html",
})
export class FormComponent implements OnChanges, OnInit {
  objectKeys = Object.keys;
  form = new FormGroup({});
  model: Partial<IUser> = {};
  private childrenCount: number = 0;
  private failureCounter: number = 0;
  public result: any;
  public resultArray = [this.result];
  public disabled: boolean = false;
  options: FormlyFormOptions = {
    formState: {
      awesomeIsForced: false,
    },
  };
  fields: FormlyFieldConfig[] = [
    {
      key: "FIO",
      type: "input",
      templateOptions: {
        label: "ФИО",
        pattern: /(.*?[а-яё]){2,}$/,
        placeholder: "ФИО",
        required: true,
      },
      validation: {
        messages: {
          pattern: (error, field: FormlyFieldConfig) => `"${field.formControl.value}" неверное имя`,
        },
      },
    },
    {
      key: "gender",
      type: "radio",
      templateOptions: {
        label: "Пол",
        placeholder: "Пол",
        description: "Выберите пол",
        required: true,
        options: [
          { value: "Мужской", label: "Мужской", genderId: "1" },
          { value: "Женский", label: "Женский", genderId: "2" },
        ],
        valueProp: "value",
        labelProp: "label",
      },
    },
    {
      key: "dateOfBirth",
      type: "datepicker",
      templateOptions: {
        label: "дата рождения",
        options: [],
        required: true,
      },
    },
    {
      key: "family",
      type: "select",
      hideExpression: (model) => (!this.model.dateOfBirth || this.model.dateOfBirth.getFullYear() > new Date().getFullYear() - 18),
      templateOptions: {
        label: "Семейное положение",
        required: false,
        options: [],
        valueProp: "name",
        labelProp: "name",
      },
      validation: {
        show: true
      },
      hooks: {
        onInit: (field) => {
          const family: any = [
            { value: "marriedF", name: "Замужем", genderId: "Женский" },
            { value: "marriedM", name: "Женат", genderId: "Мужской" },
            { value: "divorced", name: "В разводе", genderId: "Мужской" },
            { value: "none", name: "Нет", genderId: "Мужской" },
            { value: "divorced", name: "В разводе", genderId: "Женский" },
            { value: "none", name: "Нет", genderId: "Женский" },
          ];

          const dateControl: any = this.form.get("dateOfBirth");
          field.form.setValue = dateControl.valueChanges.subscribe((data) => {
            if (this.model.dateOfBirth && this.model.dateOfBirth.getFullYear() > new Date().getFullYear() - 18) {
            console.log("less than 18 years old");
            return field.formControl.setValue(null);
            }
          }
          );

          const genderControl: any = this.form.get("gender");
          field.templateOptions.options = genderControl.valueChanges.pipe(
            startWith(genderControl.value),
            map((genderId) => family.filter((gender) => {
              return gender.genderId === genderId;
            })),
            tap((data) => {
              console.log("gender changed", data);
              return field.formControl.setValue(data);
            }),
          );
        },
      },
      expressionProperties: {
        "templateOptions.": "!model.text",
        "templateOptions.required": "field.hide === false",
      },
    },
    {
      key: "kids",
      type: "input",
      hideExpression: (model) => (!this.model.dateOfBirth || this.model.dateOfBirth.getFullYear() > new Date().getFullYear() - 18),
      defaultValue: this.childrenCount,
      templateOptions: {
        label: "Количество детей",
        type: "number",
        class: "theNumber",
        attributes: {
          "min": "0",
          "id": "theNumber"
        },
        pattern: /(^[0-9]+$)/,
        required: false,
      },
      hooks: {
        onInit: field => {
          let listener: any = of(document.addEventListener("keydown", (event: any) => {
            let input: any = document.getElementById("formly_7_input_kids_4");
            if (event.keyCode === 187) {
              console.log("+", this.childrenCount);
              input.stepUp(1);
            } else if (event.keyCode === 189) {
              console.log("-", this.childrenCount);
              input.stepDown(1);
            }
          }));
        },
      },
    },
    {
      key: "email",
      type: "input",
      templateOptions: {
        label: "Email",
        placeholder: "JohnDoe@mail.com",
        required: true,
      },
    },
    {
      key: "comment",
      type: "textarea",
      templateOptions: {
        label: "Комментария",
        pattern: /([а-яё])/,
        required: false,
      },
    },
  ];

  ngOnChanges(): any {
    console.log("change");
  }

  ngOnInit(): any {
    //
  }

  submit(): any {
    if (this.form.valid) {
      this.result = this.model;
      // this.result = (JSON.stringify(this.model));
    } else {
      this.failureCounter++;
      this.disabled = true;
      if (this.failureCounter === 3) {
        this.failureCounter = 0;
        this.options.resetModel();
      }
      console.log(this.failureCounter);
      setTimeout(() => {
        this.disabled = false;
      }, 6000
      );
    }
  }
}