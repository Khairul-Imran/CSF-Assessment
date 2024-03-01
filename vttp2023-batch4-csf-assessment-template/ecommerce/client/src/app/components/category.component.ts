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

  products: any[] = [];
  sub$!: Subscription;

  ngOnInit(): void {
    this.category = this.activatedRoute.snapshot.params['category']

    this.sub$ = this.prodSvc.getProductsByCategory(this.category).subscribe({
      next: (result) => { 
        console.info(result)
        this.products.push(result) 
      },
      error: (err) => { console.log(err); },
      complete: () => { this.sub$.unsubscribe() }
    });

  }
}
