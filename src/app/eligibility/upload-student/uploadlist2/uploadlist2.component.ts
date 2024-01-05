import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { LabService } from '../../services/lab.service';
import  * as XLSX from 'xlsx';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'F:/DUGC_main/src/app/minor-analysis/data.service';
import { StatusService } from 'F:/DUGC_main/src/app/minor-analysis/status.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-uploadlist2',
  templateUrl: './uploadlist2.component.html',
  styleUrls: ['./uploadlist2.component.css']
})
export class Uploadlist2Component implements OnInit {

  ExelData:any;
  exeldata:any;

  constructor(private studentService:StudentsService,
    private dataService: DataService,
    private statusService: StatusService,
    private router: Router,
              private labService:LabService,
              private toast:ToastrService) { }
   submitted: any;

  ngOnInit(): void {

  }

  filename: File | null = null;
  onFilechange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.filename = files[0];
    }
  }
  inp1: any = {
      sem: '',
      filename: ''
  };

  statusMessage = '';


onSubmit1(): void {
  console.log("You've called the onclick function.");
  this.submitted = true;

  // Check if a file is selected and upload it
  if (this.filename) {
    this.dataService.uploadFile(this.filename).subscribe(
      (fileResp) => {
        console.log('File uploaded successfully:', fileResp);

        // If the file upload is successful, proceed to upload sheets
        this.dataService.uploadlist(this.inp1).subscribe(
          (sheetsResp) => {
            console.log('Sheets uploaded successfully:', sheetsResp);
            // this.statusService.isUploaded = true;
            // this.statusService.setResult(sheetsResp);
            // this.router.navigate(['/Minor/coordinator/upload_status']);
          },
          (sheetsError) => {
            console.log('Error uploading sheets:', sheetsError);
            // Handle error uploading sheets
          }
        );
      },
      (fileError) => {
        console.log('Error uploading file:', fileError);
        // Handle error uploading file
      }
    );
  } else {
    alert('Please select a file first');
  }
}



  validateInput1(): boolean {
    for (let key in this.inp1) {
      const value = this.inp1[key].trim();
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



  submitForm1(): void {
    console.log("Input:",this.inp1);
    if (!this.validateInput1()) {
      this.statusMessage = 'ERROR: Invalid or missing field';
      console.log(this.inp1);
      console.log("Not Validated");
    } else {
      console.log("Validated");
      this.statusMessage = '';
      this.onSubmit1();
    }
  }





  // ...

retrieveDataBySem(): void {
  if (!this.validateInput1()) {
    this.statusMessage = 'ERROR: Invalid or missing field';
  } else {
    this.statusMessage = '';
    const sem = parseInt(this.inp1.sem);
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

// ...





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
// uploadstudent()
// {
//   if(!this.ExelData)
//   {
//     this.toast.error("cannot upload empty data");
//   }
//   else
//   {
//   this.studentService.uploadlist(this.ExelData).subscribe((data)=>
//   {
//     console.log('students are added',data);
//     this.toast.success("student marks uploaded successfully");
//   },err=>
//   {
//     console.log(err);
//     this.toast.error("server error cannot add student list");
//   })
// }
// }

// uploadstudent() {
//   if (!this.ExelData) {
//     this.toast.error('Cannot upload empty data');
//   } else {
//     const formData = new FormData();
//     // Assuming ExelData is an array of objects with properties like USN, Name, CourseId, etc.
//     this.ExelData.forEach((student: any) => {
//       formData.append('students[]', JSON.stringify(student));
//     });

//     this.studentService.uploadlist(formData).subscribe(
//       (data) => {
//         console.log('Students are added', data);
//         this.toast.success('Student marks uploaded successfully');
//         // Call a method to retrieve data after successful upload
//         //this.retrieveData();
//       },
//       (err) => {
//         console.log(err);
//         this.toast.error('Server error, cannot add student list');
//       }
//     );
//   }
// }


uploadstudentlab()
{
 this.labService.uploadlist(this.exeldata).subscribe((data:any)=>
 {
  console.log('students are added',data);
  this.toast.success("student list for lab fetched uploaded");
},err=>
{
  console.log(err);
  this.toast.error("server error cannot add student list");
})

}

}
