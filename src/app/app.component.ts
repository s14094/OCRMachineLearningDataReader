import {Component, OnInit, ViewChild} from '@angular/core';
import {AppService} from './app.service';
import {MatSort, MatTableDataSource} from '@angular/material';
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
  displayedColumns: string[] = ['fieldValue', 'pageId', 'blockId', 'lang', 'lineBaseline', 'lineLeft', 'lineRight', 'lineBottom', 'lineTop',
    'lineCenterX', 'lineCenterY',
    'parAlign', 'parStartIndent', 'parLineSpacing', 'cellWidth', 'cellHeight', 'blockType', 'blockName', 'blockLeft', 'blockRight',
    'blockTop', 'blockBottom', 'blockWidth', 'blockHeight', 'pageWidth', 'pageHeight', 'pageResolution',
    'probabilityInvoiceNumber', 'probInvoiceNumPositionWeight', 'probInvoiceNumKeyDistanceWeight', 'probInvoiceNumStructureWeight'];


  @ViewChild(MatSort) sort: MatSort;

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
        } else if ((model.probabilityInvoiceNumber > (highestValue - 5)) && (model.probabilityInvoiceNumber < highestValue)) {
          model.probabilityInvoiceNumberColor = 2;
        } else if ((model.probabilityInvoiceNumber > (highestValue - 10)) && (model.probabilityInvoiceNumber < (highestValue - 5))) {
          model.probabilityInvoiceNumberColor = 1;
        } else {
          model.probabilityInvoiceNumberColor = 0;
        }
      }
      console.log(this.listModel);
      this.dataSource = new MatTableDataSource(this.listModel);
    }, err => {
      console.log(err);
    }, () => {
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
