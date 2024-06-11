import { Component, Input, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SuccessComponent } from 'src/app/shared/components/success/success.component';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss']
})
export class CartsComponent implements OnInit {

  cartProducts: any[] = [];
  total: any = 0;
  success: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CartsComponent>,
    public _MatDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCartList();
  }

  getCartList() {
    if('Cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('Cart') !);
    }
    console.log(this.cartProducts);
    this.getCartTotalPrice();
  }

  getCartTotalPrice() {
    this.total = 0;
    for(let x in this.cartProducts) {
      this.total += this.cartProducts[x].item.price * this.cartProducts[x].quantity;
    }
  }

  addCart() {
    this.success = true;
    let dialogRef = this._MatDialog.open(SuccessComponent, {
      width: '750px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    this.dialogRef.close();
    if(this.success == true) {
      this.total = 0;
      localStorage.removeItem('Cart');

      setTimeout(() => {
        window.location.reload();
      }, 1000)
    }
  }

}
