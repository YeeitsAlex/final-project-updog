import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { MatTableModule} from '@angular/material/table'
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';
import {StepperComponent} from './components/stepper/stepper.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ChartComponent } from './components/chart/chart.component';
import * as CanvasJS from '../assets/canvasjs.min.js';
import { ChartsModule } from 'ng2-charts';



import { 
  MatToolbarModule, 
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule ,
  MatStepperModule,
  MatInputModule,
  MatFormFieldModule,
  MatRippleModule,
  MatPaginatorModule,
  MatSortModule,
  MatAutocompleteModule
} from '@angular/material';

const routes: Routes = [
  {path: 'create', component: CreateComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'list', component: ListComponent},
  {path: '', redirectTo: 'list', pathMatch: 'full'},
]

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    StepperComponent
    // ChartComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule
    
  ],
  exports: [
    MatTableModule,
    MatSortModule
  ],
  
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }
