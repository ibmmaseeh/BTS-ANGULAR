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

  // getBug() {
  //   let bugStatus = (<HTMLInputElement>document.getElementById('bugStatus')).value;
  //   let bugTitle = (<HTMLInputElement>document.getElementById('bugTitle')).value;
  //   let endpointURL = 'http://localhost:8080/bug/';

  //   if (Object.values(STATUS).includes(bugStatus)) {

  //     endpointURL = endpointURL + 'status/' + bugStatus;
  //     this.bugService.getBug(endpointURL).subscribe(response => {
  //       this.bugList = response;
  //       if(response!=null){
  //         console.log(response);
  //         alert('Bug Found!')
  //       }
  //       else{
  //        alert("Bug with given status " + bugStatus + "not found!!");
  //       }

  //     },
  //       error => {
  //         console.log(error);
  //         alert("An Error has occured.");

  //       }
  //     )
  //   }
  //   else {
  //     endpointURL = endpointURL + 'title/' + bugTitle;
  //     this.bugService.getBug(endpointURL).subscribe(response => {
  //       this.bugList = [response];
  //       if (response!=null){
  //         console.log(response);
  //         alert('Bug Found!')
  //       }
  //       else{
  //         alert("Bug with given title " + bugTitle + " not found!!");

  //       }

  //     },
  //       error => {
  //         console.log(error);
  //         alert(error.statusText);

  //       }
  //     )
  //   }
  // }

  getBug() {
    let status = (<HTMLInputElement>document.getElementById('bugStatus')).value;
    let bugTitle = (<HTMLInputElement>document.getElementById('bugTitle')).value;
    if (bugTitle && !status) {
      if (bugTitle.trim()) {
        const promise = this.bugService.getBugByName(bugTitle);
        promise.subscribe(response => {
          this.bugList = response;
          if (this.bugList.length) {
            this.bugArray = this.bugList;
          }
          else {
            alert("Record not found");
            this.bugArray = [];
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
    else if (status && !bugTitle) {
      const promise = this.bugService.getBugByStatus(status);
      promise.subscribe(response => {
        this.bugList = response;
        if (this.bugList.length) {
          this.bugArray = this.bugList;
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
    else if (bugTitle && status) {
      const promise = this.bugService.getBugbyStatusAndTitle(bugTitle, status);
      promise.subscribe(response => {
        this.bugList = response;
        if (this.bugList.length) {
          this.bugArray = this.bugList;
        }
        else {
          alert("No Bug with Name : " + bugTitle + " and Status : " + status + " found");
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


// getBugbyStatusAndTitle(){

//   let bugStatus = (<HTMLInputElement>document.getElementById('bugStatus')).value;
//   let bugTitle = (<HTMLInputElement>document.getElementById('bugTitle')).value;
//   let endpointURL = 'http://localhost:8080/bug/';

//   if(bugStatus&&bugTitle){
//     this.bugService.getBugbyStatusAndTitle(bugStatus,bugTitle).subscribe(response => {
//       this.bugList = response;
//       console.log(response);
//       if (this.bugList.length) {
//         alert('bug found');

//       }
//       else {
//         alert("No Bug with Name : " + bugTitle + " and Status : " + bugStatus + " found");
//         this.bugArray = [];
//       }
//     },
//       error => {
//         console.log(error);
//         alert(error.statusText);

//       }
//     )


//   }




// }












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
















