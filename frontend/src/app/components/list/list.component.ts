import { Component, OnInit } from '@angular/core';
import { RunService } from '../../run.service'
import { Run, OutcomeList} from '../../run.model'
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router'


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private runService: RunService, private router: Router) { }
  r: Run[] // class has element r of type array of Runs
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
      console.log(val)
    })
  }
  showAllScores(){ //SHOW ALL SCORES AAAAAANNNNNND EVENT NAME
    this.runService.showScores().subscribe((val: Run) => //send http request and results are subscribed into val
    {
      console.log("hello from console")
      //this.r = val; //send the results the element r 
      console.log(val)
    })
  }
  showAllEventNames(){
    this.runService.showEventNames().subscribe((val: Run[]) => //send http request and results are subscribed into val
    {
      console.log("hello from console")
      //this.r = val; //send the results the element r 
      console.log(val)
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
    //this.showAllOutcomes()
    this.showAllEventNames()
    //console.log(this.r)
  }
}
