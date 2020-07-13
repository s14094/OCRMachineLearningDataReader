import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AppService} from "../app.service";
import {AppModel} from "../output/app.model";

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

  appModel: AppModel = new AppModel();
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
    let tempS = 'PERN';
    if (this.selectedNumberOfInputs === 2) {
      tempS = 'ELBUD';
    }
    console.log('wchodzi');
    this.appService.checkData(this.model.body, tempS).subscribe(result => {
      this.appModel = result.body;
      console.log(this.appModel);
      localStorage.setItem('dataSource', JSON.stringify(this.appModel));
    }, error => {

    }, () => {
      return this.router.navigate(['/output']);
    });
  }
}
