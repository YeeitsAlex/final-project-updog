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
  //person: Person
  r: Run[]
  displayColumns = ['block', 'year', 'event', 'outcome topic', 'score']
  showRun1(){
    this.runService.showRun1().subscribe((val: Run[]) => 
    {
      this.r = val;
      console.log(this.r)
    })
  }
  AddCellToRun()
  {
    this.runService.postCelltoRun(3, 2, "event bob", "topic HAHA", .9)
    .subscribe
    (
      data =>{console.log("post successful")}, 
      error => {console.log("ERROR ", error)}
    )
    this.showRun1()
  }
  ngOnInit() {
    //console.log("should print in list init")
    this.showRun1()
    //this.AddCellToRun()
    //console.log(this.p)
  }
}
