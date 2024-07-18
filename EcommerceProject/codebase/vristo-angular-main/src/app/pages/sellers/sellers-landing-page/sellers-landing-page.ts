import { Component, OnInit } from '@angular/core';
import { slideDownUp } from '../../../shared/animations';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    moduleId: module.id,
    templateUrl: './sellers-landing-page.html',
    animations: [slideDownUp],
})
export class SellersLandingPage implements OnInit {
    constructor(
        private router: Router,
        private http: HttpClient
    ) {}

    ngOnInit(): void {
        this.fetchAllProductsBySeller()
    }
    activeTab: any = 'general';
    active1: any = 1;
    active2: any = 1;
    modal = false;
    items = [
        {
            src: '/assets/images/knowledge/image-5.jpg',
            title: 'Excessive sugar is harmful',
        },
        {
            src: '/assets/images/knowledge/image-6.jpg',
            title: 'Creative Photography',
        },
        {
            src: '/assets/images/knowledge/image-7.jpg',
            title: 'Plan your next trip',
        },
        {
            src: '/assets/images/knowledge/image-8.jpg',
            title: 'My latest Vlog',
        },
    ];
    products: any = [];

    addProduct() {

        this.router.navigate(['/add-product-page']);

        // modal for creating product
    }

    private fetchAllProductsBySeller() {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            })
        };

        return this.http.get('http://localhost:4000/products', httpOptions)
            .subscribe(response => {
                console.log('Post created:', response);
                this.products = response
            }, error => {
                console.error('Error:', error);
                // this.toastr.error('Failed to create post.');
            });
    }
}
