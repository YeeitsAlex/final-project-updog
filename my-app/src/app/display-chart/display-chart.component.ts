import { Component, OnInit, ViewChild, AfterViewInit,OnDestroy} from '@angular/core';
import { MapChart, Chart } from 'angular-highcharts';
import { AppComponent } from '../app.component';


import { RunService } from '../run.service' 
import { Run, OutcomeList} from '../run.model'
import { MatTableModule } from '@angular/material/table';
import { Router, ChildActivationEnd } from '@angular/router'
import {animate, state, style, transition, trigger} from '@angular/animations';
import * as CanvasJS from '../../assets/canvasjs.min.js';
import { ChartsModule } from 'ng2-charts';
import { MatSort, MatSortable, MatPaginator, MatTableDataSource } from '@angular/material';
import { chart } from 'highcharts/highcharts.src';
import {BloopComponent} from '../bloop/bloop.component';
import { element } from 'protractor';
@Component({
  selector: 'app-display-chart',
  templateUrl: './display-chart.component.html',
  styleUrls: ['./display-chart.component.scss']
})
export class DisplayChartComponent implements OnInit {
  @ViewChild(BloopComponent, {static:true}) bloop_c;
  labelPosition = 'start'// use to pick sort=> Origin, Sort large to small, Sort small to large 
  checkButton:boolean = false;
  option
  runchoiceName: string = ""
  outcomeName = ""
  outcomed
  DataSource1
  OutcomeList
  EventNameList
  ScoreList
  alllist
  chart
  check = false
  check_detail_score = false
  top10 
  top20
  top30
  loadingdata = false
  public radarChartLabels_less5 = ['0-0.1', '0.1-0.2', '0.2-0.3', '0.3-0.4', '0.4-0.5'];
  public  radarChartLabels_big5 = [ '0.5-0.6', '0.6-0.7', '0.7-0.8', '0.8-0.9', '0.9-1'];
  public radarChartData_less5 = [];
  public radarChartData_big5 = [];
  public radarChartType = 'radar';
  
  constructor(private runService: RunService, private router: Router, public app: AppComponent) { }
    r: Run[] // class has element r of type array of Runs
  doAdelay(){
  setTimeout(function(){return true;},300000);
};
calculate(score_list: any [], outcomeName: string){
  var count_score = [{0.1: 0, 0.2:0, 0.3:0 , 0.4:0 ,0.5:0 , 0.6:0 , 0.7:0 , 0.8:0 , 0.9:0, 1.0:0}] // 0 - 0.1 => 0.1 ++
    // console.log(count_score)
    for(var j = 0; j < score_list.length; j++ ){
      if(score_list[j] <0.5){
        if(score_list[j] >= 0.3){
          if(score_list[j] <0.4){
            count_score[0][0.4] +=1 //  0.3 <= x <0.4 
          }else{
            count_score[0][0.5] +=1 // 0.4 <= x < 0.5
          }
        }else if(score_list[j]<0.3){
          if(score_list[j] >= 0.2){
            count_score[0][0.3] +=1 //  0.2 <= x <0.3
          }else if( score_list[j]<0.2){
            if (score_list[j] >= 0.1){
              count_score[0][0.2] +=1 //  0.1 <= x <0.2
            }else{
              count_score[0][0.1] +=1 //  0 < x <0.1
            }
          }
        }
      }
      else if(score_list[j] >= 0.5){
        if(score_list[j]<0.7){
          if(score_list[j]>=0.6){
            count_score[0][0.7] += 1 // 0.6 <= x <0.7
          }else{
            count_score[0][0.6] += 1 // 0.5 <= x < 0.6
          }
        }else{ // >= 0.7
          if(score_list[j]<0.8){
            count_score[0][0.8] += 1 // 0.7 <= x < 0.8
          }else{
            if(score_list[j]< 0.9){
              count_score[0][0.9] += 1 // 0.8 <= x < 0.9
            }else{
              count_score[0][1] +=1   // 0.9 <= x < 1
            }
          }
        }
      }
      if(j === score_list.length-1){
        this.check_detail_score = true
      }
    } // end for loop
    console.log(count_score)
    this.runService.count_score = count_score
    var scoredps = []; 
    if(this.check_detail_score == true){
      this.radarChartData_less5 = [
        {data: [count_score[0]["0.1"] , count_score[0]["0.2"] ,count_score[0]["0.3"], count_score[0]["0.4"], count_score[0]["0.5"]], 
        label: outcomeName  + ' => Score Less than 0.5'}
      ];
      this.radarChartData_big5 = [
        {data :  [count_score[0]["0.6"] , count_score[0]["0.7"] ,count_score[0]["0.8"], count_score[0]["0.9"], count_score[0]["1"]],
        label: outcomeName + ' => Score Large than 0.5 ' }
      ];
    }
}
  onOptionsSelected(value:string){
    
    if(value != "Hi! Please choose an outcome topic before selecting a filtering option"){
      this.checkButton = true;
      this.runService.outcomeName = value
      // console.log("the selected value is " + value);
      var local_outcomelist = this.OutcomeList
      // console.log(local_outcomelist)
      var index =0;
      index = local_outcomelist.indexOf(value)
      // console.log( "Here is ", index, " The string is ", local_outcomelist[index])
      this.outcomeName = value
      // console.log(this.ScoreList)
      var list_display_score = this.ScoreList
      // console.log(this.ScoreList[0][0])
      var dps = []; // dataPoints
      
      if(!dps){
        this.doAdelay();
      };  
      var length_list = Object.keys(this.ScoreList).length
      var score_list = []
      
      for (var j = 0; j < length_list; j++) {	
                    dps.push({
          y: this.ScoreList[j][1][index],
          label: this.ScoreList[j][0]
        });
        score_list[j] = this.ScoreList[j][1][index]
      }; 
      this.runService.scorelist = this.ScoreList
      if(this.labelPosition === 'normal')
        console.log('normal') 
      if(this.labelPosition === 'large'){
        dps.sort( (a,b) => (a.y < b.y) ? 1:-1 )
        console.log("large")
      }
      if(this.labelPosition === 'small'){
        dps.sort( (a,b) => (a.y < b.y) ? -1:1 )
        console.log("small")
      }
      if(this.labelPosition === 'Top10percent'){
        var long30percent = length_list/10
        // console.log(long30percent)
        dps = dps.sort( (a,b) => (a.y < b.y) ? 1:-1 ).slice(0,long30percent)
        // console.log("large Top 10% ", dps)
      }
      if(this.labelPosition === 'Top20percent'){
        var long30percent = length_list/5
        // console.log(long30percent)
        dps = dps.sort( (a,b) => (a.y < b.y) ? 1:-1 ).slice(0,long30percent)
        // console.log("large Top 20% ", dps)
      }
      if(this.labelPosition === 'Top30percent'){
        var long30percent = length_list/3
        // console.log(long30percent)
        dps = dps.sort( (a,b) => (a.y < b.y) ? 1:-1 ).slice(0,long30percent)
        // console.log("large Top 30% ", dps)
      }
      
      // console.log(dps)
      let chart3 = new CanvasJS.Chart("chartContainer3", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: this.DataSource1.data[0].Event
        },
        axisX :{ labelFontColor: "transparent", labelFormatter: function(e) {
          return "";
        }},
        axisY: { prefix: "Run_score ", includeZero: false },
        data: [{
          type: "column",
          legendMarkerType: "triangle",
          legendMarkerColor: "green",
          color: "rgba(255,12,32,.3)",
          showInLegend: false,
          legendText: "Score of Run",
          dataPoints : dps

        }]
      });
      this.check = true 
      if(!dps){
        this.doAdelay();
      };  
      if(this.check === true){
        // console.log(" hi ")
        chart3.render();
        this.chart == false
      };
      this.calculate(score_list, value)
      var  temp = dps
      this.top10 = temp.sort( (a,b) => (a.y < b.y) ? 1:-1 ).slice(0, 10) 
      this.top20 = temp.sort( (a,b) => (a.y < b.y) ? 1:-1 ).slice(0, 20) 
      this.top30 = temp.sort( (a,b) => (a.y < b.y) ? 1:-1 ).slice(0, 30) 
      console.log(this.top10)
      console.log(this.top20)
      console.log(this.top30)
      this.runService.top10score = this.top10 
      this.runService.top20score = this.top20 
      this.runService.top30score = this.top30 
      
    } // end of if-loop for check string is "pick up which outcome topic you want"
    else{
      this.checkButton = false;
      console.log("pick up which outcome topic you want ++++++++++++++++++++++++++++")
    }
    
}
  ngOnInit() {
  this.app.show();
   this.runchoiceName = this.runService.runName
   this.runService.showOutcomeTopics(this.runchoiceName).subscribe((val: OutcomeList) => //send http request and results are subscribed into val
    {
      this.doAdelay()
      this.DataSource1 = new MatTableDataSource(val.Eventlist);
      var input_listOutcomes = []
      var list_o = []
      list_o[0] = {id:0, name: "Hi! Please choose an outcome topic before selecting a filtering option"}
      for(var i = 0; i< this.DataSource1.data[0].Event_Outcome.length;i++){
        var inputs = String(this.DataSource1.data[0].Event_Outcome[i].OutcomeTopic)
        input_listOutcomes.push(inputs)
        list_o[i+1] = {id:i+1, name:inputs}
      }
      this.outcomed = list_o
      this.OutcomeList = input_listOutcomes
      this.runService.outcomeNamelist = this.OutcomeList
      this.runService.showScores(this.runchoiceName).subscribe((val: Run[]) => //send http request and results are subscribed into val
    {

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
          insidelist.push((input_list_score[row].Event_Outcome[index].Score))
        }
        final_row_Event_cell_list[row] = [input_list_score[row].Event,insidelist]
      }
      this.ScoreList = final_row_Event_cell_list
      var dps = []; // dataPoints
      for (var j = 0; j < this.OutcomeList.length; j++) {	
                  dps.push({
                    y: this.ScoreList[0][1][j], // 0 is for row, 1 just display list
                    label: this.OutcomeList[j]
                  });
                            
                }; 
      this.loadingdata = true
                
    })
  
      
    })
  }


}

