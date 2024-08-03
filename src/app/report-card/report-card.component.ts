import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Title} from "@angular/platform-browser";

export type Student = {
  name: string;
  nic: string;
  subjects: Array<{name: string, marks: number}>
}
@Component({
  selector: 'app-report-card',
  standalone: true,
  imports: [],
  templateUrl: './report-card.component.html',
  styleUrl: './report-card.component.css'
})
export class ReportCardComponent {
  @Input()
  student! : Student;

  @Output()
  close: EventEmitter<any> = new EventEmitter();

  constructor(titleService: Title) {
    titleService.setTitle('Report Card');
  }

  getTotalMarks(){
    let totalMarks = 0;
    this.student.subjects.forEach((subject) => totalMarks += +subject.marks);
    return totalMarks;
  }

  getAvgMarks() {
    return this.getTotalMarks() / this.student.subjects.length;
  }

  getGrade() {
    const avgMarks = this.getAvgMarks();
    if (avgMarks >= 90) return "A+";
    if (avgMarks >= 75) return "A";
    if (avgMarks >= 65) return "B";
    if (avgMarks >= 55) return "C";
    if (avgMarks >= 45) return "S";
    return "F";
  }
}
