import { Component, enableProdMode } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import Chart from 'chart.js/auto';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
  excelData: any;
  x: Text[] = [];
  y: number[] = [];

  willDownload = false;
  showToaster: boolean = false;
  toasterMessage: string = '';

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit(): void {}

  readExcel(event: any) {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = (e) => {
      var workBook = XLSX.read(fileReader.result, { type: 'binary' });
      var sheetNames = workBook.SheetNames;
      this.excelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);

      var i = 0;
      for (let data of this.excelData) {
        this.x[i] = data.GRADE;
        this.y[i++] = data.COUNT;
      }

      var myChart = new Chart('myChart', {
        type: 'bar',
        data: {
          labels: this.x,
          datasets: [
            {
              label: 'Number of students',
              data: this.y,
              backgroundColor: ['#68aeff'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
    };
  }

  submitFile() {
    if (this.excelData && this.excelData.length > 0) {
      // Assuming you want to simulate a delay before showing the toaster (you can remove this setTimeout)
      setTimeout(() => {
        this.showToaster = true;
        // this.toasterMessage = 'File uploaded successfully!';
        this.toastr.success('File uploaded successfully!');
      }, 1000); // Adjust the delay time as needed
  
      // You can also perform additional actions with the uploaded data if required
      console.log('Uploaded Data:', this.excelData);
    } else {
      // No file selected, show error toaster
      this.showToaster = true;
      // this.toasterMessage = 'Error uploading file. Please select a file.';
      this.toastr.error('Error uploading file. Please select a file.');
    }
  }
}  
