// import { Component, OnInit, ViewChild } from '@angular/core';
// import {PageEvent} from '@angular/material/paginator';
// import { RunService } from '../../run.service'
// import { Run } from '../../run.model'
// import { MatTableModule } from '@angular/material/table';
// import { Router } from '@angular/router'
// import {animate, state, style, transition, trigger} from '@angular/animations';

// import { MatSort, MatSortable, MatPaginator, MatTableDataSource } from '@angular/material';
// import { DataSource } from '@angular/cdk/table';
// import { ChartsModule } from 'ng2-charts';
// import * as CanvasJS from '../../../assets/canvasjs.min.js';
// import { ChartDataSets, ChartOptions } from 'chart.js';
// import { Color, BaseChartDirective, Label } from 'ng2-charts';

// const COLORS: string[] = [
//     'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
//     'aqua', 'blue', 'navy', 'black', 'gray'
//   ];


// @Component({
//     selector: 'app-chart',
//     templateUrl:'./chart.component.html',
//     styleUrls: ['./chart.component.css']

// })
// export class ChartComponent implements OnInit{
//   dataSource: Run[] // class has element r of type array of Runs
//   DataSource1
//   displayColumns = ['block', 'year', 'event', 'outcome topic', 'score'] // needed for UI table..?
//   // MatPaginator Input
//   @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
//   @ViewChild(MatSort, {static: true}) sort: MatSort;

//   constructor(private runService: RunService, private router: Router) { 

//   }
//   length = 100;
//   pageSize = 10;
//   pageSizeOptions: number[] = [5, 10, 25, 100];
//   i = 0;
//   size = 0;

//   // MatPaginator Output
//   pageEvent: PageEvent;

//   setPageSizeOptions(setPageSizeOptionsInput: string) {
//     this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
//   }
//   showRun1(){
//     this.runService.showRun().subscribe((val: Run[]) => //send http request and results are subscribed into val
//     {
//      //send the results the element dataSource 
        
//     var idea = val;
//     this.DataSource1 = new MatTableDataSource(idea);
//     this.DataSource1.paginator = this.paginator;
//     this.DataSource1.sort = this.sort;

    
//     })
//   }
//   AddCellToRun()
//   {
//     this.runService.postCelltoRun(3, 2, "event bob", "topic HAHA", .9) 
//     .subscribe 
//     ( // sent http post with necessary data to request
//       data =>{console.log("post successful")}, 
//       error => {console.log("ERROR ", error)} 
//     )
//     this.showRun1() // update Runs array once http post is done
//   }
//   ngOnInit() {
//     //console.log("should print in list init")
    
//     this.runService.showRun1().subscribe((val: Run[]) => //send http request and results are subscribed into val
//     {
//      //send the results the element dataSource 
      
//         this.DataSource1 = new MatTableDataSource(val);
//         this.DataSource1.data.paginator = this.paginator;
//         this.DataSource1.data.sort = this.sort;
//         this.size = this.DataSource1.data.length;
//         console.log(this.DataSource1.data[0]);
//         console.log(this.DataSource1.data[0].Score);
//         console.log("I is ", this.i);
//         for(this.i ; this.i<this.size; this.i++){
//           console.log(this.DataSource1.data[this.i].Score);
//         } 
//         this.i = 0; 
//         var dps = []; // dataPoints
//         console.log("I is ", this.i);
//         let chart = new CanvasJS.Chart("chartContainer", {
//           animationEnabled: true,
//           exportEnabled: true,
//           title: {
//             text: this.DataSource1.data[0].Event
//           },
//           axisY: { prefix: "Run_score ", includeZero: false },
//           data: [{
//             type: "column",
//             dataPoints: dps
          
//           }]
//     });
        
//         for (var j = 0; j < val.length; j++) {	
//           dps.push({
//             y: this.DataSource1.data[j].Score,
//             label: this.DataSource1.data[j].OutcomeTopic
//           });
                    
//         }; 
//         chart.render();
        
//         let chart1 = new CanvasJS.Chart("chartContainer1", {
//           animationEnabled: true,
//           exportEnabled: true,
//           title: {
//             text: this.DataSource1.data[0].Event
//           },
//           axisY: { prefix: "Run_score ", includeZero: false },
//           data: [{
//             type: "pie",
//             showInLegend: true,
//             toolTipContent: "{y} - #percent %",
//             dataPoints: dps
//           }]
//         });
       
//         chart1.render();

//         let chart2 = new CanvasJS.Chart("chartContainer2", {
//           animationEnabled: true,
//           exportEnabled: true,
//           title: {
//             text: this.DataSource1.data[0].Event
//           },
//           axisY: { prefix: "Run_score ", includeZero: false },
//           data: [{
//             type: "column",
//             legendMarkerType: "triangle",
//             legendMarkerColor: "green",
//             color: "rgba(255,12,32,.3)",
//             showInLegend: true,
//             legendText: "Score of Run",
//             dataPoints : dps
//             // dataPoints: [
//             //   { y: this.DataSource1.data[0].Score, label: this.DataSource1.data[0].OutcomeTopic},
//             //   { y: this.DataSource1.data[1].Score, label: this.DataSource1.data[1].OutcomeTopic },
//             //   { y: this.DataSource1.data[2].Score, label: this.DataSource1.data[2].OutcomeTopic },
//             //   { y: this.DataSource1.data[3].Score, label: this.DataSource1.data[3].OutcomeTopic },
//             //   { y: this.DataSource1.data[4].Score, label: this.DataSource1.data[4].OutcomeTopic },
//             //   { y: this.DataSource1.data[5].Score, label: this.DataSource1.data[5].OutcomeTopic },
//             //   { y: this.DataSource1.data[6].Score, label: this.DataSource1.data[6].OutcomeTopic },
//             //   { y: this.DataSource1.data[7].Score, label: this.DataSource1.data[7].OutcomeTopic },
//             //   { y: this.DataSource1.data[8].Score, label: this.DataSource1.data[8].OutcomeTopic },
//             //   { y: this.DataSource1.data[9].Score, label: this.DataSource1.data[9].OutcomeTopic }
//             // ]
//           }]
//         });
    
//         chart2.render();
        
      
//     })
    
    
    

//   }
//   applyFilter(filterValue: string) {
//     this.DataSource1.filter = filterValue.trim().toLowerCase();

//     if (this.DataSource1.paginator) {
//       this.DataSource1.paginator.firstPage();
//     }
//   }



  



// }