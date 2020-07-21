export class DisplayElement {
  posL: number;
  posT: number;
  value: string;
}

export class HighlightElement {
  posL: number;
  posT: number;
  value: string;
  perc: string;
}

export class FinalDoc {
  document: Document;
}

export class Document {

  languages: string;
  producer: string;
  version: string;
  page: Page[];

}

export class Page {
  height: string;
  originalCoords: string;
  resolution: string;
  width: string;
  block: Block[];
}

export class Block {
  b: string;
  l: string;
  r: string;
  t: string;
  blockType: string;
  blockName: string;
  text: Text;
  row: Row[];
}

export class Row {
  cell: Cell[];
}

export class Cell {
  height: string;
  width: string;
  text: Text;
}

export class Text {
  par: Par[];
}

export class Par {
  lineSpacing: string;
  line: Line;
}

export class Line {
  b: string;
  l: string;
  r: string;
  t: string;
  formatting: Formatting;
}

export class Formatting {
  lang: string;
  _: string;
}


export class AppModel {
  valueFieldList: ValueField[];
  invoiceNumber: ValueField;
  invoiceDateCreate: ValueField;
  invoiceNip: ValueField;
  invoiceDatePayment: ValueField;
  invoiceZipCode: ValueField;
  invoiceAccountNumber: ValueField;
  invoiceGross: ValueField;
  invoiceNet: ValueField;
  invoiceVat: ValueField;
}

export class MainModel {
  finalResult: AppModel;
  finalResultSimple: SimpleModel;
  input: string;
}

export class SimpleModel {
  sInvoiceNumber: string;
  sDateCreate: string;
  sNip: string;
  sPaymentTerm: string;
  sDatePayment: string;
  sCurrencyKey: string;
  sCurrencyValue: string;
  sProforma: string;
  sPaid: string;
  sContractorName: string;
  bContractorNameExtracted: boolean;
  sDocumentKind: string;
  sPaymentForm: string;
  sAccountNumber: string;
  bAccountNumberExtracted: string;
  sGross: string;
  sNet: string;
  sVat: string;
  sZipCode: string;
  sProjectNumber: string;
  sProjectName: string;
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
  parId: number;
  lineCenterX: number;
  lineCenterY: number;

  invoiceNumber: InvoiceNumber;
  invoiceDateCreate: InvoiceDateCreate;
  invoiceNip: InvoiceNip;
  invoiceDatePayment: InvoiceDatePayment;
  invoiceContractorName: InvoiceContractorName;
}

export class InvoiceNumber extends HighlightElement {
  probabilityInvoiceNumber: number;
  probabilityInvoiceNumberColor = 0;
  probInvoiceNumPositionWeight: number;
  probInvoiceNumKeyDistanceWeight: number;
  probInvoiceNumStructureWeight: number;
  probInvoiceLineStructureWeight: number;
  probInvoiceBlockStructureWeight: number;
}

export class InvoiceDateCreate extends HighlightElement {
  probabilityInvoiceDateCreate: number;
  probabilityInvoiceDateCreateColor = 0;
  probInvoiceDateCreatePositionWeight: number;
  probInvoiceDateCreateRangeWeight: number;
  probInvoiceDateCreateAlignWeight: number;
  probInvoiceDateCreateDateStructureWeight: number;
}

export class InvoiceNip extends HighlightElement {
  probabilityInvoiceNipContractor: number;
  probabilityInvoiceNipContractorColor = 0;
  probInvoiceNipContractorPositionWeight: number;
  probInvoiceNipContractorRangeNipWeight: number;
  probInvoiceNipContractorRangeKeyWeight: number;
  probInvoiceNipContractorAlignWeight: number;
  probInvoiceNipContractorStructureWeight: number;
  probInvoiceNipContractorBlockStructureWeight: number;
}


export class InvoiceDatePayment extends HighlightElement {
  probabilityInvoiceDatePayment: number;
  probabilityInvoiceDatePaymentColor = 0;
  probInvoiceDatePaymentRangeWeight: number;
  probInvoiceDatePaymentAlignWeight: number;
  probInvoiceDatePaymentDateStructureWeight: number;
}

export class InvoiceContractorName {
  probabilityInvoiceContractorTown: number;
  probabilityInvoiceContractorTownColor = 0;
  probabilityInvoiceContractorZip: number;
  probInvoiceContractorTownRangeWeight: number;
  probInvoiceContractorTownAlignWeight: number;
  probInvoiceContractorTownStructureWeight: number;
}
