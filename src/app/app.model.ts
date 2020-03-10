export class AppModel {
  valueFieldList: ValueField[];
  invoiceNumber: ValueField;
  invoiceDateCreate: ValueField;
  invoiceNip: ValueField;
}

export class ValueField {
  pageWidth: number;
  pageHeight: number;
  pageResolution: number;
  blockType: string;
  blockName: string;
  blockLeft: number;
  blockRight: number;
  blockTop: number;
  blockBottom: number;
  blockCenterCoords: number;
  blockWidth: number;
  blockHeight: number;
  parAlign: string;
  parStartIndent: string;
  parLineSpacing: string;
  lineBaseline: number;
  lineLeft: number;
  lineRight: number;
  lineBottom: number;
  lineTop: number;
  lang: string;
  fieldValue: string;
  cellWidth: number;
  cellHeight: number;
  blockId: number;
  pageId: number;
  parId;
  number;
  lineCenterX: number;
  lineCenterY: number;

  invoiceNumber: InvoiceNumber;
  invoiceDateCreate: InvoiceDateCreate;
  invoiceNip: InvoiceNip;
}

export class InvoiceNumber {
  probabilityInvoiceNumber: number;
  probabilityInvoiceNumberColor = 0;
  probInvoiceNumPositionWeight: number;
  probInvoiceNumKeyDistanceWeight: number;
  probInvoiceNumStructureWeight: number;
  probInvoiceLineStructureWeight: number;
}

export class InvoiceDateCreate {
  probabilityInvoiceDateCreate: number;
  probabilityInvoiceDateCreateColor = 0;
  probInvoiceDateCreatePositionWeight: number;
  probInvoiceDateCreateRangeWeight: number;
  probInvoiceDateCreateAlignWeight: number;
  probInvoiceDateCreateDateStructureWeight: number;
}

export class InvoiceNip {
  probabilityInvoiceNipContractor: number;
  probabilityInvoiceNipContractorColor = 0;
  probInvoiceNipContractorPositionWeight: number;
  probInvoiceNipContractorRangeNipWeight: number;
  probInvoiceNipContractorRangeKeyWeight: number;
  probInvoiceNipContractorAlignWeight: number;
  probInvoiceNipContractorStructureWeight: number;
  probInvoiceNipContractorBlockStructureWeight: number;
}
