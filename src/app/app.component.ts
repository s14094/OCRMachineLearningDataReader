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
  displayedColumns: string[] = ['fieldValue', 'lang', 'lineBaseline', 'lineLeft', 'lineRight', 'lineBottom', 'lineTop', 'parAlign',
    'parStartIndent', 'parLineSpacing', 'cellWidth', 'cellHeight', 'blockType', 'blockName', 'blockLeft', 'blockRight', 'blockTop',
    'blockBottom', 'blockCenterCoords', 'blockWidth', 'blockHeight', 'pageWidth', 'pageHeight', 'pageResolution'];


  constructor(
    private appService: AppService
  ) {
  }


  ngOnInit() {
    this.appService.getData().subscribe(result => {
      this.listModel = result;
      console.log(this.listModel);
      this.dataSource = new MatTableDataSource(this.listModel);
    });
  }
}
