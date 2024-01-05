import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { LabService } from '../../services/lab.service';
import { DataService } from 'F:/DUGC_main/src/app/minor-analysis/data.service';
import  * as XLSX from 'xlsx';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-uploadlist3',
  templateUrl: './uploadlist3.component.html',
  styleUrls: ['./uploadlist3.component.css']
})
export class Uploadlist3Component implements OnInit {
  ExelData:any;
  exeldata:any;

  constructor(private studentService:StudentsService,
              private labService:LabService,
              private dataService: DataService,
              private toast:ToastrService) { }

  ngOnInit(): void {
  }

    //read xl file to store data in json
readfile(event:any)
{
  let file = event.target.files[0];
  let fileReader = new FileReader();

  fileReader.readAsBinaryString(file);

  fileReader.onload=(e)=>
  {
    var workbook = XLSX.read(fileReader.result,{type:'binary'});
    var sheetNames = workbook.SheetNames;
   this.ExelData= XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
    console.log(this.ExelData);
  }


}
readfile2(event:any)
{
  let file = event.target.files[0];
  let fileReader = new FileReader();

  fileReader.readAsBinaryString(file);

  fileReader.onload=(e)=>
  {
    var workbook = XLSX.read(fileReader.result,{type:'binary'});
    var sheetNames = workbook.SheetNames;
   this.exeldata= XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
    console.log(this.exeldata);
  }

}

//upload captured json to database
uploadstudent()
{
  this.studentService.uploadlist(this.exeldata).subscribe((data)=>
  {
    console.log('students are added',data);
  },err=>
  {
    console.log(err);
  })

}

uploadstudentlab()
{
  if(!this.exeldata)
  {
    this.toast.error("cannot upload empty data");
  }
  else
  {
 this.labService.uploadlist(this.exeldata).subscribe((data:any)=>
 {
  console.log('students are added',data);
  this.toast.success("uploaded successfully");
},err=>
{
  console.log(err);
  this.toast.error("server error cannot add student list");
})
}
}

inp: any = {
  sem: '',
  // filename: ''
};

statusMessage = '';

validateInput1(): boolean {
  for (let key in this.inp) {
    const value = this.inp[key].trim();
    console.log(`Key: ${key}, Value: ${value}`);

    // Check if the key is "sem" and value is not an empty string
    if (key === 'sem' && value === '') {
      return false;
    }

    if (value === '') {
      return false;
    }
  }
  return true;
}

// retrieveDataBySem(): void {
//   console.log("HIIII");
//   if (!this.validateInput1()) {
//     this.statusMessage = 'ERROR: Invalid or missing field';
//   } else {
//     this.statusMessage = '';
//     const sem = parseInt(this.inp.sem);
//     this.dataService.getTheoryBySem(sem).subscribe(
//       (data) => {
//         // console.log('Data retrieved successfully:', data);
//         console.log('Data retrieved successfully:');
//         // Handle the retrieved data as needed
//       },
//       (error) => {
//         console.log('Error retrieving data:', error);
//         // Handle error retrieving data
//       }
//     );
//   }
// }




retrieveDataBySem(): void {
  console.log("HIIII");
  if (!this.validateInput1()) {
    this.statusMessage = 'ERROR: Invalid or missing field';
  } else {
    this.statusMessage = '';
    const sem = parseInt(this.inp.sem);
    this.dataService.getTheoryBySem(sem).subscribe(
      (data) => {
        console.log('Data retrieved successfully:', data);
        // Handle the retrieved data as needed
      },
      (error) => {
        console.log('Error retrieving data:', error);
        // Handle error retrieving data
      }
    );
  }
}


}
