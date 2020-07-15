import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AppService} from "../app.service";
import {AppModel, MainModel} from "../output/app.model";

export class InputModel {
  body: string;
  type: string;
}


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  mainModel: MainModel = new MainModel();
  formGroup: FormGroup;
  model: InputModel = new InputModel();
  selectedNumberOfInputs: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private appService: AppService) {

  }

  ngOnInit() {
    this.selectedNumberOfInputs = 1;
    this.formGroup = this.formBuilder.group({
      body: ['']
    });
  }


  getData() {
    localStorage.removeItem('dataSource');
    localStorage.removeItem('dataInput');
    let tempS = 'PERN';
    if (this.selectedNumberOfInputs === 2) {
      tempS = 'ELBUD';
    }
    this.appService.checkData(this.model.body, tempS).subscribe(result => {
      this.mainModel = result.body;
      localStorage.setItem('dataSource', JSON.stringify(this.mainModel));
      localStorage.setItem('dataInput', JSON.stringify(this.model.body));
    }, error => {

    }, () => {
      return this.router.navigate(['/output']);
    });
  }
}
