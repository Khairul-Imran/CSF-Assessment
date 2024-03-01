import { Component, OnInit, inject } from '@angular/core';
import {Observable, Subscription, lastValueFrom} from 'rxjs';
import {Product} from '../models';
import {ProductService} from '../product.service';
import {ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  // NOTE: you are free to modify this component

  private prodSvc = inject(ProductService)
  private activatedRoute = inject(ActivatedRoute)
  private router = inject(Router)

  category: string = "not set"

  products$!: Observable<Product[]>
  // products$!: Promise<Product[] | undefined>
  products: any[] = [];
  sub$!: Subscription;

  ngOnInit(): void {
    this.category = this.activatedRoute.snapshot.params['category']

    this.sub$ = this.prodSvc.getProductsByCategory(this.category).subscribe({
      next: (result) => { this.products = result },
      error: (err) => { console.log(err); },
      complete: () => { this.sub$.unsubscribe() }
    });

    // this.products$ = lastValueFrom(this.prodSvc.getProductsByCategory(this.category))
    //   .then(data => {
    //     return data;
    //   })
    //   .catch(error => {
    //     console.error("Failed to fetch weather data: ", error);
    //   })
    
    // this.products$ = this.prodSvc.getProductsByCategory(this.category)
    //   .subscribe(data => console.info(data));

      // .then((data) => console.info(data))  

      // .subscribe({
      //   next: (data) => {console.info(data)}
      //   error: (error HttpErrorResponse) => {console.error(error)},
      //   complete: () => { this.products$.unsubscribe() }
      // })

  }

  



}
