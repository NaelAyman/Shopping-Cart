import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/products';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() data!: Product;
  @Output() addToCart = new EventEmitter();
  @Output() removeFromCart = new EventEmitter();
  @Output() successMsg = new EventEmitter();

  addToCartBtn: boolean = true;
  addButton: boolean = false;
  removeButton: boolean = false;
  amount: number = 1;
  sent: boolean = false;

  constructor(private _Router: Router, private _SharedService: SharedService) {}

  add() {
    this.addToCart.emit({
      item: this.data,
      quantity: this.amount,
    });
    
    this._SharedService.addToCart(+this.amount)
  }

  remove() {
    this.removeFromCart.emit({
      item: this.data,
      quantity: this.amount,
    });
  }
}
