import { Component, OnInit } from '@angular/core';
import { RunService } from '../../run.service'
import { Run } from '../../run.model'
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
  showRun1(){
    this.runService.showRun1().subscribe((val: Run[]) => //send http request and results are subscribed into val
    {
      this.r = val; //send the results the element r 
      console.log(this.r)
    })
  }
  AddCellToRun()
  {
    this.runService.postCelltoRun(3, 2, "event bob", "topic HAHA", .9) 
    .subscribe 
    ( // sent http post with necessary data to request
      data =>{console.log("post successful")}, 
      error => {console.log("ERROR ", error)} 
    )
    this.showRun1() // update Runs array once http post is done
  }
  ngOnInit() {
    //console.log("should print in list init")
    this.showRun1()
    //this.AddCellToRun()
    //console.log(this.r)
  }
}
