import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {OutputComponent} from './output/output.component';
import {InputComponent} from './input/input.component';
import {AppModel} from "./output/app.model";

const appRoutes: Routes = [
  {path: '', component: AppComponent},
  {path: 'input', component: InputComponent},
  {path: 'output', component: OutputComponent},
  {path: '**', redirectTo: '404'}
  ];

export const routing = RouterModule.forRoot(appRoutes);
