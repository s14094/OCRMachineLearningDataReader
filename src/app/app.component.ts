import {Component, OnInit} from '@angular/core';
import {AppService} from './app.service';
import {MatTableDataSource} from '@angular/material';
import {AppModel} from './app.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'OcrWebDisplay';
  listModel: AppModel[] = [];
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['fieldValue', 'blockId', 'lang', 'lineBaseline', 'lineCenterX', 'lineCenterY',  'lineLeft', 'lineRight', 'lineBottom', 'lineTop',
    'parAlign', 'parStartIndent', 'parLineSpacing', 'cellWidth', 'cellHeight', 'blockType', 'blockName', 'blockLeft', 'blockRight',
    'blockTop', 'blockBottom', 'blockWidth', 'blockHeight', 'pageWidth', 'pageHeight', 'pageResolution',
    'probabilityInvoiceNumber'];


  constructor(
    private appService: AppService
  ) {
  }


  ngOnInit() {
    this.appService.getData().subscribe(result => {
      this.listModel = result;
      var highestValue = 0;
      for (const model of this.listModel) {
        if (model.probabilityInvoiceNumber > highestValue) {
          highestValue = model.probabilityInvoiceNumber;
        }
      }
      for (let model of this.listModel) {
        if (model.probabilityInvoiceNumber === highestValue) {
          model.probabilityInvoiceNumberColor = 3;
        } else if ((model.probabilityInvoiceNumber > (highestValue - 5)) && (model.probabilityInvoiceNumber < highestValue )) {
          model.probabilityInvoiceNumberColor = 2;
        } else if ((model.probabilityInvoiceNumber > (highestValue - 10)) && (model.probabilityInvoiceNumber < (highestValue - 5))) {
          model.probabilityInvoiceNumberColor = 1;
        } else {
          model.probabilityInvoiceNumberColor = 0;
        }
      }
      console.log(this.listModel);
      this.dataSource = new MatTableDataSource(this.listModel);
    });
  }
}
