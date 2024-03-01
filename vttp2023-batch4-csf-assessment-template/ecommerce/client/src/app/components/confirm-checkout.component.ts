import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { CartStore } from '../cart.store';
import { Cart, LineItem, Order } from '../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrl: './confirm-checkout.component.css'
})
export class ConfirmCheckoutComponent implements OnInit {
  
  // TODO Task 3
  private router = inject(Router)
  private productService = inject(ProductService)
  private lineItemStore = inject(CartStore);
  
  private fb: FormBuilder = inject(FormBuilder);
  
  cart$!: Observable<LineItem[]>
  checkoutForm!: FormGroup;
  
  ngOnInit(): void {
    this.cart$ = this.lineItemStore.getAllItems;
    this.checkoutForm = this.createCheckoutForm();
  }

  private createCheckoutForm(): FormGroup {
    
    return this.fb.group({
      name: this.fb.control<string>('', [Validators.required]),
      address: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
      priority: this.fb.control<boolean>(false),
      comments: this.fb.control<string>('')
    });
  }

  submitForm() {
    const orderDetails: Order = this.checkoutForm.value;
    console.info("Received order details: ", orderDetails);
    this.productService.checkout(orderDetails); // Service
  }

  
}
