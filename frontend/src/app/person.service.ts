import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PersonService {

  serverURLi = "http://localhost:4000"
  constructor(private http: HttpClient) {}
  getPersons()
  {
    var url = this.serverURLi + "/list/list_all_users"
    return this.http.get(url)
  }
  postPersons(email:string, password:string)
  {
    const p = {
      email: email,
      password: password
    }
    console.log("adding person")
    var url = this.serverURLi + "/user_create"
    console.log(p.email)
    console.log(p.password)
    return this.http.post(url, p)
  }
}
