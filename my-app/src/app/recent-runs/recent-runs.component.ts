import { Component, OnInit } from '@angular/core';

export interface Headers {
  id: number;
  name: string;
}

const ELEMENT_DATA: Headers[] = [
  {id: 1, name: 'Mark'},
  {id: 2, name: 'Alex'},
  {id: 3, name: 'Rodrigo'},
  {id: 4, name: 'Peter'},
  {id: 5, name: 'Anguy'},
];


@Component({
  selector: 'app-recent-runs',
  templateUrl: './recent-runs.component.html',
  styleUrls: ['./recent-runs.component.scss']
})
export class RecentRunsComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = ['id', 'name'];
  dataSource = ELEMENT_DATA;
  ngOnInit() {
  }

}
