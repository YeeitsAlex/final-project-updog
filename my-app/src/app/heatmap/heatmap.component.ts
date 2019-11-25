import { Component, OnInit, ViewChild } from '@angular/core';
import { MapChart, Chart } from 'angular-highcharts';

import * as Highcharts from 'highcharts';
import { RunService } from '../run.service' 
import { Run, OutcomeList} from '../run.model'
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router'
import {animate, state, style, transition, trigger} from '@angular/animations';

import { MatSort, MatSortable, MatPaginator, MatTableDataSource } from '@angular/material';
import { chart } from 'highcharts/highcharts.src';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';


// import { eventNames } from 'cluster';
// import { DataSource } from '@angular/cdk/table';
// import { ChartsModule } from 'ng2-charts';
// import * as CanvasJS from '../../../assets/canvasjs.min.js';
// import { ChartDataSets, ChartOptions } from 'chart.js';
// import { Color, BaseChartDirective, Label } from 'ng2-charts';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];



@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent implements OnInit {
    DataSource1
    OutcomeList
    EventNameList
    ScoreList
    alllist
    runName: string = ""
    public chart: any;
    public dynamic_data: any; 
    public options: any = {
        chart: {
            type: 'heatmap',
            zoomType: 'xy',
            height: 1700,
            width: 1200,
            margin: [80, 5, 400, 230],
            spacing: [10, 10, 100, 10],
          },
          title: {
              text: 'Highcharts heat map',
              align: 'left',
              x: 60
          },
      
          subtitle: {
              text: 'Curriculum Mapping using Mapradish',
              align: 'left',
              x: 60
          },
          credits: {
            enabled: false
          },
          xAxis: {
              title: {
                  text: 'Outcomes',
                  reserveSpace: true
              },
            //   categories: this.OutcomeList,
            // make sure to update xAxis categories to this.OutcomeList
              categories: ['Outcome 1'],
              allowDecimals: false,
              labels: {
                  // reserveSpace: true
              },
              scrollbar: {
                enabled: true
            }
              
          },
          yAxis: {
              title: {
                  text: 'Events'
              },
            //   categories: this.EventNameList,
              // be sure to update the yAxis categories in the update funciton
              categories: ['this.EventNameList'],
              scrollbar: {
                enabled: true
            }
            //   tickLength: 100
              
          },
          legend:{
              align: 'center',
              verticalAlign: 'top',
              floating: true        
         },
          colorAxis: {
              stops: [
                  [0, '#3060cf'],
                  [0.5, '#fffbbc'],
                  [0.9, '#c4463a'],
                  [1, '#c4463a']
              ],
              // layout: 'vertical',
              min: 0,
              max: 1,
              startOnTick: false,
              endOnTick: false,
              labels: {
                  format: '{value}'
              },
          },
          plotOptions: {
              series: {
                  
              },
              heatmap: {
                  rowsize: 1
              }
          },
          series: [
            {
              type: undefined,
              name: 'Curriculum Mapping',
              turboThreshold: 60000,
            //   data: this.getData(),
              // be sure to update the series data in the update function
              data: this.getData2(),
              boostThreshold: 60000,
              borderWidth: 0,
              nullColor: '#EFEFEF',
              tooltip: {
                  // headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                  pointFormat: '{point.custom.event} {point.custom.outcome} <b>{point.value}</b>'
              }
              
            }
          ]
    };
    constructor(private runService: RunService, private router: Router) { }
    r: Run[] // class has element r of type array of Runs
    // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    // @ViewChild(MatSort, {static: true}) sort: MatSort;
  getData(){ // returns list of objects i.e. the datalist for my chart
    // this.showAllOutcomes()
    // this.showAllScores()
    // this.showAllEventNames()
    var datalist = [];
    
    // console.log("hi")
    // console.log(this.EventNameList.length)
    // console.log(this.OutcomeList.length)
    // console.log(this.OutcomeList[0])
    // console.log(this.EventNameList[0])
    // console.log(this.ScoreList)
    // console.log(this.ScoreList[0][0])
    // console.log(this.ScoreList[0][1])
    for (var i = 0; i < this.EventNameList.length; i++){ // row
    // for (var i = 0; i < 100; i++){ // row
      var eventNames = this.ScoreList[i][0]
        for (var j = 0; j < this.OutcomeList.length; j++){ // order or cell in row
            datalist.push({
                            // x: this.EventNameList[j],
                            x: j,
                            // y: this.OutcomeList[i],
                            y: i,
                            value: this.ScoreList[i][1][j],
                            name: 'The Cell',
                            // event: 'The Cell',
                            // outcome: 'Introduction and General Biology'
                            custom: {event: eventNames, outcome: this.OutcomeList[j]}
                        });
        }
    }
    return datalist;
  }
  
  //getData2 is for getting initial dummy data to display while subscribe function is running
  getData2(){ // returns list of dummy objects
    var datalist = [];
    for (var i = 0; i < 500; i++){ // row
        for (var j = 0; j < 45; j++){ // order or cell in row
            datalist.push({
                            x: j,
                            y:i,
                            value: Math.random(),
                            name: 'The Cell',
                            custom: {event: 'eventNames', outcome: 'this.OutcomeList[j]'}
                        });
        }
    }
    return datalist;
  } // end getData2()
  
  // showAllRuns(){
  //   this.runService.showRuns('run1').subscribe((val: Run[]) => //send http request and results are subscribed into val
  //   {
  //     console.log("hello from console")
  //     //this.r = val; //send the results the element r 
  //     console.log(val)
  //   })
  // }
  // showAllOutcomes(){
  //   this.runService.showOutcomeTopics().subscribe((val: OutcomeList) => //send http request and results are subscribed into val
  //   {
      
  //   //   console.log("hello from console")
  //     //this.r = val; //send the results the element r 
  //     this.DataSource1 = new MatTableDataSource(val.Eventlist);
  //   //   this.DataSource1.data.paginator = this.paginator;
  //   //   this.DataSource1.data.sort = this.sort;
  //   //   console.log(this.DataSource1.data[0].Event_Outcome)// it will get the list of eventOutcome
  //     var input_listOutcomes = []
  //     for(var i = 0; i< this.DataSource1.data[0].Event_Outcome.length;i++){
  //       // console.log(this.DataSource1.data[0].Event_Outcome[i].OutcomeTopic)
  //       var inputs = String(this.DataSource1.data[0].Event_Outcome[i].OutcomeTopic)
  //       input_listOutcomes.push(inputs)
        
  //     }
  //     this.OutcomeList = input_listOutcomes
  //   //   console.log("hello from showAllOutcomes")
  //   //   console.log(this.OutcomeList)
      
  //   })
  // }
  // showAllScores(){
  //   this.runService.showScores().subscribe((val: Run[]) => //send http request and results are subscribed into val
  //   {
      
  //     console.log("hello from showAllScores")
  //     // console.log(this.OutcomeList)
  //     //this.r = val; //send the results the element r 
  //     // console.log(val)
  //     // console.log(val[0].Eventlist[0]) //for each row 
  //     var input_list_score = []
  //     for(var i = 0 ; i < val.length; i++){ // for same block and year
  //       for(var j = 0; j < val[i].Eventlist.length; j++){
  //         var inputs =  val[i].Eventlist[j]
  //         input_list_score.push(inputs) 
  //       }
  //     }
  //     this.ScoreList = input_list_score
  //     var final_row_Event_cell_list = {}
  //     for(var row = 0; row < input_list_score.length; row++){
  //       var insidelist = []
  //       for (var index =0; index < input_list_score[row].Event_Outcome.length;index++ ){
  //         // console.log(this.ScoreList[row].Event_Outcome[index].Score)
  //         insidelist.push((input_list_score[row].Event_Outcome[index].Score))
  //       }
  //       // console.log(insidelist)
  //       final_row_Event_cell_list[row] = [input_list_score[row].Event,insidelist]
  //     }
  //     this.ScoreList = final_row_Event_cell_list
  //   //   console.log(this.ScoreList)
  //     this.alllist = this.ScoreList
      
  //   })
  // }
  // showAllEventNames(){
  //   this.runService.showEventNames().subscribe((val: Run[]) => //send http request and results are subscribed into val
  //   {
  //     // console.log("hello from showAllEventNames")
  //     //this.r = val; //send the results the element r 
      
  //     var input_list_EventNames = []
  //     for (var i = 0; i< val.length;i++){
  //       // console.log(val[i])
  //       for(var j = 0; j< val[i].Eventlist.length;j++){
  //         //console.log(val[i].Eventlist[j])
  //         var inputS = String(val[i].Eventlist[j].Event)
  //         input_list_EventNames.push(inputS)
  //       }
  //     }
  //     this.EventNameList = input_list_EventNames
  //   //   console.log("hello from showAllEventNames")
  //   //   console.log(this.EventNameList)
     
  //   })
  // }


  // constructor() { }



  /** Whether the number of selected elements matches the total number of rows. */

  //New Code
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //End New Code

  ngOnInit() {

   this.runName = this.runService.runName
   this.runService.showOutcomeTopics(this.runName).subscribe((val: OutcomeList) => //send http request and results are subscribed into val
    {
      
    //   console.log("hello from console")
      //this.r = val; //send the results the element r 
      this.DataSource1 = new MatTableDataSource(val.Eventlist);
    //   this.DataSource1.data.paginator = this.paginator;
    //   this.DataSource1.data.sort = this.sort;
    //   console.log(this.DataSource1.data[0].Event_Outcome)// it will get the list of eventOutcome
      var input_listOutcomes = []
      for(var i = 0; i< this.DataSource1.data[0].Event_Outcome.length;i++){
        // console.log(this.DataSource1.data[0].Event_Outcome[i].OutcomeTopic)
        var inputs = String(this.DataSource1.data[0].Event_Outcome[i].OutcomeTopic)
        input_listOutcomes.push(inputs)
        
      }
      this.OutcomeList = input_listOutcomes
    //   console.log("hello from showAllOutcomes")
    //   console.log(this.OutcomeList)
    this.runService.showEventNames(this.runName).subscribe((val: Run[]) => //send http request and results are subscribed into val
    {
      // console.log("hello from showAllEventNames")
      //this.r = val; //send the results the element r 
      
      var input_list_EventNames = []
      for (var i = 0; i< val.length;i++){
        // console.log(val[i])
        for(var j = 0; j< val[i].Eventlist.length;j++){
          //console.log(val[i].Eventlist[j])
          var inputS = String(val[i].Eventlist[j].Event)
          input_list_EventNames.push(inputS)
        }
      }
      this.EventNameList = input_list_EventNames
    //   console.log("hello from showAllEventNames")
    //   console.log(this.EventNameList)
    this.runService.showScores(this.runName).subscribe((val: Run[]) => //send http request and results are subscribed into val
    {
      
      // console.log("hello from showAllScores")
      // console.log(this.OutcomeList)
      //this.r = val; //send the results the element r 
      // console.log(val)
      // console.log(val[0].Eventlist[0]) //for each row 
      var input_list_score = []
      for(var i = 0 ; i < val.length; i++){ // for same block and year
        for(var j = 0; j < val[i].Eventlist.length; j++){
          var inputs =  val[i].Eventlist[j]
          input_list_score.push(inputs) 
        }
      }
      this.ScoreList = input_list_score
      var final_row_Event_cell_list = {}
      var newlist = []
      for(var row = 0; row < input_list_score.length; row++){
        var insidelist = []
        for (var index =0; index < input_list_score[row].Event_Outcome.length;index++ ){
          // console.log(this.ScoreList[row].Event_Outcome[index].Score)
          insidelist.push((input_list_score[row].Event_Outcome[index].Score))
        }
        // console.log(insidelist)
        final_row_Event_cell_list[row] = [input_list_score[row].Event,insidelist]
        //newlist[row] = {id : row, name : final_row_Event_cell_list[row][0]} // final_row_Event_cell_list[row][0] is event name 
        // console.log(final_row_Event_cell_list[row][0])
      }
      //this.selections = newlist
      this.ScoreList = final_row_Event_cell_list
    //   console.log(this.ScoreList)
      this.alllist = this.ScoreList
      this.options.series[0].data = this.getData();
      
      this.options.xAxis.categories = this.OutcomeList;
      this.options.yAxis.categories = this.EventNameList;
      // this.selections = this.EventNameList;
      //console.log(this.selections);
    //   this.chart = new Chart(options: this.options);
    //   this.chart = Highcharts.chart('container', this.options);
      this.chart = new Chart(this.options);
    })
    })
      
    })
 
  }


}
