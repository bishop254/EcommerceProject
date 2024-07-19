import { Component } from '@angular/core';
import { slideDownUp } from '../../../shared/animations';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    moduleId: module.id,
    selector: 'my-products',
    templateUrl: './my-products-page.html',
    styleUrls: ['my-products-page.css'],
    animations: [slideDownUp],
})
export class MyProductsPage {
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
    products: any;

    addProduct() {

        this.router.navigate(['/add-product-page']);

        // modal for creating product
    }

    editProduct(id: number) {
        this.router.navigate([`/edit-product-page/${id}`]);
    }

    private fetchAllProductsBySeller() {

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

    deleteProduct(id: number) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            })
        };

        return this.http.delete(`http://102.23.120.135:4000/product/${id}`, httpOptions)
            .subscribe(response => {
                console.error('Success');
                this.fetchAllProductsBySeller();
            }, error => {
                console.error('Error:', error);
                // this.toastr.error('Failed to create post.');
            });
    }
}
