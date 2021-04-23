import { Component, OnInit } from '@angular/core';
import { BugService } from '../bug.service';
import { Bug } from '../Bug';
import { STATUS } from '../STATUS';
import { TruncatePipe } from '../truncate.pipe';


@Component({
  selector: 'app-get-bug',
  templateUrl: './get-bug.component.html',
  styleUrls: ['./get-bug.component.css']
})
export class GetBugComponent implements OnInit {
  bug: Bug = new Bug();
  constructor(private bugService: BugService) { }
  bugList: any;
  searchElement: any;
  responseList: Boolean;
  bugArray: Bug[]=[];
  toggleEllipses:false;

  // read(){
  //   if(this.bug.description.length>20){
  //     alert(this.bug.description);

  //   }

  // }



  deleteBug(bugId){
    let ask=confirm("Do you want to delete bug this bug ?");
    if (!ask){
      return;
    }
    this.bugService.deleteBug(bugId).subscribe(response => {
      this.bugList = response;
      console.log(response);
      alert("Bug Deleted!")
      this.getBugs();
    },
      error => {
        console.log(error);
        alert("Error Happened!");

      }
    )
  }
  getBug() {
    let bugStatus = (<HTMLInputElement>document.getElementById('bugStatus')).value;
    let bugTitle = (<HTMLInputElement>document.getElementById('bugTitle')).value;
    if (bugTitle && !bugStatus) {
      if (bugTitle.trim()) {
        const promise = this.bugService.getBugByName(bugTitle);
        promise.subscribe(response => {
          this.bugList = response;
          this.bugArray=this.bugList;
          if (this.bugArray.length>0) {
            console.log(response);
            alert('Bug is found');
          }
          else {
            alert("Bug record with bug title not found");
          }
        },
          error => {
            alert('error happened..')
          });
      }
      else {
        alert("please provide bug name");
        this.bugArray = [];
      }
    }
    else if (bugStatus && !bugTitle) {
      const promise = this.bugService.getBugByStatus(bugStatus);
      promise.subscribe(response => {
        this.bugList = response;
        if (response!=null) {
          alert("Bug Found !!")
        }
        else {
          alert("No Bug with Status : " + status + " found");
          this.bugArray = [];
        }
      },
        error => {
          alert('error happened..')
        })
    }
    else if (bugTitle && bugStatus) {
      const promise = this.bugService.getBugbyStatusAndTitle(bugStatus, bugTitle);
      promise.subscribe(response => {
        this.bugList = response;
        this.bugArray=this.bugList;
        if (this.bugList.length>0) {
          this.bugArray = this.bugList;
          alert("Bug Found")
        }
        else {
          alert("No Bug with Name : " + bugTitle + " and Status : " + bugStatus + " found");
          this.bugArray = [];
        }
      },
        error => {
          alert('error happened..')
        })
    }
    else {
      const observable = this.bugService.getBugs();
      observable.subscribe(response => {
        this.bugList = response;
        if (this.bugList.length) {
          this.bugArray = this.bugList;
        }

      }, error => alert("Error occurred"));
    }
  }
  getBugs() {
    this.bugService.getBugs().subscribe(response => {
      this.bugList = response;
      console.log(response);
    },
      error => {
        console.log(error);
        alert(error.statusText);

      }
    )
   }



ngOnInit(): void {
    this.getBugs();

  }

}
















