import { Component, Input, OnInit, Output, inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LineItem} from '../models';
import { CartStore } from '../cart.store';
import { CartStore2 } from '../cart.store2';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent implements OnInit {

  // NOTE: you are free to modify this component

  private fb = inject(FormBuilder)
  private lineItemStore = inject(CartStore);
  private lineItemStore2 = inject(CartStore2);

  @Input({ required: true })
  productId!: string

  @Input()
  name!: string

  @Input()
  price!: number

  @Output()
  currentCartCount = new Subject<number>();

  form!: FormGroup

  ngOnInit(): void {
    this.form = this.createForm()
  }

  addToCart() {
    const lineItem: LineItem = {
      prodId: this.productId,
      quantity: this.form.value['quantity'],
      name: this.name,
      price: this.price
    }

    // this.lineItemStore.addEntry(lineItem); // Store
    this.lineItemStore2.addLineItem(lineItem);

    this.currentCartCount.next(this.lineItemStore2.getLineItemStoreLength()); // Update count

    this.form = this.createForm()
  }

  private createForm(): FormGroup {
    return this.fb.group({
      quantity: this.fb.control<number>(1, [ Validators.required, Validators.min(1) ])
    })
  }

}
