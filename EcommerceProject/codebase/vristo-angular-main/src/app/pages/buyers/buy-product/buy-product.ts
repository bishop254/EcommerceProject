import { Component, OnInit } from '@angular/core';
import { FileUploadWithPreview } from 'file-upload-with-preview';
import { ActivatedRoute, Router } from '@angular/router';
import { Lightbox, LightboxConfig } from 'ngx-lightbox';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from '../../../service/cart.service';

@Component({
    moduleId: module.id, templateUrl: './buy-product.html', styleUrls: ['./buy-product.scss']
})
export class BuyProductComponent implements OnInit {
    codeArr: any = [];

    public form!: FormGroup;

    allcontrols = true;
    items: any = [];
    selectedProduct: any;
    private productId: any;

    constructor(
        private cartService: CartService,
        private router: Router, public http: HttpClient, public activatedRoute: ActivatedRoute, public fb: FormBuilder, private _lightbox: Lightbox, private _lightboxConfig: LightboxConfig) {
        this.bindFancybox();

        _lightboxConfig.enableTransition = false;
        _lightboxConfig.wrapAround = true;
        _lightboxConfig.positionFromTop = 0;
        _lightboxConfig.disableScrolling = true;
    }

    toggleCode = (name: string) => {
        if (this.codeArr.includes(name)) {
            this.codeArr = this.codeArr.filter((d: string) => d != name);
        } else {
            this.codeArr.push(name);
        }
    };

    bindFancybox() {
        if (this.allcontrols) {
            this._lightboxConfig.showImageNumberLabel = true;
            this._lightboxConfig.showZoom = true;
            this._lightboxConfig.showRotate = true;
            this._lightboxConfig.albumLabel = '%1 of %2';

            this.items = [{
                src: '/assets/images/lightbox1.jpg',
                caption: 'This is dummy caption. It has been placed here solely to demonstrate the look and feel of finished, typeset text.',
                title: 'Photo: Samuel Rohl'
            }, {
                src: '/assets/images/lightbox2.jpeg',
                caption: 'This is dummy caption. It has been placed here solely to demonstrate the look and feel of finished, typeset text.',
                title: 'Photo: Samuel Rohl'
            }, {
                src: '/assets/images/lightbox3.jpeg',
                caption: 'Dummy caption. It\'s Greek to you. Unless, of course, you\'re Greek, in which case, it really makes no sense.',
                title: 'Photo: Michael Hull'
            }, {
                src: '/assets/images/lightbox4.jpeg', caption: 'This is dummy caption.', title: 'Photo: Folkert Gorter'
            }, {
                src: '/assets/images/lightbox5.jpeg',
                caption: 'It\'s a dummy caption. He who searches for meaning here will be sorely disappointed.',
                title: 'Photo: Thomas Lefebvre'
            }, {
                src: '/assets/images/lightbox6.jpeg',
                caption: 'It\'s a dummy caption. He who searches for meaning here will be sorely disappointed.',
                title: 'Photo: Thomas Lefebvre'
            }];
        } else {
            this._lightboxConfig.showImageNumberLabel = false;
            this._lightboxConfig.showZoom = false;
            this._lightboxConfig.showRotate = false;
            this._lightboxConfig.albumLabel = '';

            this.items = [{
                src: '/assets/images/lightbox1.jpg'
            }, {
                src: '/assets/images/lightbox2.jpeg'
            }, {
                src: '/assets/images/lightbox3.jpeg'
            }, {
                src: '/assets/images/lightbox4.jpeg'
            }, {
                src: '/assets/images/lightbox5.jpeg'
            }, {
                src: '/assets/images/lightbox6.jpeg'
            }];
        }
    }

    addItemToCart() {

        this.cartService.addToCart(this.selectedProduct);

        this.router.navigate(['/order-summary-page']);
    }

    open(index: number): void {
        // open lightbox
        this._lightbox.open(this.items, index);
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            if (typeof params['id'] !== 'undefined') {
                this.productId = params['id'];
            }
        });

        this.form = this.fb.group({
            category: [{ value: '', disabled: true }],

            name: [{ value: '', disabled: true }],
            price: [{ value: '', disabled: true }],
            description: [{ value: '', disabled: true }]
        });


        this.fetchSelectedProduct();
    }

    fetchSelectedProduct() {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            })
        };

        return this.http.get(`http://102.23.120.135:4000/api/v1/products/${this.productId}`, httpOptions)
            .subscribe((response: any) => {
                this.selectedProduct = response.product;

                this.form.patchValue({
                    category: this.selectedProduct.category,
                    name: this.selectedProduct.name,
                    price: this.selectedProduct.price,
                    description: this.selectedProduct.description
                });

            }, error => {
                console.error('Error:', error);
            });
    }

    private addToCart() {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            })
        };

        return this.http.put(`http://102.23.120.135:4000/buy/${this.productId}`, httpOptions)
            .subscribe(response => {
                console.log('Post created:', response);
                this.router.navigate(['/sellers-account-settings-page'])

                // this.toastr.success('Post created successfully!');
            }, error => {
                console.error('Error:', error);
                // this.toastr.error('Failed to create post.');
            });
    }
}
