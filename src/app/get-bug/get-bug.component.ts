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
  bugArray:any;
  toggleEllipses:false;



  deleteBug(bugId){
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
    let endpointURL = 'http://localhost:8080/bug/';

    if (Object.values(STATUS).includes(bugStatus)) {

      endpointURL = endpointURL + 'status/' + bugStatus;
      this.bugService.getBug(endpointURL).subscribe(response => {
        this.bugList = response;
        if(response!=null){
          console.log(response);
          alert('Bug Found!')
        }
        else{
         alert("Bug with given status " + bugStatus + "not found!!");
        }

      },
        error => {
          console.log(error);
          alert("An Error has occured.");

        }
      )
    }
    else {
      endpointURL = endpointURL + 'title/' + bugTitle;
      this.bugService.getBug(endpointURL).subscribe(response => {
        this.bugList = [response];
        if (response!=null){
          console.log(response);
          alert('Bug Found!')
        }
        else{
          alert("Bug with given title " + bugTitle + " not found!!");

        }

      },
        error => {
          console.log(error);
          alert(error.statusText);

        }
      )
    }
  }

  // getBugbyStatusAndTitle() {
  //   let bugStatus = (<HTMLInputElement>document.getElementById('bugStatus')).value;
  //   let bugTitle = (<HTMLInputElement>document.getElementById('bugTitle')).value;
  //   let endpointURL='http://localhost:8080/bug/search';


  //   if (bugStatus!=null&&bugTitle!=null) {
  //     const promise = this.bugService.getBugbyStatusAndTitle(endpointURL);

  //     promise.subscribe(response => {
  //       this.bugList = response;
  //       if(response==null){

  //       alert("bad data");


  //       }
  //       else{
  //         alert("Please enter both fields");
  //       }
  //     },
  //       (        error: any) => {
  //         console.log(error);
  //         alert('error happened..')
  //       })
  //   }
//   else  if (bugTitle) {
//       if (bugTitle) {
//         const promise = this.bugService.getBug(bugTitle);
//         promise.subscribe(response => {
//           this.bugList= response;
//           console.log(this.bugList);
//           if(this.bugList.length){
//             this.bugList.forEach((bug: Bug) => {
//               let etaDate = bug.etaDate;
//               if (etaDate) {
//                 let finalEtaDate = etaDate.split('T')[0];
//                 bug.etaDate = finalEtaDate;
//               }
//               this.bugArray=this.bugList;
//             });
//           }
//           else{
//             alert("Bug Name not in records");
//           }
//         },
//           error => {
//             console.log(error);
//             alert('error happened..')
//           })
//       }
//   }
//   else  if (bugStatus) {
//     if (bugStatus) {
//       const promise = this.bugService.getBug(bugStatus);
//       promise.subscribe(response => {
//         this.bugList = response;
//         console.log(this.bugList);
//         if(this.bugList.length){
//           this.bugList.forEach((bug: Bug) => {
//             let etaDate = bug.etaDate;
//             if (etaDate) {
//               let finalEtaDate = etaDate.split('T')[0];
//               bug.etaDate = finalEtaDate;
//             }
//             this.bugArray=this.bugList;
//           });
//         }
//         else{
//           alert("Bug Status not in records");
//         }
//       },
//         error => {
//           console.log(error);
//           alert('error happened..')
//         })
//     }
// }
  // else{
  //   const observable=this.bugService.getBugs();
  //   observable.subscribe(response=>{
  //     console.log(response);
  //     this.bugArray=response})
  // }
// }
  // ngOnInit(): void {

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
















