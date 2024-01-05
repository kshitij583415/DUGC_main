import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  URI = `${'http://localhost:3000'}`;

  constructor(private httpClient:HttpClient) { }
  //methods to comminicate with backend api
  displayDate()
  {
   var date= new Date();
   console.log(date);
    return date;
  }

  getmarks()
  {
  let  url =environment.STUDENT_BASE_URL+environment.STUDENT.MARKS;
    return this.httpClient.get(url);
  }
  // uploadlist(studentobj:FormData)
  // {
  //   // let url = environment.STUDENT_BASE_URL+environment.STUDENT.ADD_STUDENT;
  //   // return this.httpClient.post(url,studentobj);
  // }

  uploadlist(data: any) {
    const {
      USN,
      name,
      cousreid,
      coursename,
      sem,
      div,
      cie,
      attendence,
      filename,
    } = data;
    console.log('Making a get request', data);
    const headers = new HttpHeaders();
    return this.httpClient.post(`${this.URI}/upload_theory`, data);
  }

  getattendance()
  {
  let  url =environment.STUDENT_BASE_URL+environment.STUDENT.ATTENDANCE;
    return this.httpClient.get(url);
  }
  viewStudent(id:any)
  {

  }
  editStudent(id:any,customerObj:any)
  {

  }
  deleteStudent(id:any)
  {

  }
  searchCustomer(keyword:any)
  {

  }
}
