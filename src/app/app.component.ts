import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {AppService} from './app.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AppModel} from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'OcrWebDisplay';
  appModel: AppModel = new AppModel();
  dataSource = new MatTableDataSource();

  bBasicData = true;
  bInvoiceNum = false;
  bDateCreate = false;
  bNIP = false;
  bContractorName = false;
  bDatePayment = false;
  bPaymentMethod = false;
  bPaymentTerms = false;


  displayedColumns: string[] = ['fieldValue', 'parId', 'pageId', 'blockId', 'lang', 'lineBaseline', 'lineLeft', 'lineRight', 'lineBottom',
    'lineTop', 'lineCenterX', 'lineCenterY', 'parAlign', 'parStartIndent', 'parLineSpacing', 'cellWidth', 'cellHeight', 'blockType',
    'blockName', 'blockLeft', 'blockRight', 'blockTop', 'blockBottom', 'blockWidth', 'blockHeight', 'pageWidth', 'pageHeight',
    'pageResolution'];

  basicDataColumns: string[] = ['parId', 'pageId', 'blockId', 'lang', 'lineBaseline', 'lineLeft', 'lineRight', 'lineBottom',
    'lineTop', 'lineCenterX', 'lineCenterY', 'parAlign', 'parStartIndent', 'parLineSpacing', 'cellWidth', 'cellHeight', 'blockType',
    'blockName', 'blockLeft', 'blockRight', 'blockTop', 'blockBottom', 'blockWidth', 'blockHeight', 'pageWidth', 'pageHeight',
    'pageResolution'];

  invoiceNumberColumns: string[] = ['probabilityInvoiceNumber', 'probInvoiceNumPositionWeight', 'probInvoiceNumKeyDistanceWeight',
    'probInvoiceNumStructureWeight', 'probInvoiceLineStructureWeight'];

  dateCreateColumns: string[] = ['probabilityInvoiceDateCreate', 'probInvoiceDateCreatePositionWeight', 'probInvoiceDateCreateAlignWeight',
    'probInvoiceDateCreateRangeWeight', 'probInvoiceDateCreateDateStructureWeight'];

  nipColumns: string[] = ['probabilityInvoiceNipContractor', 'probInvoiceNipContractorPositionWeight', 'probInvoiceNipContractorRangeNipWeight',
    'probInvoiceNipContractorRangeKeyWeight', 'probInvoiceNipContractorAlignWeight', 'probInvoiceNipContractorStructureWeight',
    'probInvoiceNipContractorBlockStructureWeight'];

  contractorNameColumns: string[] = [];

  datePaymentColumns: string[] = ['probabilityInvoiceDatePayment', 'probInvoiceDatePaymentRangeWeight',
    'probInvoiceDatePaymentAlignWeight', 'probInvoiceDatePaymentDateStructureWeight'];

  paymentMethodColumns: string[] = [];

  paymentTermsColumns: string[] = [];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private appService: AppService,
    public dialog: MatDialog
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

  openDialog(): void {
    const dialogRef = this.dialog.open(ResultDialog, {
      width: '250px',
      data: {
        bestResultNumber: this.appModel.invoiceNumber.fieldValue,
        bBestResultNumber: this.appModel.invoiceNumber.invoiceNumber.probabilityInvoiceNumber,
        bestResultDateCreate: this.appModel.invoiceDateCreate.fieldValue,
        bBestResultDateCreate: this.appModel.invoiceDateCreate.invoiceDateCreate.probabilityInvoiceDateCreate,
        bestResultNip: this.appModel.invoiceNip.fieldValue,
        bBestResultNip: this.appModel.invoiceNip.invoiceNip.probabilityInvoiceNipContractor,
        bestResultDatePayment: this.appModel.invoiceDatePayment.fieldValue,
        bBestResultDatePayment: this.appModel.invoiceDatePayment.invoiceDatePayment.probabilityInvoiceDatePayment
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
    this.appService.getData().subscribe(result => {
      this.appModel = result;
      var highestValueInvoiceNum = 0;
      var highestValueInvoiceDateCreate = 0;
      var highestValueInvoiceNipContractor = 0;
      var highestValueInvoiceDatePayment = 0;
      for (const model of this.appModel.valueFieldList) {
        if (model.invoiceNumber.probabilityInvoiceNumber > highestValueInvoiceNum) {
          highestValueInvoiceNum = model.invoiceNumber.probabilityInvoiceNumber;
        }
        if (model.invoiceDateCreate.probabilityInvoiceDateCreate > highestValueInvoiceDateCreate) {
          highestValueInvoiceDateCreate = model.invoiceDateCreate.probabilityInvoiceDateCreate;
        }
        if (model.invoiceNip.probabilityInvoiceNipContractor > highestValueInvoiceNipContractor) {
          highestValueInvoiceNipContractor = model.invoiceNip.probabilityInvoiceNipContractor;
        }
        if (model.invoiceDatePayment.probabilityInvoiceDatePayment > highestValueInvoiceDatePayment) {
          highestValueInvoiceDatePayment = model.invoiceDatePayment.probabilityInvoiceDatePayment;
        }
      }
      for (let model of this.appModel.valueFieldList) {
        if (model.invoiceNumber.probabilityInvoiceNumber === highestValueInvoiceNum) {
          model.invoiceNumber.probabilityInvoiceNumberColor = 3;
        } else if ((model.invoiceNumber.probabilityInvoiceNumber > (highestValueInvoiceNum - 5)) && (model.invoiceNumber.probabilityInvoiceNumber < highestValueInvoiceNum)) {
          model.invoiceNumber.probabilityInvoiceNumberColor = 2;
        } else if ((model.invoiceNumber.probabilityInvoiceNumber > (highestValueInvoiceNum - 10)) && (model.invoiceNumber.probabilityInvoiceNumber < (highestValueInvoiceNum - 5))) {
          model.invoiceNumber.probabilityInvoiceNumberColor = 1;
        } else {
          model.invoiceNumber.probabilityInvoiceNumberColor = 0;
        }

        if (model.invoiceDateCreate.probabilityInvoiceDateCreate === highestValueInvoiceDateCreate) {
          model.invoiceDateCreate.probabilityInvoiceDateCreateColor = 3;
        } else if ((model.invoiceDateCreate.probabilityInvoiceDateCreate > (highestValueInvoiceDateCreate - 5)) && (model.invoiceDateCreate.probabilityInvoiceDateCreate < highestValueInvoiceDateCreate)) {
          model.invoiceDateCreate.probabilityInvoiceDateCreateColor = 2;
        } else if ((model.invoiceDateCreate.probabilityInvoiceDateCreate > (highestValueInvoiceDateCreate - 10)) && (model.invoiceDateCreate.probabilityInvoiceDateCreate < (highestValueInvoiceDateCreate - 5))) {
          model.invoiceDateCreate.probabilityInvoiceDateCreateColor = 1;
        } else {
          model.invoiceDateCreate.probabilityInvoiceDateCreateColor = 0;
        }

        if (model.invoiceNip.probabilityInvoiceNipContractor === highestValueInvoiceNipContractor) {
          model.invoiceNip.probabilityInvoiceNipContractorColor = 3;
        } else if ((model.invoiceNip.probabilityInvoiceNipContractor > (highestValueInvoiceNipContractor - 5)) && (model.invoiceNip.probabilityInvoiceNipContractor < highestValueInvoiceNipContractor)) {
          model.invoiceNip.probabilityInvoiceNipContractorColor = 2;
        } else if ((model.invoiceNip.probabilityInvoiceNipContractor > (highestValueInvoiceNipContractor - 10)) && (model.invoiceNip.probabilityInvoiceNipContractor < (highestValueInvoiceNipContractor - 5))) {
          model.invoiceNip.probabilityInvoiceNipContractorColor = 1;
        } else {
          model.invoiceNip.probabilityInvoiceNipContractorColor = 0;
        }

        if (model.invoiceDatePayment.probabilityInvoiceDatePayment === highestValueInvoiceDatePayment) {
          model.invoiceDatePayment.probabilityInvoiceDatePaymentColor = 3;
        } else if ((model.invoiceDatePayment.probabilityInvoiceDatePayment > (highestValueInvoiceDatePayment - 5)) && (model.invoiceDatePayment.probabilityInvoiceDatePayment < highestValueInvoiceDatePayment)) {
          model.invoiceDatePayment.probabilityInvoiceDatePaymentColor = 2;
        } else if ((model.invoiceDatePayment.probabilityInvoiceDatePayment > (highestValueInvoiceDatePayment - 10)) && (model.invoiceDatePayment.probabilityInvoiceDatePayment < (highestValueInvoiceDatePayment - 5))) {
          model.invoiceDatePayment.probabilityInvoiceDatePaymentColor = 1;
        } else {
          model.invoiceDatePayment.probabilityInvoiceDatePaymentColor = 0;
        }

      }
      console.log(this.appModel.valueFieldList.length);
      if (this.appModel != null && this.appModel.valueFieldList.length > 0) {
        console.log(this.appModel.valueFieldList[0]);
      }
      this.dataSource = new MatTableDataSource(this.appModel.valueFieldList);
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

export interface DialogData {
  bestResultNumber: string;
  bBestResultNumber: string;
  bestResultDateCreate: string;
  bBestResultDateCreate: string;
  bestResultNip: string;
  bBestResultNip: string;
  bestResultDatePayment: string;
  bBestResultDatePayment: string;
}

@Component({
  selector: 'app-result-dialog',
  templateUrl: 'result-dialog.html',
})
// tslint:disable-next-line:component-class-suffix
export class ResultDialog {

  constructor(
    public dialogRef: MatDialogRef<ResultDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
