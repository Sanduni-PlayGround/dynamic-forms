import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CustomValidator} from "./custom-validator";
import {ReportCardComponent, Student} from "./report-card/report-card.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, ReportCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private fb = inject(FormBuilder)
  form = this.fb.group({
    nic: ['123456789v', [Validators.required, Validators.pattern(/^\d{9}[Vv]$/)]],
    name: ['Kasun Sampath', [CustomValidator.isBlank, Validators.pattern(/^[A-Za-z ]+$/)]],
    gender: ['male', [Validators.required]],
    subjects: this.fb.array([
      this.createSubjectGroup(),
      this.createSubjectGroup(),
      this.createSubjectGroup()
    ])
  });

  displayReportCard = false;
  get student(): Student{
    return this.form.value as unknown as Student;
  };

  getCssClasses(formControlName: string, formGroup: FormGroup = this.form){
    const control = formGroup.get(formControlName)!;
    return{
      'is-invalid': control.touched && control.invalid,
      'is-valid': control.touched && control.valid
    }
  }
  addNewSubject(){
    this.form.controls.subjects.push(this.createSubjectGroup());
  }

  createSubjectGroup(){
    return this.fb.group({
      name: ['Subject', CustomValidator.isBlank],
      marks: ['50', Validators.required]
    })
  }

  generateReportCard() {
    this.form.markAllAsTouched();
    if(this.form.invalid){
      this.displayReportCard = false;
      alert("Form is invalid, Please fill the form correctly")
    }else{
      this.displayReportCard = true;
    }
  }
}
