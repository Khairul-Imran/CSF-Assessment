import { Component, OnInit, inject } from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { CartStore2 } from './cart.store2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  // NOTE: you are free to modify this component

  private router = inject(Router)
  private lineItemService = inject(CartStore2)

  itemCount: number = 0

  ngOnInit(): void {
    console.info("current item count: ", this.itemCount);
  }

  checkout(): void {
    this.router.navigate([ '/checkout' ])
  }

  

}
