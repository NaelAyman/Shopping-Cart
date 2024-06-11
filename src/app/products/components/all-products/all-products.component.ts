import { Component, Input } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/products';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartsComponent } from 'src/app/carts/components/carts/carts.component';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent {

  total: any = 0;
  products: Product[] = [];
  categories: string[] = [];
  loading: boolean = false;
  sent: boolean = false;
  cartProducts: any[] = [];
  @Input() selectedCategory: string = 'All Categories';

  addCartBtn: boolean = true;
  removeCartBtn: boolean = false;

  constructor(
    private service: ProductsService,
    public _MatDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getCartList();
  }

  getProducts() {
    this.loading = true;
    this.service.getAllProducts().subscribe( 
      (response: any) => {
        this.products = response;
        console.log(response);
        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
        alert('Error: ' + error.message);
      }
    )
  }

  getCategories() {
    this.loading = true;
    this.service.getAllCategories().subscribe(
      (response: any) => {
        this.categories = response;
        console.log(response);
        this.loading = false;
      },
      (error: any) => {
        this.loading = false;
        alert('Error: ' + error.message);
      }
    )
  }

  filterCategory(event: any) {
    this.selectedCategory = event.target.value;
    console.log(this.selectedCategory);

    if(this.selectedCategory == 'all') {
      this.getProducts();
    } else {
      this.ProductByCategory(this.selectedCategory);
    }
  }

  ProductByCategory(category: string) {
    this.loading = true;
    this.service.getProductByCategory(category).subscribe(
      (response: any) => {
        this.products = response;
        this.loading = false;
      },
      error => {
        this.loading = false;
        alert('Error: ' + error.message);
      }
    )
  }

  openDialog(): void {
    let dialogRef = this._MatDialog.open(CartsComponent, {
      width: '750px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: ' + result);
    });
  }

  addToCart(event: any) {
    if(localStorage.getItem('Cart') == null) {
      this.cartProducts.push(event);
      localStorage.setItem('Cart', JSON.stringify(this.cartProducts));
      this.getCartTotalPrice();
    } else {
      this.cartProducts = JSON.parse(localStorage.getItem('Cart')!);

      let existItem = this.cartProducts.find(item => item.item.id == event.item.id);
      
      if(existItem) {
        alert('This Item Already Existed'); 
        this.removeCartBtn = true;
        this.addCartBtn = false;
      } else {
        this.sent = true

        this.cartProducts.push(event);
        localStorage.setItem('Cart', JSON.stringify(this.cartProducts));
        
        // setTimeout(() => {
        //   this._Router.navigate(['/carts']);
        // }, 500);
      }
      
      this.getCartTotalPrice();
    }
  }
  
  removeFromCart(event: any) {
    let existItem = this.cartProducts.find(item => item.item.id == event.item.id);
    let findIndex = this.cartProducts.findIndex(item => item.item.id == event.item.id);
    
    if(existItem) {
      // alert('This Item Already Existed');
      console.log(existItem.item.id);
      console.log(findIndex);
      this.cartProducts.splice(findIndex, 1);
      localStorage.setItem('Cart', JSON.stringify(this.cartProducts));
      this.getCartTotalPrice();
    }
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

}
