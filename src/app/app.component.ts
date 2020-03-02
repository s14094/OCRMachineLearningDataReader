import {Component, OnInit, ViewChild} from '@angular/core';
import {AppService} from './app.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
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

  bBasicData = true;
  bInvoiceNum = true;
  bDateCreate = false;
  bNIP = false;
  bContractorName = false;
  bDatePayment = false;
  bPaymentMethod = false;
  bPaymentTerms = false;


  displayedColumns: string[] = ['fieldValue', 'parId', 'pageId', 'blockId', 'lang', 'lineBaseline', 'lineLeft', 'lineRight', 'lineBottom',
    'lineTop', 'lineCenterX', 'lineCenterY', 'parAlign', 'parStartIndent', 'parLineSpacing', 'cellWidth', 'cellHeight', 'blockType',
    'blockName', 'blockLeft', 'blockRight', 'blockTop', 'blockBottom', 'blockWidth', 'blockHeight', 'pageWidth', 'pageHeight',
    'pageResolution', 'probabilityInvoiceNumber', 'probInvoiceNumPositionWeight', 'probInvoiceNumKeyDistanceWeight',
    'probInvoiceNumStructureWeight', 'probInvoiceLineStructureWeight'];

  basicDataColumns: string[] = ['parId', 'pageId', 'blockId', 'lang', 'lineBaseline', 'lineLeft', 'lineRight', 'lineBottom',
    'lineTop', 'lineCenterX', 'lineCenterY', 'parAlign', 'parStartIndent', 'parLineSpacing', 'cellWidth', 'cellHeight', 'blockType',
    'blockName', 'blockLeft', 'blockRight', 'blockTop', 'blockBottom', 'blockWidth', 'blockHeight', 'pageWidth', 'pageHeight',
    'pageResolution'];

  invoiceNumberColumns: string[] = ['probabilityInvoiceNumber', 'probInvoiceNumPositionWeight', 'probInvoiceNumKeyDistanceWeight',
    'probInvoiceNumStructureWeight', 'probInvoiceLineStructureWeight'];

  dateCreateColumns: string[] = [];

  nipColumns: string[] = [];

  contractorNameColumns: string[] = [];

  datePaymentColumns: string[] = [];

  paymentMethodColumns: string[] = [];

  paymentTermsColumns: string[] = [];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private appService: AppService
  ) {
  }

  toggleCol(event) {
    this.displayedColumns = ['fieldValue'];
    if (this.bBasicData) {
      this.displayedColumns = this.displayedColumns.concat(this.basicDataColumns);
    }
    if (this.bInvoiceNum) {
      this.displayedColumns = this.displayedColumns.concat(this.invoiceNumberColumns);
    }
    if (this.bDateCreate) {
      this.displayedColumns = this.displayedColumns.concat(this.dateCreateColumns);
    }
    if (this.bNIP) {
      this.displayedColumns = this.displayedColumns.concat(this.nipColumns);
    }
    if (this.bContractorName) {
      this.displayedColumns = this.displayedColumns.concat(this.contractorNameColumns);
    }
    if (this.bDatePayment) {
      this.displayedColumns = this.displayedColumns.concat(this.datePaymentColumns);
    }
    if (this.bPaymentMethod) {
      this.displayedColumns = this.displayedColumns.concat(this.paymentMethodColumns);
    }
    if (this.bPaymentTerms) {
      this.displayedColumns = this.displayedColumns.concat(this.paymentTermsColumns);
    }
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
      console.log(this.listModel.length);
      if (this.listModel != null && this.listModel.length > 0) {
        console.log(this.listModel[0]);
      }
      this.dataSource = new MatTableDataSource(this.listModel);
    }, err => {
      console.log(err);
    }, () => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
