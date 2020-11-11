import { Component, Inject,Optional, OnInit,Input } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


export interface UsersData{
  item: any;
  itemName: string;
  qty: number;
}
@Component({
  selector: 'app-bookingview',
  templateUrl: './bookingview.component.html',
  styleUrls: ['./bookingview.component.scss']
})
export class BookingviewComponent implements OnInit {

  @Input() fromParent : UsersData;
  @Input() childMessage: string;

  fieldArray: Array<any> = [];

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal, 
  ) { }

  ngOnInit(): void {
    this.fieldArray = this.fromParent.item;
  }

}
