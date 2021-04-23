import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BugService } from '../bug.service';
import { Bug } from '../Bug';
import { STATUS } from "../STATUS";

@Component({
  selector: 'app-update-bug',
  templateUrl: './update-bug.component.html',
  styleUrls: ['./update-bug.component.css']
})
export class UpdateBugComponent implements OnInit {
  //title: String = 'BugForm';
  oldStatus: string;
  bug: Bug = new Bug();
  bugList:any;
  constructor(private bugService: BugService) { }
  getBugName() {
    let endpointURL = 'http://localhost:8080/bug/';
    let bugTitle=(<HTMLInputElement>document.getElementById('title')).value;
    if (bugTitle) {
      endpointURL = endpointURL +'title/'+ bugTitle;
      const promise = this.bugService.getBugByName(bugTitle);
      promise.subscribe(response => {
        this.bugList = response;
        console.log(this.bugList);
        if(this.bugList){
          this.bug=this.bugList;
           this.oldStatus= this.bugList.status;
           let resEtaDate = this.bug.etaDate;
          let resSubmitDate=this.bugList.submitOnDate;
          if (resSubmitDate) {
            let finalSubmitDate = resSubmitDate.split('T')[0];
            this.bug.submitOnDate = finalSubmitDate;
          }
           if (resEtaDate) {
              let finalEtaDate = resEtaDate.split('T')[0];
              this.bug.etaDate = finalEtaDate;
            }
    }
      else{
        alert("Given Bug with title "+bugTitle+" is not available");
      }
    },
    error => {
      console.log(error);
      alert("Error Happened!");
  }
  )
}
else{
  alert("Specify title to fetch bug details");

}
}
  updateBug() {
    let updateBug = (<HTMLInputElement>document.getElementById('updateBug'))
    if (!updateBug.checkValidity()) {
      alert('Form is Invalid! Please check whether all mandatory fields are filled!');
      return;
    }
    let bugId = (<HTMLInputElement>document.getElementById('bugId')).value
    const updatedBody = {
      bugId:(<HTMLInputElement>document.getElementById('bugId')).value,
      title: (<HTMLInputElement>document.getElementById('title')).value,
      description: (<HTMLInputElement>document.getElementById('description')).value,
      priority: (<HTMLInputElement>document.getElementById('priority')).value,
      status: (<HTMLInputElement>document.getElementById('status')).value,
      type: (<HTMLInputElement>document.getElementById('type')).value,
      submitOnDate: (<HTMLInputElement>document.getElementById('submitOnDate')).value,
      buildVersion: (<HTMLInputElement>document.getElementById('buildVersion')).value,
      projectId: (<HTMLInputElement>document.getElementById('projectId')).value,
      module: (<HTMLInputElement>document.getElementById('module')).value,
      product: (<HTMLInputElement>document.getElementById('product')).value,
      etaDate: (<HTMLInputElement>document.getElementById('etaDate')).value,
    }


    this.bugService.updateBug(bugId, updatedBody).subscribe(
      response => {
        console.log(response);
        this.bugList= response;
        console.log(response);
        console.log(updatedBody.status);
        alert('Bug Updated');


      },

      error => {
        if( this.oldStatus== 'NEW' && updatedBody.status!='ASSIGNED'){
          alert('Status not allowed, NEW bug can only be assigned.');
          return;
        }
        else if (this.oldStatus== 'ASSIGNED' && updatedBody.status=='NEW'){
          alert('Assigned bug cannot be updated to status NEW.');
          return;

        }
        else if (this.oldStatus=='OPEN' && (updatedBody.status=='NEW'||updatedBody.status=='ASSIGNED')){
          alert('An OPEN bug cannot have updated status as NEW or ASSIGNED,');
          return;
        }
        else if(this.oldStatus=='FIXED' && (updatedBody.status=='OPEN'||updatedBody.status=='NEW'||updatedBody.status=='ASSIGNED')){
          alert('FIXED bug cannot have updated status as NEW or OPEN or ASSIGNED, please try REOPENING It.  ');
          return;
        }
        else if(this.oldStatus=='PENDING_RETEST' && (updatedBody.status=='FIXED'||updatedBody.status=='OPEN'||updatedBody.status=='NEW'||updatedBody.status=='ASSIGNED')){
          alert('A bug in PENDING RETEST status cannot be FIXED or NEW or OPEN or ASSIGNED ');
          return;
        }

        else if(this.oldStatus=='RETEST' && (updatedBody.status=='PENDING_RETEST'||updatedBody.status=='FIXED'||updatedBody.status=='OPEN'||updatedBody.status=='NEW'||updatedBody.status=='ASSIGNED')){
           alert('A bug in RETEST cannot be PEDNING RETEST or FIXED or OPEN or NEW or ASSIGNED');
           return;

        }

        else if(this.oldStatus=='REOPEN' && (updatedBody.status=='CLOSED'||updatedBody.status=='VERIFIED'||updatedBody.status=='OPEN'||updatedBody.status=='NEW'||updatedBody.status=='ASSIGNED')){
          alert('A bug thats REOPEN cannot be CLOSED or VERFIED or OPEN or NEW or ASSIGNED');
          return;
        }

        else if(this.oldStatus=='VERIFIED' && (updatedBody.status=='REOPEN'||  updatedBody.status=='RETEST'||updatedBody.status=='PENDING_RETEST'||updatedBody.status=='FIXED'||updatedBody.status=='OPEN'||updatedBody.status=='NEW'||updatedBody.status=='ASSIGNED')){
          alert('A bug thats VERIFIED cannot have its status updates as REOPEN OR RETETST OR PENDING_RETEST OR FIXED or OPEN or NEW or ASSIGNED');
          return;
        }


        else if(this.oldStatus=='CLOSED' && (updatedBody.status=="VERIFIED"||updatedBody.status=='REOPEN'||  updatedBody.status=='RETEST'||updatedBody.status=='PENDING_RETEST'||updatedBody.status=='FIXED'||updatedBody.status=='OPEN'||updatedBody.status=='NEW'||updatedBody.status=='ASSIGNED')){
          alert('A CLOSED bug cannot cannot be updated to status of VERIFIED or REOPEN or RETEST or PENDING RETEST, FIXED or OPEN or NEW or ASSIGNED');
          return;
        }



        console.log(error);
        alert("Error Happened!");

      }
    )


  }

  ngOnInit(): void {
  }

}
