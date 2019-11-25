import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatButtonModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BloopComponent } from './bloop/bloop.component';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { RecentRunsComponent } from './recent-runs/recent-runs.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { HeatmapComponent } from './heatmap/heatmap.component';
import  { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import { RouterModule, Routes} from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import * as hizzlemap from 'highcharts/modules/heatmap.src';
import { LoginComponent } from './login/login.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';



// import * as CanvasJS from '../assets/canvasjs.min.js';
// import { ChartsModule } from 'ng2-charts';
import { 
  MatButtonModule,
  MatSidenavModule,
  MatListModule ,
  MatStepperModule,
  MatInputModule,
  MatFormFieldModule,
  MatRippleModule,
  MatPaginatorModule,
  MatSortModule,
  MatAutocompleteModule,
  MatCheckboxModule

} from '@angular/material';
import { DisplayChartComponent } from './display-chart/display-chart.component';

// const routes: Routes = [
//   // {path: 'create', component: CreateComponent},
//   // {path: 'edit/:id', component: EditComponent},
//   {path: 'Heapmap', component: HeatmapComponent},
//   {path: '', redirectTo: 'list', pathMatch: 'full'},
// // ]
// const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'bloop', component: BloopComponent},
//   { path: 'recent', component: RecentRunsComponent},
//   { path: 'heatmap', component: HeatmapComponent}
// ];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BloopComponent,
    RecentRunsComponent,
    HeatmapComponent,
    DisplayChartComponent,

    LoginComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    MatCardModule,
    ChartModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    // RouterModule.forRoot(routes),
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
    MatAutocompleteModule,
    MatExpansionModule,
    MatListModule,
    MatGridListModule,
    MatButtonModule,
    MatCheckboxModule
    
  ],
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: () => [ more, exporting, hizzlemap ] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
