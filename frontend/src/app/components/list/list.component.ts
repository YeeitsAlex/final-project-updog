import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../person.service'
import { Person } from '../../person.model'
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router'


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private personService: PersonService, private router: Router) { }
  //person: Person
  p: Person[]
  displayColumns = ['email', 'password']
  showPersons(){
    this.personService.getPersons().subscribe((val: Person[]) => 
    {
      this.p = val;
      console.log(this.p)
    })
  }
  AddPerson()
  {
    this.personService.postPersons("alice@gmail.com", "pass4")
    .subscribe
    (
      data =>{console.log("post successful")}, 
      error => {console.log("ERROR ", error)}
    )
    this.showPersons()
  }
  ngOnInit() {
    //console.log("should print in list init")
    this.showPersons()
    //this.AddPerson()
    //console.log(this.p)
  }
}
