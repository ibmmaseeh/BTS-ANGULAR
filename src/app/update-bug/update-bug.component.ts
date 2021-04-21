import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BugService } from '../bug.service';
import { Bug } from '../Bug';

@Component({
  selector: 'app-update-bug',
  templateUrl: './update-bug.component.html',
  styleUrls: ['./update-bug.component.css']
})
export class UpdateBugComponent implements OnInit {
  //title: String = 'BugForm';
  bug: Bug = new Bug();
  bugList:any;
  constructor(private bugService: BugService) { }
  getBugName() {
    let endpointURL = 'http://localhost:8080/bug/';
    let bugTitle=(<HTMLInputElement>document.getElementById('title')).value;
    if (bugTitle) {
      endpointURL = endpointURL + 'title/' + bugTitle;
      const promise = this.bugService.getBug(endpointURL);
      promise.subscribe(response => {
        this.bugList = response;
        console.log(this.bugList);
        if(this.bugList){
            this.bug=this.bugList;
        }
        else{
          alert("Given Bug with title "+bugTitle+" is not available");
        }
      },
      error => {
        console.log(error);
        alert(error.statusText);
    }
    )
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
      submitOnDate: (<HTMLInputElement>document.getElementById('submitOnDate')).valueAsDate,
      buildVersion: (<HTMLInputElement>document.getElementById('buildVersion')).value,
      projectId: (<HTMLInputElement>document.getElementById('projectId')).value,
      module: (<HTMLInputElement>document.getElementById('module')).value,
      product: (<HTMLInputElement>document.getElementById('product')).value,
      etaDate: (<HTMLInputElement>document.getElementById('etaDate')).value,
    }

    this.bugService.updateBug(bugId, updatedBody).subscribe(
      response => {
        console.log(response);
        alert("Bug updated....");
      },
      error => {
        console.log(error);
        alert(error.statusText);

      }
    )


  }

  ngOnInit(): void {
  }

}
