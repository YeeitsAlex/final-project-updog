import { Component, OnInit, ViewChild } from '@angular/core';
import { MapChart, Chart } from 'angular-highcharts';


import { RunService } from '../run.service' 
import { Run, OutcomeList} from '../run.model'
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router'
import {animate, state, style, transition, trigger} from '@angular/animations';

import { MatSort, MatSortable, MatPaginator, MatTableDataSource } from '@angular/material';
import { chart } from 'highcharts/highcharts.src';
// import { eventNames } from 'cluster';
// import { DataSource } from '@angular/cdk/table';
// import { ChartsModule } from 'ng2-charts';
// import * as CanvasJS from '../../../assets/canvasjs.min.js';
// import { ChartDataSets, ChartOptions } from 'chart.js';
// import { Color, BaseChartDirective, Label } from 'ng2-charts';
@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent{
    DataSource1
    OutcomeList
    EventNameList
    ScoreList
    alllist
    chart
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
      var eventNames = this.ScoreList[i][0]
        for (var j = 0; j < this.OutcomeList.length; j++){ // order or cell in row
            datalist.push({
                            // x: this.EventNameList[j],
                            x: j,
                            // y: this.OutcomeList[i],
                            y:i,
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
  displayColumns = ['block', 'year', 'event', 'outcome topic', 'score'] // needed for UI table..?
  showAllRuns(){
    this.runService.showRuns().subscribe((val: Run[]) => //send http request and results are subscribed into val
    {
      console.log("hello from console")
      //this.r = val; //send the results the element r 
      //console.log(val)
    })
  }
  showAllOutcomes(){
    this.runService.showOutcomeTopics().subscribe((val: OutcomeList) => //send http request and results are subscribed into val
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
      
    })
  }
  showAllScores(){
    this.runService.showScores().subscribe((val: Run[]) => //send http request and results are subscribed into val
    {
      
      console.log("hello from showAllScores")
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
      for(var row = 0; row < input_list_score.length; row++){
        var insidelist = []
        for (var index =0; index < input_list_score[row].Event_Outcome.length;index++ ){
          // console.log(this.ScoreList[row].Event_Outcome[index].Score)
          insidelist.push((input_list_score[row].Event_Outcome[index].Score))
        }
        // console.log(insidelist)
        final_row_Event_cell_list[row] = [input_list_score[row].Event,insidelist]
      }
      this.ScoreList = final_row_Event_cell_list
    //   console.log(this.ScoreList)
      this.alllist = this.ScoreList
      
    })
  }
  showAllEventNames(){
    this.runService.showEventNames().subscribe((val: Run[]) => //send http request and results are subscribed into val
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
     
    })
  }


  // constructor() { }

  ngOnInit() {
   
   this.runService.showOutcomeTopics().subscribe((val: OutcomeList) => //send http request and results are subscribed into val
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
    this.runService.showEventNames().subscribe((val: Run[]) => //send http request and results are subscribed into val
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
    this.runService.showScores().subscribe((val: Run[]) => //send http request and results are subscribed into val
    {
      
      // console.log("hello from showAllScores")
      console.log(this.OutcomeList)
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
      for(var row = 0; row < input_list_score.length; row++){
        var insidelist = []
        for (var index =0; index < input_list_score[row].Event_Outcome.length;index++ ){
          // console.log(this.ScoreList[row].Event_Outcome[index].Score)
          insidelist.push((input_list_score[row].Event_Outcome[index].Score))
        }
        // console.log(insidelist)
        final_row_Event_cell_list[row] = [input_list_score[row].Event,insidelist]
      }
      this.ScoreList = final_row_Event_cell_list
    //   console.log(this.ScoreList)
      this.alllist = this.ScoreList
      this.chart = new Chart({
        chart: {
          type: 'heatmap',
          margin: [80, 80, 140, 130]
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
            categories: this.OutcomeList,
            allowDecimals: false,
            labels: {
                reserveSpace: true
            }
            
        },
        yAxis: {
            title: {
                text: 'Events'
            },
            categories: this.EventNameList,
            
        },
        colorAxis: {
            stops: [
                [0, '#3060cf'],
                [0.5, '#fffbbc'],
                [0.9, '#c4463a'],
                [1, '#c4463a']
            ],
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
                
            }
        },
        series: [
          {
            type: undefined,
            name: 'Curriculum Mapping',
            turboThreshold: 60000,
            data: this.getData(),
            boostThreshold: 60000,
            borderWidth: 0,
            nullColor: '#EFEFEF',
            tooltip: {
                // headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                pointFormat: '<b>{point.custom.event} {point.custom.outcome} {point.value}</b>'
            }
            
          }
        ]
      });
    })
    })
      
    })
  }
  

}
