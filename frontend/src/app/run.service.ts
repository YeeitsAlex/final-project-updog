import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RunService {

  serverURLi = "http://localhost:4000"
  constructor(private http: HttpClient) {}
  showRun1()
  {
    var url = this.serverURLi + "/listFromRun1"
    return this.http.get(url)
  }
  postCelltoRun(b:Number, y:Number, e:String, o:String, s:Number)
  {
    const p = {
      Block: b,
      Year: y,
      Event: e,
      OutcomeTopic: o,
      Score: s
    }
    console.log("adding person")
    var url = this.serverURLi + "/addCelltoRun1"
    return this.http.post(url, p)
  }
}
