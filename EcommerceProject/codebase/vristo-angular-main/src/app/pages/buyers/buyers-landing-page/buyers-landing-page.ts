import { Component, OnInit } from '@angular/core';
import { slideDownUp } from '../../../shared/animations';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    moduleId: module.id,
    templateUrl: './buyers-landing-page.html',
    animations: [slideDownUp],
})
export class BuyersLandingPage implements OnInit {
    constructor(
        private router: Router,
        private http: HttpClient
    ) {}

    ngOnInit(): void {
        this.fetchAllProducts();
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
    products: any;

    openMoreDetails(id: number) {
        this.router.navigate([`/buy-product-page/${id}`]);
    }

    private fetchAllProducts() {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            })
        };

        return this.http.get(`http://102.23.120.135:4000/api/v1/products?page=1&keyword=`, httpOptions)
            .subscribe((response:any) => {
                console.log('Post created:', response);
                this.products = response.products
            }, error => {
                console.error('Error:', error);
                // this.toastr.error('Failed to create post.');
            });
    }
}
