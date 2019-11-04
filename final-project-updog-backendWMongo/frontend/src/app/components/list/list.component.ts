import { Component, OnInit } from '@angular/core';
import { RunService } from '../../run.service'
import { Run } from '../../run.model'
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router'
import {animate, state, style, transition, trigger} from '@angular/animations';
import * as CanvasJS from '../../../assets/canvasjs.min.js';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
  /*
  check it next
  animations: [ 
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]*/
})
export class ListComponent implements OnInit {

  constructor(private runService: RunService, private router: Router) { }
  dataSource: Run[] // class has element r of type array of Runs
  displayColumns = ['block', 'year', 'event', 'outcome topic', 'score'] // needed for UI table..?
  showRun1(){
    this.runService.showRun1().subscribe((val: Run[]) => //send http request and results are subscribed into val
    {
      this.dataSource = val; //send the results the element dataSource 
      console.log(this.dataSource)
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
