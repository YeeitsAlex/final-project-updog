import { Component, OnInit, ViewChild } from '@angular/core';
import { RunService } from '../../run.service'
import { Run, OutcomeList} from '../../run.model'
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router'
import {animate, state, style, transition, trigger} from '@angular/animations';

import { MatSort, MatSortable, MatPaginator, MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { ChartsModule } from 'ng2-charts';
import * as CanvasJS from '../../../assets/canvasjs.min.js';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  DataSource1
  OutcomeList
  EventNameList
  ScoreList
  constructor(private runService: RunService, private router: Router) { }
  r: Run[] // class has element r of type array of Runs
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayColumns = ['block', 'year', 'event', 'outcome topic', 'score'] // needed for UI table..?
  showAllRuns(){
    this.runService.showRuns().subscribe((val: Run[]) => //send http request and results are subscribed into val
    {
      console.log("hello from console")
      //this.r = val; //send the results the element r 
      console.log(val)
    })
  }
  showAllOutcomes(){
    this.runService.showOutcomeTopics().subscribe((val: OutcomeList) => //send http request and results are subscribed into val
    {
      
      console.log("hello from console")
      //this.r = val; //send the results the element r 
      this.DataSource1 = new MatTableDataSource(val.Eventlist);
      this.DataSource1.data.paginator = this.paginator;
      this.DataSource1.data.sort = this.sort;
      console.log(this.DataSource1.data[0].Event_Outcome)// it will get the list of eventOutcome
      var input_listOutcomes = []
      for(var i = 0; i< this.DataSource1.data[0].Event_Outcome.length;i++){
        // console.log(this.DataSource1.data[0].Event_Outcome[i].OutcomeTopic)
        var inputs = String(this.DataSource1.data[0].Event_Outcome[i].OutcomeTopic)
        input_listOutcomes.push(inputs)
        
      }
      this.OutcomeList = input_listOutcomes
      console.log("hello from showAllOutcomes")
      console.log(this.OutcomeList)
      
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
      console.log(this.ScoreList)
      
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
      console.log("hello from showAllEventNames")
      console.log(this.EventNameList)
    })
  }
  // AddCellToRun()
  // {
  //   this.runService.postCelltoRun(3, 2, "event bob", "topic HAHA", .9) 
  //   .subscribe 
  //   ( // sent http post with necessary data to request
  //     data =>{console.log("post successful")}, 
  //     error => {console.log("ERROR ", error)} 
  //   )
  //   this.showRun1() // update Runs array once http post is done
  // }
  ngOnInit() {
    
    //console.log("should print in list init")
    //this.showAllRuns()
    //this.AddCellToRun()
    // this.showAllOutcomes()
    // // console.log("hello from console")
    // // 
    // //this.showAllScores()
    // this.showAllEventNames()
    // console.log(this.OutcomeList)
    // console.log(this.EventNameList)
    this.showAllScores()
    console.log(this.ScoreList)
    //console.log(this.r)
  }
}