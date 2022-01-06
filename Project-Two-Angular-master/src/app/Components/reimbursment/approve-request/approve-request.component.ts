import { NgForm } from '@angular/forms';
import { ReimbursmnetService } from './../reimbursmnet.service';
import { Component, OnInit } from '@angular/core';
import { RequestModel } from '../request.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ShowReceiptComponent } from '../show-receipt/show-receipt.component';
import { Router } from '@angular/router';
import { UserModel } from '../users.model';


@Component({ selector: 'app-approve-request', templateUrl: './approve-request.component.html', styleUrls: ['./approve-request.component.css'] })
export class ApproveRequestComponent implements OnInit {

  newRequest: RequestModel[] = [];
  requestForm: RequestModel = new RequestModel();
  newUser: UserModel = new UserModel();

  errorMsg: string = "";
  dateNow: Date = new Date();
  lccaldate: string = new Date().toLocaleString();

  constructor(private reimburementService: ReimbursmnetService,
    private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.viewallPendingRequest();
  }

  // approveRequest(requestId: number) {
  approveRequest(requestId: number, usersId: number, flag: number) {
    this.reimburementService.approveRequestService(requestId).subscribe((response) => {
      this.requestForm = response;
      this.viewallPendingRequest();
    }, (error) => {
      this.errorMsg = 'There was some internal error! Please try again later!';
    })
    this.reimburementService.sendEmailService(usersId, flag).subscribe((response) => {
    }, (error) => {
      this.errorMsg = 'There was some internal error in Email ! Please try again later!';
    })
  }

  RejectRequest(requestId: number, usersId: number, flag: number) {

    this.reimburementService.rejectRequestService(requestId).subscribe((response) => {
      this.requestForm = response;
      this.viewallPendingRequest();
    }, (error) => {
      this.errorMsg = 'There was some internal error! Please try again later!';
    })
    this.reimburementService.sendEmailService(usersId, flag).subscribe((response) => {
    }, (error) => {
      this.errorMsg = 'There was some internal error in Email ! Please try again later!';
    })

  }

  viewallPendingRequest() {
    this.reimburementService.allPendingRequstsService().subscribe((response) => {
      this.newRequest = response;
      // Sort descending
      this.newRequest.sort((a, b) => a.id - b.id);
    }, (error) => {
      this.errorMsg = 'There was some internal error! Please try again later!';
    })
  }

  largeImg(myimg: { src: string; }) {
    //this.router.navigate(['/show_receipt', this.requestForm.img]);
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(ShowReceiptComponent, {
      width: "40%",
      data: { img: myimg.src },
      disableClose: true,
      autoFocus: true
    });
  }


}
