// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class RunService {

//   serverURLi = "http://localhost:4000" // this is the server the backend is running from 
//   constructor(private http: HttpClient) {}
//   showRun1()
//   {
//     var url = this.serverURLi + "/listFromRun1"
//     return this.http.get(url) // http get from localhost:4000/listFromRun1
//   }
//   postCelltoRun(b:Number, y:Number, e:String, o:String, s:Number)
//   {
//     const p = {
//       Block: b,
//       Year: y,
//       Event: e,
//       OutcomeTopic: o,
//       Score: s
//     }
//     //console.log("adding person")
//     var url = this.serverURLi + "/addCelltoRun1"
//     return this.http.post(url, p) // http post to localhost:4000/addCelltoRun1
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RunService {

  serverURLi = "http://localhost:4000" // this is the server the backend is running from 
  constructor(private http: HttpClient) {}
  showRuns()
  {
    var url = this.serverURLi + "/listFromRun"
    return this.http.get(url) // http get from localhost:4000/listFromRun1
  }
  showScores()
  {
    var url = this.serverURLi + "/listScores"
    return this.http.get(url) // http get from localhost:4000/listFromRun1
  }
  showOutcomeTopics()
  {
    var url = this.serverURLi + "/listOutcomes"
    return this.http.get(url) // http get from localhost:4000/listFromRun1
  }
  showEventNames()
  {
    var url = this.serverURLi + "/listEvents"
    return this.http.get(url) // http get from localhost:4000/listFromRun1
  }
//   postCelltoRun(b:Number, y:Number, e:String, o:String, s:Number)
//   {
//     const p = {
//       Block: b,
//       Year: y,
//       Event: e,
//       OutcomeTopic: o,
//       Score: s
//     }
//     //console.log("adding person")
//     var url = this.serverURLi + "/addCelltoRun1"
//     return this.http.post(url, p) // http post to localhost:4000/addCelltoRun1
//   }
}